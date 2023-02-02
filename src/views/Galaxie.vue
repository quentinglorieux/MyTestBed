<script setup>
import { ref } from "vue";
import localData from "../assets/data.json";

const body = ref("");
const data = ref(localData.poste);

var source = "local";

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
  console.log(data.value);
}

function p2(body) {
  const doc = document.createElementNS("mydoc", "body");
  doc.innerHTML = body;
  var myRows = [{}];
  var headersText = [];

  var heads = doc.querySelectorAll("table.tab tbody tr th b");
  heads.forEach((head) => {
    headersText.push(head.innerHTML.replace(" ", "_"));
  });

  var rows = doc.querySelectorAll("table.tab tbody tr");
  rows.forEach((row, index) => {
    var cellIndex = 0;
    if (index) {
      myRows.push({ [headersText[cellIndex]]: "" });
      for (let cell of row.cells) {
        Object.assign(myRows[index], {
          [headersText[cellIndex]]: cell.innerHTML,
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
</script>


<template>
  <v-table fixed-header height="500px">
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
        <td>{{ post.UAI }}</td>
        <td><div v-html="post.Référence_GALAXIE"></div></td>
        <td>{{ post.Etablissement }}</td>
        <td>{{ post.Corps }}</td>
        <td>{{ post.Article }}</td>
        <td>
          {{ post.Section }} <span v-if="post.Section2"> - </span>
          {{ post.Section2 }} <span v-if="post.Section3"> - </span>
          {{ post.Section3 }}
        </td>
      </tr>
    </tbody>
  </v-table>

</template>
