<template>
  <v-container grid-list-xs>
    <v-col offset-lg="1" offset-md="1" lg="9" md="9" sm="12" style="background-color:#cac0c4d1;">
      <v-row v-if="companyInfo" class="info-box">
        <v-col sm="12" md="12" lg="4">
          <CompanyInfo v-bind:companyInfo="companyInfo.companyInfo"></CompanyInfo>
        </v-col>
        <v-col sm="12" md="12" lg="4">
          <Openinghours v-bind:openingHours="companyInfo.openingHours"></Openinghours>
        </v-col>
        <v-col sm="12" md="12" lg="4">
          <About v-bind:about="companyInfo.about"></About>
        </v-col>
        <v-btn
          @click="saveCompanyInfo()"
          style="margin:10px; background-color:#56cac2; color:white; border-radius:0;"
        >Save</v-btn>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import Openinghours from "../components/admin/Openinghours.vue";
import CompanyInfo from "../components/admin/CompanyInfo.vue";
import About from "../components/admin/About.vue";
export default {
  data() {
    return {};
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
  },
  methods: {
    saveCompanyInfo() {
      this.$store.dispatch("updateCompanyInfo", 
        this.companyInfo
      );
    }
  }
};
</script>
<style lang="scss" scoped>
</style>