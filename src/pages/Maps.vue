<template lang="pug">
  .maps
    input.maps__input(id="suggest1"  class="form-control" placeholder="введите первый адрес..." @keyup.enter="geocode(1)" ref="suggest1" v-model="suggest1.value")
    input.maps__input(id="suggest2" class="form-control" placeholder="введите второй адрес..." @keyup.enter="geocode(2)" ref="suggest2" v-model="suggest2.value")
    #map
</template>

<script>
export default {
  name: "Maps",
  data: () => ({
    myYandexMap: {},
    suggest1: {
      value: "",
      coords: null
    },
    suggest2: {
      value: "",
      coords: null
    }
  }),
  computed: {
    lengthSuggest() {
      let sugValue1 = this.suggest1.value;
      let sugValue2 = this.suggest2.value;
      return sugValue1.length > 0 && sugValue2.length > 0
        ? 2
        : (sugValue1.length > 0 && sugValue2.length === 0) ||
          (sugValue1.length === 0 && sugValue2.length > 0)
        ? 1
        : 0;
    }
  },
  methods: {
    initMap() {
      this.myYandexMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 7
      });
    },
    geocode(id) {
      if (this[`suggest${id}`].value.length === 0 && this.lengthSuggest === 1) {
        let curId = id === 1 ? 0 : 1;
        ymaps
          .geocode(this[`suggest${curId}`].value)
          .then(res => this.showResult(res.geoObjects.get(0), curId));
        return;
      }
      ymaps
        .geocode(this[`suggest${id}`].value)
        .then(res => this.showResult(res.geoObjects.get(0), id));
    },
    showResult(obj, id) {
      this[`suggest${id}`].coords = obj.geometry.getCoordinates();
      if (this.lengthSuggest === 2) {
        let minArray = [];
        let maxArray = [];
        this.suggest1.coords.forEach((el, index) => {
          if (el > this.suggest2.coords[index]) {
            minArray.push(this.suggest2.coords[index]);
            maxArray.push(el);
          } else {
            minArray.push(el);
            maxArray.push(this.suggest2.coords[index]);
          }
        });
        this.myYandexMap.setBounds([minArray, maxArray]);
      } else {
        this.myYandexMap.setCenter(obj.geometry.getCoordinates());
      }
    }
  },
  mounted() {
    ymaps.ready(this.initMap);
  }
};
</script>

<style lang="sass">
.maps
  margin-top: -20px
  height: 100%
  max-height: calc(100% - 56px)
  position: relative

.maps__input
  position: absolute
  top: 30px
  max-width: 40%
  z-index: 10
  &#suggest1
    left: 20px
  &#suggest2
    right: 20px
#map
  height: 100%
</style>
