<template lang="pug">
  b-navbar.header(toggleable="md" type="dark" variant="info")
    b-navbar-brand(:to="{name: 'Main'}") Online shop
    b-navbar-nav
      b-nav-item(:to="{name: 'Maps'}") Карта
    b-navbar-nav.ml-auto
      b-nav-item(:to="{name: 'Basket'}")
        template(v-if="getBasketLength > 0") В корзине {{getBasketLength}} товара. На сумму {{getBasketSum | currency}}
        template(v-else) Корзина пуста
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AppHeader",
  computed: {
    ...mapGetters("basket", ["getBasketLength", "getBasketSum"])
  }
};
</script>

<style lang="sass">
.header
  margin-bottom: 20px
</style>

