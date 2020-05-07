<template>
  <v-container grid-list-xs>
    <v-row class="info-box">
      <v-col sm="4" xs="12">
        <h1>About us</h1>
      </v-col>
    </v-row>
    <v-row class="info-box">
      <v-col xs="12" sm="3" md="3" v-for="item in aboutBoxes" v-bind:key="item.title">
        <listbox style="white-space: pre-wrap;" v-bind:title="item.title" v-bind:list="item.list"></listbox>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

// eslint-disable-next-line no-unused-vars
import Listbox from "../components/Listbox.vue";
export default {
  data() {
    return {
      aboutBoxes: [
        {
          title: "Location",
          list: [
            "Just Cupcakes a/s",
            "Storegade 107",
            "6700 Esbjerg",
            "Denmark",
            "Phone: 22334455",
            "Mail: JC@mail.com"
          ]
        },
        {
          title: "Opening Hours",
          list: [
            "Monday: 07:00 - 17:00",
            "Tuesday: 07:00 - 17:00",
            "Wednesday: 07:00 - 17:00",
            "Thursday: 07:00 - 17:00",
            "Friday: 07:00 - 17:00",
            "Saturday: 07:00 - 17:00",
            "Sunday: closed"
          ]
        },
        {
          title: "Get in touch",
          list: [
            "Some about text here.. "
          ]
        }
      ]
    };
  },
  components: {
    Listbox
  }
};
</script>

<style lang="scss" scoped>
.info-box:first-child .col h1 {
  font-size: 200%;
  padding: 30px;
}
</style>
