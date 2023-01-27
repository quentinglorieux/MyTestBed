<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <RouterLink to="/">Home</RouterLink> - 
    <RouterLink to="/network">Network</RouterLink> - 
    <RouterLink to="/wordcloud">WordCloud</RouterLink> - 
    <RouterLink to="/insta">ImageResize</RouterLink>
  </div>
  <RouterView/>
</template>
