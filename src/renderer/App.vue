<template>
  <div id="app">
    <layout></layout>
    <router-view></router-view>
  </div>
</template>

<script>
  import layout from '@/components/layout'
  export default {
    name: 'demo',
    components: {
      layout
    }
  }
</script>

<style>
  /* CSS */
</style>
