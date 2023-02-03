<script setup>
import { ref, watch, computed  } from "vue";
 //import localData from "../assets/data.json";

const body = ref("");
const data=ref();
const dataMemory=ref([]);
const headers =ref([]);
const loading = ref(false);
const prepublie = ref(false);
var firstTime = false;


fetchGalaxie(false);
watch(prepublie , (newPre) => fetchGalaxie(newPre) ) 

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
  .then((res) => formatResponse(res))
  .catch(console.error.bind(console));
}


function formatResponse(body) {
  var div = document.createElement("div");
  div.innerHTML = body;
  data.value = parsing(body);
  
  if (dataMemory.value.length == 0 ) {
    dataMemory.value = data.value;
    firstTime = true
  }
  else if (dataMemory.value.length > 0 && firstTime ){
    dataMemory.value = dataMemory.value.concat(data.value)
    firstTime = false
  }
  loading.value = false;
}

function parsing(body) {
  const doc = document.createElementNS("mydoc", "body");
  doc.innerHTML = body;
  var myRows = [{}];
  var headersText = [];
  var headersKey = [];

  var heads = doc.querySelectorAll("table.tab tbody tr th b");
  headers.value =[];
  heads.forEach((head, index) => {
    var lkey = head.innerHTML.replaceAll(" ", "_").toLocaleLowerCase()
    .replace(new RegExp(/[èéêë]/g),"e").replace("ô","o").replace("°","");
    var lname = head.innerHTML;

    headersKey.push(lkey);
    headersText.push(lname);
    
    if ( [ 'etablissement', 'reference_galaxie', 'article', 'corps',  'section', 'profil', 'localisation'].includes(lkey))
   headers.value.push( {
        text   : lname,
        value  : lkey,
        fixed  : true,
        width  : 70,
        sortable : false,
        });
  });
    headers.value[0]=  headers.value.splice(1, 1,  headers.value[0])[0]; // invert ref and etablissement
    headers.value[1].sortable=true; 
    headers.value[4].sortable=true; 
    headers.value[6].sortable=true; 
    headers.value[0].width=100; 
    headers.value[1].width=250; 
    headers.value[5].width=250;  
    headers.value[6].width=150;  
    //console.log(headers.value)
        

  var rows = doc.querySelectorAll("table.tab tbody tr");
  rows.forEach((row, index) => {
    var cellIndex = 0;
    if (index) {
      myRows.push({ [headersKey[cellIndex]]: "" });
      for (let cell of row.cells) {
        if ([headersKey[cellIndex]] == 'section'){
        Object.assign(myRows[index], {
          [headersKey[cellIndex]]: Number(cell.innerHTML),
        });
      }
      else {
        Object.assign(myRows[index], {
          [headersKey[cellIndex]]: cell.innerHTML,
        });
      }
        cellIndex += 1;
      }
    }
  });

  var myObj = {
    poste: myRows.slice(1),
  };
  return myRows.slice(1);
}

const searchField = ref(["section","etablissement","profil","section2","section3"]);
const searchValue = ref("");
const choiceCorps = ref(false);
const choiceArticle = ref(false);
const addFilter = ref(false);




const filterOptions = computed(() => {
  const filterOptionsArray = [];
  if (addFilter.value){
    console.log('addFilter')
  filterOptionsArray.push ({
    field: 'corps',
    comparison: '=',
    criteria: choiceCorps.value ? 'PR' : 'MCF'
  })
  if (choiceCorps.value) {
    console.log(choiceCorps.value)
  filterOptionsArray.push ({
    field: 'article',
    comparison: '=',
    criteria: choiceArticle.value ? '46-3' : '46-1'
  })
}}
  return filterOptionsArray;
})

const sortBy = "section";
const sortType = "asc";

</script>


<template>


  <!-- Vuetify Version -->
  <div  class="flex justify-center p-1 bg-gradient-to-r from-fuchsia-900 to-fuchsia-400">
    <img class="w-80" src="@/assets/galaxie-min.png"/>
  </div>
  <h2 class="p-3 font-bold"> {{ prepublie ? "Postes Pré-publiés" : "Postes Publiés" }} 
  {{  !addFilter ? ''  :
      !choiceCorps ? '- MCF' : 
       choiceArticle  ? '- PR 46-3' : '- PR 46-1'  }} </h2>
  <div v-if="data" class=" "> 

    <div class="flex"> 
       <v-text-field class="w-1/8 pb-2"
        v-model="searchValue"
        prepend-icon="mdi-magnify"
        label="Sections / Université / Profil"
        single-line
        hide-details
      ></v-text-field> 
      <v-switch 
       v-model="prepublie"
       inset
       class="w-1/8 pb-2 pl-10" 
       label="Poste publiés / Poste pré-publiés "> </v-switch> 

      
       </div>
       <div class="flex grow-0">
        <div class="w-1/4 pb-2" > <v-switch 
       v-model="addFilter"
       inset
       class=" pb-2 pl-10" 
       label="Tout voir / filtres"> </v-switch> 
      </div>

       <div v-if=addFilter class="flex w-1/2"> <v-switch 
       v-model="choiceCorps"
       inset
       class="w-1/4 pb-2 pl-10" 
       label="MCF / PR"> </v-switch> 

       <v-switch 
       v-model="choiceArticle"
       v-if="choiceCorps"
       inset
       class="w-1/4 pb-2 pl-10" 
       label="46-1 / 46-3"> </v-switch>
      
       </div>

       </div>
      


    <EasyDataTable
    :headers="headers"
    :fixed-header = true
    :rows-per-page = 1000
    :hide-rows-per-page = true
    :search-field="searchField"
    :search-value="searchValue"
    :filter-options="filterOptions"
    :sort-by="sortBy"
    :sort-type="sortType"
    table-class-name="customize-table"
    header-text-direction="center"
    body-text-direction="center"
    :items="data">


    <template #item-reference_galaxie="item">
      <v-btn
         color="blue-grey"
         density="compact"
         prepend-icon="mdi-file-pdf-box"
        > <div class="text-center" v-html="item.reference_galaxie"> </div>  </v-btn>
    </template>
    <template #item-section="item">
    {{ item.section }} <span v-if="item.section2"> - </span>
              {{ item.section2 }} <span v-if="item.section3"> - </span>
              {{ item.section3 }}
    </template>

  </EasyDataTable>
  

</div>


</template>


<style>

.customize-table {
  --easy-table-border: 1px solid #445269;
  --easy-table-row-border: 1px solid #445269;

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #fcfcfc;
  --easy-table-header-background-color: #7d91ae;

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: #fff;
  --easy-table-body-even-row-background-color: #2b374b;

  --easy-table-body-row-font-color: #2d3a4f;
  --easy-table-body-row-background-color: rgb(248, 252, 255);
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 13px;

  --easy-table-body-row-hover-font-color: #2d3a4f;
  --easy-table-body-row-hover-background-color: rgb(254, 254, 255);

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: #2d3a4f;
  --easy-table-footer-font-color: #c0c7d2;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;


  --easy-table-scrollbar-track-color: #2d3a4f;
  --easy-table-scrollbar-color: #2d3a4f;
  --easy-table-scrollbar-thumb-color: #4c5d7a;;
  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: #2d3a4f;
}


</style>