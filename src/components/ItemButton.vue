<template lang="pug">
  b-button(@click.prevent="deleteItem(item)" variant="danger" v-if="itemInCart(item)") Убрать из корзины
  b-button(@click.prevent="addToBasket(item)" variant="success" v-else) В корзину
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "ItemButton",
  props: {
    item: Object
  },
  computed: {
    ...mapGetters("basket", ["itemInCart"])
  },
  methods: {
    ...mapMutations("basket", ["addToBasket", "deleteItem"])
  }
};
</script>