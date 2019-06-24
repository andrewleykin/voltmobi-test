<template lang="pug">
  b-container(fluid)
    .item(v-if="item")
      b-breadcrumb
        b-breadcrumb-item(:to="{name: 'Main'}") Главная
        b-breadcrumb-item(active) {{item.name}}
      h1.display-1 {{item.name}}
      p.lead {{item.descr}}
      h3.mb-4 {{item.cost | currency}}
      dl.row
        dt.col-sm-1 Category:
        dd.col-sm-9 {{itemCategories}}
      item-button(:item="item")
    p(v-else-if="loading") Продукт не найден. Вернитесь на 
      b-link(:to="{name: 'Main'}")
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ItemButton from "@/components/ItemButton";
export default {
  name: "ItemId",
  components: { ItemButton },
  data: () => ({
    loading: false
  }),
  computed: {
    ...mapGetters("items", ["getItems", "getItemById"]),
    ...mapGetters("categories", ["getCategories", "getCategoriesById"]),
    item() {
      return this.getItemById(this.$route.params.id);
    },
    itemCategories() {
      if (this.getCategories.length === 0) return;
      let catResult = [];
      this.item.categories.map(el =>
        catResult.push(this.getCategoriesById(el).title)
      );
      return catResult.join(", ");
    }
  },
  methods: {
    ...mapActions("items", ["fetchItems"]),
    ...mapActions("categories", ["fetchCategories"])
  },
  mounted() {
    if (this.getItems.length === 0)
      this.fetchItems().then(() => {
        this.loading = true;
      });
    if (this.getCategories.length === 0) this.fetchCategories();
  }
};
</script>