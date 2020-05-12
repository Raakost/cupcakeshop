<template>
  <div>
    <h1 style="text-align:left;">Who are we?</h1>
    <div class="info-div">
      <ul style="padding: 10px; text-align: center;">
        <div style="display: inline-block; text-align: left;">
          <p>{{about.text}}</p>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["about"]
};
</script>
<style lang="scss">

</style>