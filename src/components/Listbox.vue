<template>
  <div>
    <h1 style="text-align:right;">{{ title }}</h1>
    <div class="info-div">
      <ul style="list-style: none; padding-left: 0; text-align: center;">
        <div style="display: inline-block; text-align: left;">
          <li v-for="item in list" v-bind:key="item">{{item}}</li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "list"]
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

.info-box .col .info-div {
  background-color: white;
  color: black;
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