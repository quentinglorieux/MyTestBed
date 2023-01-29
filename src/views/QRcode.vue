<template claa="app">

<div class="app">
    <h1> QR Code Generator</h1>
    <h3>Enter your parameters: </h3> 

    <v-text-field class="w-1/3"
            v-model="data"
            label="Your data here"
          ></v-text-field>

    

  <v-card class="w-1/3">
    <v-card-text>
      <v-slider
        v-model="size"
        step="10"
        min="50"
        max="500"
      ></v-slider>
    </v-card-text>
  </v-card>

   

    <qrcode-vue :value="data" :size="size" level="H" />
</div>

</template>


<script setup>
import { ref } from "vue";
import QrcodeVue from 'qrcode.vue'

const data=ref('');
const size2=ref('20');
const size=ref('200');
const message=ref('');

</script>