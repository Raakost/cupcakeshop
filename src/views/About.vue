<template>
  <v-container grid-list-xs>
    <v-row class="info-box">
      <v-col offset-lg="1" offset-md="1" lg="5" md="5" sm="6">
        <h1>About us</h1>
      </v-col>
    </v-row>
    <v-row class="info-box" v-if="companyInfo">
      <v-col offset-lg="1" offset-md="1" sm="12" md="3" lg="3">
        <CompanyInfo v-bind:companyInfo="companyInfo.companyInfo"></CompanyInfo>
      </v-col>
      <v-col sm="12" md="3" lg="3">
        <Openinghours v-bind:openinghours="companyInfo.openingHours"></Openinghours>
      </v-col>
      <v-col sm="12" md="3" lg="3">
        <About v-bind:about="companyInfo.about"></About>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Openinghours from "../components/public/Openinghours.vue";
import CompanyInfo from "../components/public/CompanyInfo.vue";
import About from "../components/public/About.vue";
export default {
  data() {
    return {
    };
  },
  beforeCreate() {
    this.$store.dispatch("setCompanyInfo");
  },
  computed: {
    companyInfo() {
      return this.$store.getters.getCompanyInfo;
    }
  },
  components: {
    Openinghours,
    CompanyInfo,
    About
  }
};
</script>

<style lang="scss" scoped>
.info-box:first-child .col h1 {
  font-size: 200%;
  padding: 30px;
}
</style>
