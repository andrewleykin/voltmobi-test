<template lang="pug">
  b-container(fluid).basket
    b-row(v-if="getBasket.length > 0")
      b-col.main-page__sidebar(cols="2") 
        app-sidebar(v-model="activeCat")
      b-col.main-page__items
        template(v-if="filterItems.length > 0")
          b-list-group
            b-list-group-item.d-flex.align-items-center.justify-content-between(v-for="item in filterItems" :key="item.id") 
              span.lead {{item.name}}
              span {{item.cost | currency}}
          b-button.mt-4(variant="danger" @click="onResetBasket") Очистить корзину
        span.lead(v-else) В данной категории нету товаров
        .d-flex.align-items-center.mt-5
          span.lead Итого
          h5.display-4.ml-auto {{getBasketSum | currency}}
        b-form.mt-5(@submit="onSubmit" validation)
          b-form-group(label="Фамилия, Имя, Отчество:" label-for="order-fio")
            b-form-input(id="order-fio" v-model="form.fio" type="text" placeholder="Введите ФИО" :state="!$v.form.fio.$dirty ? null : !$v.form.fio.$invalid")
          b-form-group(label="Email:" label-for="order-email")
            b-form-input(id="order-email" v-model="form.email" type="email" placeholder="Введите Email" :state="!$v.form.email.$dirty ? null : !$v.form.email.$invalid")
          b-form-group(label="Телефон:" label-for="order-phone")
            input.form-control(id="order-phone" v-model="form.phone" type="text" placeholder="Введите номер телефона" ref="phone" :aria-invalid="$v.form.email.$dirty && $v.form.email.$invalid" :class="classForPhone")
          b-button(type="submit" variant="primary") Submit
    h1.display-4(v-else) Корзина пуста. Закажите на 
      b-link(:to="{name: 'Main'}") главной
</template>


<script>
import Inputmask from "inputmask";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { required, email, minLength } from "vuelidate/lib/validators";
import AppSidebar from "@/components/AppSidebar";
export default {
  name: "Main",
  components: { AppSidebar },
  data: () => ({
    activeCat: "all",
    form: {
      fio: "",
      email: "",
      phone: ""
    }
  }),
  computed: {
    ...mapGetters("basket", ["getBasket", "getBasketSum"]),
    filterItems() {
      return this.activeCat === "all"
        ? this.getBasket
        : this.getBasket.filter(
            el => el.categories.indexOf(this.activeCat) !== -1
          );
    },
    phoneNumber() {
      return this.form.phone.replace(/\D+/g, "");
    },
    classForPhone() {
      if (!this.$v.form.phone.$dirty) return;
      return {
        "is-invalid": this.$v.form.email.$invalid,
        "is-valid": !this.$v.form.email.$invalid
      };
    }
  },
  methods: {
    ...mapMutations("basket", ["resetBasket"]),
    onSubmit(evt) {
      evt.preventDefault();
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      alert(JSON.stringify(this.form));
    },
    onResetBasket() {
      this.resetBasket();
      this.$router.push({ name: "Main" });
    }
  },
  mounted() {
    if (this.getBasket.length > 0) {
      const im = new Inputmask("+7 (999) 999-99-99");
      im.mask(this.$refs.phone);
    }
  },
  validations: {
    form: {
      email: { required, email },
      fio: { required, minLength: minLength(3) },
      phone: { required, minLength: minLength(11) }
    }
  }
};
</script>