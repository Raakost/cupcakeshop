<template>
  <div>
    <h1 style="text-align:center;">Opening Hours</h1>
    <div class="info-div">
      <ul style="list-style: none; padding-left: 0; text-align: center;">
        <div style="display: inline-block; text-align: left; padding: 10px;">
          <li v-for="item in openinghours" v-bind:key="item">{{item}}</li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["openinghours"]
};
</script>

<style lang="scss" scoped>
</style>