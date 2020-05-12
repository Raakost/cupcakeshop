<template>
  <div>
    <h1 style="text-align:right;">Location</h1>
    <div class="info-div">
      <ul style="list-style: none; padding-left: 0; text-align: center;">
        <div style="display: inline-block; text-align: left; padding: 10px;">
          <li>{{companyInfo.name}}</li>
          <li>{{companyInfo.street}}</li>
          <li>{{companyInfo.zipcode}} {{companyInfo.city}}</li>
          <li>{{companyInfo.phone}}</li>
          <li>{{companyInfo.email}}</li>
        </div>
      </ul>
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