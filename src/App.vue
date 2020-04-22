<template>
  <v-app id="app">
    <navigation />
    <v-content>
      <v-container class="fill-height" fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation";

export default {
  components: {
    Navigation
  },
  name: "App",
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  })
};
</script>
<style lang="scss">
main {
  background-image: url("./assets/background.jpg");
  background-size: cover;
}

</style>