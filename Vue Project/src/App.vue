<script setup>
import { RouterLink, RouterView } from 'vue-router'
import FooterPage from './components/FooterPage.vue';
import HeaderPage from './components/HeaderPage.vue';

</script>

<template>

  <HeaderPage/>
  <RouterView />
  <FooterPage/>
</template>

<style>

</style>
