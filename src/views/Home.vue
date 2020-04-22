<template>
  <v-container grid-list-xs>
    <v-row align-center class="info-box">
      <v-col sm="2" xs ="12" offset-sm="9">
        <h1>Cupcake</h1>
        <div>
          <p>
            We wanna share our love of baking -
            <br />Try some, or all of our amazing cupcakes!
          </p>
      <img src="../assets/cupcakes/2.jpg" alt />
        </div>
      </v-col>
    </v-row>
    <v-row align-center class="info-box">
      <v-col sm="2" xs="12" offset-sm="1">
        <h1>Cupcake</h1>
        <div>
          <p>
            We wanna share our love of baking -
            <br />Try some, or all of our amazing cupcakes!
          </p>
         <img src="../assets/cupcakes/2.jpg" alt />
        </div>
      </v-col>
      <v-col sm="2" xs="12" >
        <h1>Cupcake</h1>
        <div>
          <p>
            We wanna share our love of baking -
            <br />Try some, or all of our amazing cupcakes!
          </p>
          <img src="../assets/cupcakes/3.jpg" alt />
        </div>
      </v-col>
      <v-col sm="2" xs="12" >
        <h1>Cupcake</h1>
        <div>
          <p>
            We wanna share our love of baking -
            <br />Try some, or all of our amazing cupcakes!
          </p>
          <img src="../assets/cupcakes/9.jpg" alt />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {}
};
</script>
<style lang="scss">
.info-box .col h1 {
  @include infobox_mixin(
    3px,
    map-get($colorz, white),
    10px,
    5px,
    map-get($colorz, lightgrey)
  );
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 200;
  text-align: center;
  background-color: map-get($colorz, secondary);
  font-size: 16px;
  font-family: "Lato", sans-serif;
}

.info-box .col div {
  background-color: #272b2c;
  color: white;
  padding: 5px 10px;
  font-family: "Lato", sans-serif;
  opacity: 95%;
}

.info-box .col img {
  width: 100%;
}
</style>
<style lang="scss" scoped>
.row:first-child {
  height: 40vh;
}
.row:last-child {
  height: 40vh;
}
</style>
