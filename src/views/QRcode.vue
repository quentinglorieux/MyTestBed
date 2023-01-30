<template>

<div class="app">
    <h1> QR Code Generator</h1>
    <h3>Enter your parameters: </h3> 
  <div class="w-2/3 flex">

    
          <v-container>
      <v-row>
      
          <v-text-field
          v-model="data"
            label="Your data here"
          ></v-text-field>
        <v-slider
    v-model=size
    :min="100"
    :max="500"
    :step="50"
    color="orange"
    thumb-label
  ></v-slider>

      </v-row>
    </v-container>




</div>




    <qrcode-vue :value="data" :size=size level="H" />
</div>

</template>


<script setup>
import { ref } from "vue";
import QrcodeVue from 'qrcode.vue'

const data=ref('');
const size=ref(200);
const message=ref('');

</script>