<template>
  <div>
    <h1 style="text-align:right;">Location</h1>
    <div v-if="companyInfo" id="info" class="pa-4">
      <v-text-field
        required
        v-model="companyInfo.street"
        label="Streetname & number"
        placeholder="Streetname & number"
        outlined
      >{{ companyInfo.street }}</v-text-field>
      <v-text-field
        required
        v-model="companyInfo.zipcode"
        label="Zipcode"
        placeholder="Zipcode"
        outlined
      >{{ companyInfo.zipcode }}</v-text-field>
      <v-text-field
        required
        v-model="companyInfo.city"
        label="City"
        placeholder="City"
        outlined
      >{{ companyInfo.city }}</v-text-field>
      <v-text-field
        required
        v-model="companyInfo.phone"
        label="Phone"
        placeholder="Phone"
        outlined
      >{{ companyInfo.phone }}</v-text-field>
      <v-text-field
        required
        v-model="companyInfo.email"
        label="Email"
        placeholder="Email"
        outlined
      >{{ companyInfo.email }}</v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  props: ["companyInfo"]
};
</script>

<style lang="scss" scoped>
</style>