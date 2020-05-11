<template>
  <v-container grid-list-xs>
    <v-row class="info-box">
      <v-col offset-lg="1" offset-md="1" lg="5" md="5" sm="6">
        <h1>About us</h1>
      </v-col>
    </v-row>
    <v-row class="info-box">
      <v-col offset-lg="1" offset-md="1" sm="12" md="3" lg="3">
        <CompanyLocation style="white-space: pre-wrap;" v-bind:companyInfo="companyInfo"></CompanyLocation>
      </v-col>
      <v-col sm="12" md="3" lg="3">
        <Openinghours style="white-space: pre-wrap;" v-bind:openinghours="openingHours"></Openinghours>
      </v-col>
      <v-col sm="12" md="3" lg="3">about</v-col>
    </v-row>
  </v-container>
</template>

<script>
import Openinghours from "../components/public/Openinghours.vue";
import CompanyLocation from "../components/public/CompanyLocation.vue";
export default {
  data() {
    return {
      openingHours: [
        "Monday: 07:00 - 17:00",
        "Tuesday: 07:00 - 17:00",
        "Wednesday: 07:00 - 17:00",
        "Thursday: 07:00 - 17:00",
        "Friday: 07:00 - 17:00",
        "Saturday: 07:00 - 17:00",
        "Sunday: closed"
      ],
      companyInfo: {
        name: "Just Cupcakes a/s",
        street: "Storegade 107",
        zipcode: "6700",
        city: "Esbjerg",
        phone: "Phone: 22334455",
        email: "Email: JC@mail.com"
      },

      about: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tincidunt, turpis a vehicula condimentum, augue arcu eleifend ex, in auctor orci turpis non enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam scelerisque ultrices. "]
    };
  },
  components: {
    Openinghours,
    CompanyLocation
  }
};
</script>

<style lang="scss" scoped>
.info-box:first-child .col h1 {
  font-size: 200%;
  padding: 30px;
}
</style>
