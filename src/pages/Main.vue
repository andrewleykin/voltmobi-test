<template lang="pug">
  b-container(fluid).main-page
    b-row
      b-col.main-page__sidebar(cols="2") 
        app-sidebar(v-model="activeCat")
      b-col.main-page__items
        b-list-group(v-if="getItems.length > 0")
          b-list-group-item.d-flex.align-items-center(v-for="item in filterItems" :key="item.id") 
            b-link(:to="{name: 'ItemId', params: {id: item.id}}") {{item.name}} - {{item.cost | currency}}
            item-button.ml-auto(:item="item")
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppSidebar from "@/components/AppSidebar";
import ItemButton from "@/components/ItemButton";
export default {
  name: "Main",
  components: { AppSidebar, ItemButton },
  data: () => ({
    activeCat: "all"
  }),
  computed: {
    ...mapGetters("items", ["getItems"]),
    filterItems() {
      return this.activeCat === "all"
        ? this.getItems
        : this.getItems.filter(
            el => el.categories.indexOf(this.activeCat) !== -1
          );
    }
  },
  methods: {
    ...mapActions("items", ["fetchItems"])
  },
  mounted() {
    if (this.getItems.length === 0) this.fetchItems();
  }
};
</script>