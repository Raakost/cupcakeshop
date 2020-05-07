<template>
  <v-container grid-list-xs>
    <v-row class="info-box">
      <v-col xs="12" sm="4" md="3" v-for="item in home" v-bind:key="item.title">
        <infobox
          v-bind:title="item.title"
          v-bind:description="item.description"
          v-bind:image="item.image"
        ></infobox>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Infobox from "../components/Infobox.vue";
export default {
  data() {
    return {
      home: [
        {
          title: "Visit our lovely store",
          description:
            " We wanna share our love of baking -Try some, or all of our amazing cupcakes!",
          image: require("../assets/1337.jpg")
        },
        {
          title: "Cupcakes for any occasion",
          description:
            " We wanna share our love of baking -Try some, or all of our amazing cupcakes!",
          image: require("../assets/133777.jpg")
        },
        {
          title: "Cupcakes",
          description:
            " We wanna share our love of baking -Try some, or all of our amazing cupcakes!",
          image: require("../assets/13377.jpg")
        }
      ]
    };
  },
  name: "Home",
  components: {
    Infobox
  }
};
</script>
<style lang="scss" scoped>
</style>