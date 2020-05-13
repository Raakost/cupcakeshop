<template>
  <div>
    <h1 style="text-align:right;">Opening Hours</h1>
    <div v-if="openingHours" id="info" class="pa-4">
      <v-text-field
        required
        v-model="openingHours.mon"
        label="Monday"
        outlined
      >{{ openingHours.mon }}</v-text-field>
      <v-text-field
        required
        v-model="openingHours.tue"
        label="Tuesday"
        outlined
      >{{ openingHours.tue }}</v-text-field>
      <v-text-field
        required
        v-model="openingHours.wed"
        label="Wednesday"
        outlined
      >{{ openingHours.wed }}</v-text-field>
      <v-text-field
        required
        v-model="openingHours.thu"
        label="Thursday"
        outlined
      >{{ openingHours.thu }}</v-text-field>
      <v-text-field
        required
        v-model="openingHours.fri"
        label="Friday"
        outlined
      >{{ openingHours.fri }}</v-text-field>
      <v-text-field
        required
        v-model="openingHours.sat"
        label="Satuday"
        outlined
      >{{ openingHours.sat }}</v-text-field>
      <v-text-field
        required
        v-model="openingHours.sun"
        label="Sunday"
        outlined
      >{{ openingHours.sun }}</v-text-field>
    </div>
  </div>
</template>

<script>
export default {
    props: ["openingHours"]
};
</script>

<style lang="scss" scoped>

</style>t