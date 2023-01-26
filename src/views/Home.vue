<script setup>
import { ref, watch, onMounted } from "vue";
import { VueForceGraph2D } from "vue-force-graph";
// import forceGraph from "d3-force"
// import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// import { forceCollide } from "d3-force";
import axios from "axios";
import { debounce } from "lodash";

import Graph from "graphology";
import louvain from 'graphology-communities-louvain';
import circular from 'graphology-layout/circular';

import Sigma from "sigma";


const graph = new Graph();
// import circular from "graphology-layout/circular";

const openAlexID = ref("A2479014094");
const oaAutoComplete = ref("");
const publis = ref(null);
const resultsArray = ref([]);
const myData = ref({});
const fgRef = ref({});
const w1 = ref(100)

async function fetchOpenAlexAuthors(input) {
  if (input == null) {
    resultsArray.value = [];
    return;
  }
  try {
    const u = "https://api.openalex.org/autocomplete/authors?q=" + input;
    console.log(u);
    const result = await axios.get(u);
    resultsArray.value = result.data.results
      .filter(checkFalseProfiles)
      .slice(0, 5);
  } catch {}
}

function checkFalseProfiles(e) {
  return e.works_count > 1; // profile with only 1 counts are suspicious
}

watch(oaAutoComplete, onInput);

const debounceFetch = debounce(fetchOpenAlexAuthors, 300);
function onInput(value) {
  debounceFetch(value);
}



async function createMap() {
  //parmas

  const numberOfItems = 200;
  const url =
    "https://api.openalex.org/works?filter=author.id:" +
    openAlexID.value +
    "&per-page=" +
    numberOfItems;

  const response = await fetch(url);
  const temp = await response.json();
  const docs = temp.results.filter(
    (item) => item.type == "journal-article" && item.doi
  );
  publis.value = docs;
  let network = {};

  for (let doc of docs) {
    // for (let author of doc.authorships) {
    var authors = doc.authorships;
    var publiID = doc.id;

    // Version Graphology
    authors.forEach((el) => {
      if (!graph.hasNode(el.author.display_name)) {
        graph.addNode(el.author.display_name, { nodeType: "author" });
      }

    authors.forEach((el2) => {
      if (el2.author != el.author ){
        graph.updateEdge(el.author.display_name, el2.author.display_name, (attr) => {
        return {
          weight: (attr.weight || 0) + 1,
        };
      });
      }
    })
    });


    authors.forEach((element1, index1) => {
      var name1 = element1.author.display_name;

      authors.forEach((element2, index2) => {
        var name2 = element2.author.display_name;
        if (index1 != index2) {
          if (name1 in network) {
            network[name1].push([name2, publiID]);
          } else {
            network[name1] = [];
          }
        }
      });
    });
  }
  console.log("Number of nodes", graph.order);
  console.log("Number of edges", graph.size);

  console.log(network);
  let net = { nodes: [], links: [] };
  for (let author in network) {
    let id = author
      .trim()
      .replace(/\s+/g, "")
      .replace("-", "")
      .replace(/\.+/g, "")
      .toLowerCase();
    net.nodes.push({
      id: id,
      name: author,
      val: network[author].length,
      coauthors: network[author],
    });
  }
  for (let author in network) {
    let id = author
      .trim()
      .replace(/\s+/g, "")
      .replace("-", "")
      .replace(/\.+/g, "")
      .toLowerCase();
    for (let target of network[author]) {
      target = target[0]
        .trim()
        .replace(/\s+/g, "")
        .replace("-", "")
        .replace(/\.+/g, "")
        .toLowerCase();
      net.links.push({
        source: id,
        target: target,
      });
    }
  }

 

  // console.log(graph.getEdgeAttribute('Quentin Glorieux', 'Simon Pigeon', 'weight'))
  const communities = louvain(graph);
  console.log(communities)
  
  net.nodes.forEach( (el,index) => el.group = communities[el.name])

  louvain.assign(graph);
  const positions = circular(graph, {scale: 100});

  myData.value = net;
  console.log(net);

//  const chart = ForceGraph(data, {
// 	nodeId: d => d.id,
// 	nodeGroup: d => d.group,
// 	nodeTitle: d => `${d.id}\n`,
// 	linkStrokeWidth: l => Math.sqrt(l.value),
// 	width: 700,
// 	height: 400,
// })
// document.querySelector('#chart').appendChild(chart);


  //   console.log(network);
}
    
onMounted(() => {
 
})


function selectEntry(res) {
  openAlexID.value = res.id.slice(-11);
}

function zoom() { fgRef.value.zoom(2, 0);}

function onEngineStop() {
  fgRef.value.zoomToFit(500, 200);
}

</script>

<template>
  <div class="full">
    <h1 class="pr">Find your OpenAlex.org ID: {{ oaAutoComplete }}</h1>
    <div class="container">
    Enter your <input class="inputname" v-model="oaAutoComplete" placeholder="first and last name" />
    <div v-if="true">
      <ul class="result" v-for="res in resultsArray" @click="() => selectEntry(res)">
        <li>
          {{
            "🙍 " +
            res.display_name +
            " - " +
            res.works_count +
            " articles - " +
            res.cited_by_count +
            " citations"
          }}
          <div class="italic" v-html="res.hint"></div>
        </li>
      </ul>
    </div>


  <div class="full">
    Openalex.org:
    <input class="inputalex" v-model="openAlexID" placeholder="Enter OpenAlex ID" />
    <v-btn @click="createMap()">Create a Network</v-btn>
  </div>
</div>

</div>


  <div class="graph full" v-if="publis">
    <div id="chart"></div>
    <VueForceGraph2D
      ref="fgRef"
      :graphData="myData"
      :nodeRelSize="1"
      :nodeAutoColorBy="(d) => d.group "
      :linkWidth="2"
      backgroundColor="#090723"
      :linkColor="() => 'rgba(255,255,255,.1)'"
      :warmupTicks="20"
      :cooldownTime="10000"
      :onEngineTick="zoom"
      :onNodeDragEnd="
        (node) => {
          node.fx = node.x;
          node.fy = node.y;
          node.fz = node.z;
        }
      "
    >
    </VueForceGraph2D>
  </div>
</template>

<style scope>

.result:hover{
  background-color: rgb(143, 252, 145);
  font-weight: 500;
}

.result:active{
  background-color: rgb(29, 246, 0);
  font-weight: 500;
}

.full {
  padding-top: 10px;
}

.pr{padding-left: 20px;}

.container{
  background-color: rgb(210, 255, 211);
  padding: 20px;
}
.graph {
  width: 200px;
}
.inputname{ 
  padding: 2px;
  background-color: rgb(250, 250, 250);

}
.inputalex {
  padding: 2px;
  margin-right: 20px;
  background-color: rgb(241, 241, 241);
  border: 1px;
  border-color: black;
  border-style: solid;
}
.italic {
  font-style: italic;
}
.list-item:hover {
  background: var(--background-subdued);
}
.list-item:active {
  background: var(--primary-25);
}
.flex_title {
  display: flex;
}
.dupli {
  color: red;
}

.alex {
  margin-top: 20px;
  margin-bottom: 20px;
}
.top {
  background-color: gainsboro;
}

.button {
  margin: 5px;
  background-color: purple;
}
</style>
