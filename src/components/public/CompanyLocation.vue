<template>
  <div>
    <h1 style="text-align:right;">Location</h1>
    <div class="info-div">
      <ul style="list-style: none; padding-left: 0; text-align: center;">
        <div style="display: inline-block; text-align: left;">
          <li>{{companyInfo.name}}</li>
          <li>{{companyInfo.street}}</li>
          <li>{{companyInfo.zipcode}}</li>
          <li>{{companyInfo.city}}</li>
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