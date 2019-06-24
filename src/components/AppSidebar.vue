<template lang="pug">
  b-list-group.sidebar(v-if="getCategories.length > 0")
    b-list-group-item(href="#" v-for="cat in getCategories" :key="cat.id" :active="cat.id === value" @click.prevent="$emit('input', cat.id)") {{cat.title}}
    b-list-group-item(href="#" @click="$emit('input', 'all')" v-if="value !== 'all'") Убрать фильтр
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "AppSidebar",
  props: {
    value: [String, Number]
  },
  computed: {
    ...mapGetters("categories", ["getCategories"])
  },
  methods: {
    ...mapActions("categories", ["fetchCategories"])
  },
  mounted() {
    if (this.getCategories.length === 0) this.fetchCategories();
  }
};
</script>