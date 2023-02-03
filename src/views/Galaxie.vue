<script setup>
import { ref, watch } from "vue";
 //import localData from "../assets/data.json";

const body = ref("");
const data=ref();
const headers =ref([]);

  
  const pre = ref();
  const loading = ref(false);

  fetchGalaxie(false);

  watch(pre , (newPre) => fetchGalaxie(newPre) ) 

  function fetchGalaxie(x){
    loading.value = true;
    const url = ref(x ?  "https://scrap.rubidiumweb.eu/pre" : "https://scrap.rubidiumweb.eu/" )
    fetch(url.value, {
    method: "GET",
    headers: {},
    mode: "cors",
  })
    .then((res) => res.text())
    .then((res) => (body.value = res))
    .then((res) => parseHTML(res))
    .catch(console.error.bind(console));
}



function parseHTML(body) {
  var div = document.createElement("div");
  div.innerHTML = body;
  data.value = parsing(body);
  loading.value = false;
}

function parsing(body) {
  const doc = document.createElementNS("mydoc", "body");
  doc.innerHTML = body;
  var myRows = [{}];
  var headersText = [];
  var headersKey = [];

  var heads = doc.querySelectorAll("table.tab tbody tr th b");
  heads.forEach((head, index) => {
    var lkey = head.innerHTML.replaceAll(" ", "_").toLocaleLowerCase()
    .replace(new RegExp(/[èéêë]/g),"e").replace("ô","o").replace("°","");
    var lname = head.innerHTML;

    headersKey.push(lkey);
    headersText.push(lname);

    if ( [ 'etablissement', 'reference_galaxie', 'article', 'corps', 'chaire', 'section', 'profil', 'localisation'].includes(lkey))
   headers.value.push( {
        title   : lname,
        key     : lkey,
        fixed   : true,
        });
  });
    headers.value[0]=  headers.value.splice(1, 1,  headers.value[0])[0]; // invert ref and etablissement
    headers.value[1].width=350;  
    // console.log(headers.value)
        

  var rows = doc.querySelectorAll("table.tab tbody tr");
  rows.forEach((row, index) => {
    var cellIndex = 0;
    if (index) {
      myRows.push({ [headersKey[cellIndex]]: "" });
      for (let cell of row.cells) {
        Object.assign(myRows[index], {
          [headersKey[cellIndex]]: cell.innerHTML,
        });
        cellIndex += 1;
      }
    }
  });

  var myObj = {
    poste: myRows.slice(1),
  };
  return myRows.slice(1);
}

// 
const search =ref('')
const sortBy = ref([{ key: 'section', order: 'asc' }])


const center = ref([40, 40])
const projection = ref('EPSG:4326')
const zoom = ref(8)
const rotation = ref(0)


</script>


<template>


<template>
<ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height:400px">

    <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" 
    :projection="projection" />

    <ol-tile-layer>
        <ol-source-osm />
    </ol-tile-layer>
    
</ol-map>
</template>


</template>
