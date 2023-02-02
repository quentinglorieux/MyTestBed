<script setup>
import { ref } from "vue";
import localData from "../assets/data.json";

const body = ref("");
const data = ref(localData.poste);
const headers =ref([]);

var source = "distant";

if (source == "distant") {
  const url =
    "https://www.galaxie.enseignementsup-recherche.gouv.fr/ensup/ListesPostesPublies/Emplois_publies_TrieParCorps.html";
  fetch("http://localhost:3000    ", {
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

  if (source == "distant") {
    data.value = p2(body);
  }
}

function p2(body) {
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

    if ( [ 'reference_galaxie','etablissement',  'article', 'corps', 'chaire', 'section', 'profil', 'localisation'].includes(lkey))
   headers.value.push( {
        title   : lname,
        key     : lkey,
        });
  });
  headers.value.splice(0, 0, headers.value[1]);
headers.value[1].width=350






 

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

const sortBy = ref([{ key: 'section', order: 'asc' }])
const search =ref('')
</script>


<template>
 
 <!-- {{ headers }} -->
  <!-- Vuetify Version -->

  <div class="flex justify-center p-1 bg-gradient-to-r from-fuchsia-900 to-fuchsia-400">
    <img class="w-80" src="@/assets/galaxie-min.png"/>
  </div>

  <v-text-field class="w-1/3 pb-2"
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>


  <v-data-table
    height="800px"
    v-model:sort-by="sortBy"
    items-per-page=-1
    :search="search"
    :headers="headers"
    :items="data"
    class="elevation-1"
    fixed-header=true
  >
  <template v-slot:item="{ item }">
    
      <tr>
        <!-- <td>{{ item.columns.uai }}</td> -->
        
        <td>
          <v-btn
         color="blue-grey"
         density="compact"
         prepend-icon="mdi-file-pdf-box"
        ><div class="text-center" v-html="item.columns.reference_galaxie"> </div> </v-btn>
     </td>
     <td>{{ item.columns.etablissement }}</td>
        <td>{{ item.columns.article }}</td>
        <td>{{ item.columns.corps }}</td>
        <td>{{ item.columns.chaire }}</td>
        <td>{{ item.value.section }} <span v-if="item.value.section2"> - </span>
            {{ item.value.section2 }} <span v-if="item.value.section3"> - </span>
            {{ item.value.section3 }}</td>
        <td>{{ item.columns.profil }}</td>
        <td>{{ item.columns.localisation }}</td>
      </tr>
    </template>
</v-data-table>




  <!-- Vuetify using v-table -->
  <!-- <v-table fixed-header height="500px">
    <thead>
      <tr>
        <th class="text-left">UAI</th>
        <th class="text-left">Link</th>
        <th class="text-left">Etablissement</th>
        <th class="text-left">Corps</th>
        <th class="text-left">Article</th>
        <th class="text-left">Section</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="post in data" :key="post.UAI">
        <td>{{ post.uai }}</td>
        <td><div v-html="post.reference_galaxie"></div> </td>
        <td>{{ post.etablissement }}</td>
        <td>{{ post.corps }}</td>
        <td>{{ post.article }}</td>
        <td>
          {{ post.section }} <span v-if="post.Section2"> - </span>
          {{ post.section2 }} <span v-if="post.Section3"> - </span>
          {{ post.section3 }}
        </td>
      </tr>
    </tbody>
  </v-table> -->


</template>
