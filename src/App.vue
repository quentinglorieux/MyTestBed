<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  

<div class="layout-overlay flex">

  <div class="layout-sidebar 
              flex flex-column text-2xl text-teal-700  text-center">
    <RouterLink to="/">Home</RouterLink> -
    <RouterLink to="/network">Network</RouterLink> -
    <RouterLink to="/wordcloud">WordCloud</RouterLink> -
    <RouterLink to="/insta">ImageResize</RouterLink> -
    <RouterLink to="/qrcode">QR Code</RouterLink> -
    <div>  <RouterLink to="/galaxie">GalMap</RouterLink> / <RouterLink to="/galaxie2">Galaxie2</RouterLink> </div>
  </div>

  <div class="layout-main-container ">
    <div class="layout-main bg-blue-100">  <RouterView /> </div>
  </div>

</div>

</template>



<!-- 
'layout-overlay': this.layoutMode === 'overlay',
                'layout-static': this.layoutMode === 'static',
                'layout-static-sidebar-inactive': this.staticMenuInactive && this.layoutMode === 'static',
                'layout-overlay-sidebar-active': this.overlayMenuActive && this.layoutMode === 'overlay',
                'layout-mobile-sidebar-active': this.mobileMenuActive,
				'p-input-filled': this.$primevue.config.inputStyle === 'filled',
				'p-ripple-disabled': this.$p -->