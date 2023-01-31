<script setup>
import {ref} from "vue"
import $ from 'jquery'

const body=ref('');
const data=ref('');


const url = "https://www.galaxie.enseignementsup-recherche.gouv.fr/ensup/ListesPostesPublies/Emplois_publies_TrieParCorps.html"


fetch("http://localhost:3000    ", {
      "method": "GET",
      "headers": {},
      "mode": 'cors',
})
.then((res) => res.text())
.then((res) => body.value = res)
.then((res) => parseHTML(res))
.catch(console.error.bind(console));


function parseHTML(body){
var div = document.createElement('div');
div.innerHTML = body;
// data.value = div.getElementsByTagName('tr');
data.value = p2(body);
 console.log(data.value)
// console.log(data.value.Etablissement[1])
}

function p2(body){
    const doc = document.createElementNS('mydoc', 'body');
    doc.innerHTML = body;
    var myRows = [{}];
    var headersText = [];
    var $headers = $("th");

    var heads = doc.querySelectorAll('table.tab tbody tr th b');
    heads.forEach( head => { headersText.push(head.innerHTML); })

    var rows = doc.querySelectorAll('table.tab tbody tr');
        rows.forEach( (row, index) => {
             var cellIndex = 0;
             if (index) {
                myRows.push({ [headersText[cellIndex]] : '' })
             for (let cell of row.cells){
                Object.assign(myRows[index],{ [headersText[cellIndex]] : cell.innerHTML } )
                cellIndex += 1;
             }
            }
        })
       
var myObj = {
    "myrows": myRows.slice(1)
};
return myRows.slice(1)
}


</script>


<template>
    <!-- <div v-html="body"> </div> -->
    <div v-for="post in data">
        {{ post }}  
        <!-- {{ data.Etablissement[1] }} -->
        <div class="h-10 b-red-500"> </div>
    </div>
</template>

