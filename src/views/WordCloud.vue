<script setup>
import VueWordCloud from 'vuewordcloud';
import { ref, watch } from "vue";
import { debounce } from "lodash";
import axios from "axios";
import { pid } from 'process';

const openAlexID = ref("A2479014094");
const oaAutoComplete = ref("");
const resultsArray = ref([]);
const concepts = ref([]);
const wordArray = ref([]);
const pi = ref('');


async function fetchOpenAlexAuthors(input) {
  if (input == null) {
    resultsArray.value = [];
    return;
  }
  try {
    const u = "https://api.openalex.org/autocomplete/authors?q=" + input;
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
    concepts.value = [];
  debounceFetch(value);
}

function selectEntry(res) {
  openAlexID.value = res.id.slice(-11).replace('/', '');
  resultsArray.value =[];
  createWordCloud(openAlexID.value)
}

async function createWordCloud(id) {
  try {
    wordArray.value = [];
    const u = "https://api.openalex.org/authors/" + id;
    const result = await axios.get(u);
    pi.value = result.data.display_name;
    console.log(pi.value)
    concepts.value = result.data.x_concepts;
    concepts.value.forEach(el => {
        wordArray.value.push([el.display_name,el.score])
    });
    // wordArray.value.push() = result.data.x_concepts;
  } catch {}
}

</script>

<template>
 

 <div class="full">
    <h1 class="pr">The Cloud of  {{ pi  }}</h1>
    <h2 class="pr">Find OpenAlex.org ID</h2>
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

<!-- 
  <div class="full">
    Openalex.org:
    <input class="inputalex" v-model="openAlexID" placeholder="Enter OpenAlex ID" />
    <v-btn @click="createWordCloud()">Create a Network</v-btn>
   
  </div> -->
</div>

</div>


 <vue-word-cloud
  class="cloud"
  style="
    height: 600px;
    width: 1024px;
  "
  :words="wordArray"
  :color="([, weight]) => weight > 60 ? 'darkolivegreen' : weight > 30 ? 'darkolivegreen' : 'yellowgreen'"
  font-family="Roboto"
/>

</template>

<style scoped>
.cloud{padding: 20px;}
</style>