<template>
  <div>
    <h1 style="text-align:left;">Who are we?</h1>
    <div v-if="about" class="info-div pa-4">
      <div style="text-align: left;">
        <v-textarea
          required
          v-model="about.text"
          label="About text"
          placeholder="Some text..."
          outlined
        >{{ about.text }}</v-textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["about"]
};
</script>

<style lang="scss" scoped>
</style>