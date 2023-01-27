<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="text-2xl bg-green-300 text-teal-700 py-3 text-center">
    <RouterLink to="/">Home</RouterLink> - 
    <RouterLink to="/network">Network</RouterLink> - 
    <RouterLink to="/wordcloud">WordCloud</RouterLink> - 
    <RouterLink to="/insta">ImageResize</RouterLink>
  </div>
  <RouterView/>
</template>
