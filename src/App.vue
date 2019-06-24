<template lang="pug">
  #app
    app-header
    router-view
</template>

<script>
import AppHeader from "@/components/AppHeader";
export default {
  name: "App",
  components: { AppHeader }
};
</script>

<style>
html,
body,
#app {
  height: 100%;
}
</style>
