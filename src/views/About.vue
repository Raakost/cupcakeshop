<template>
  <v-container grid-list-xs>
    <v-row class="info-box">
      <v-col offset-lg="1" offset-md="1" lg="5" md="5" sm="6">
        <h1>About us</h1>
      </v-col>
    </v-row>
    <v-row class="info-box">
      <v-col offset-lg="1" offset-md="1" sm="12" md="3" lg="3">
        <CompanyInfo v-bind:companyInfo="companyInfo" v-bind:title="title"></CompanyInfo>
      </v-col>
      <v-col sm="12" md="3" lg="3">
        <Openinghours v-bind:openinghours="openingHours" v-bind:title="title"></Openinghours>
      </v-col>
      <v-col sm="12" md="3" lg="3">
        <About v-bind:about="about" v-bind:title="title"></About>
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
      openingHours: [
        "Mon  07:00 - 17:00",
        "Tue  07:00 - 17:00",
        "Wed  07:00 - 17:00",
        "Thu  07:00 - 17:00",
        "Fri  07:00 - 17:00",
        "Sat  07:00 - 14:00",
        "Sun  07:00 - 14:00"
      ],
      companyInfo: {
        name: "Just Cupcakes a/s",
        street: "Storegade 107",
        zipcode: "6700",
        city: "Esbjerg",
        phone: "Phone: 22334455",
        email: "Email: JC@mail.com"
      },

      about: {
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tincidunt, turpis a vehicula condimentum, augue arcu eleifend ex, in auctor orci turpis non enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam scelerisque ultrices. "
      }
    };
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
