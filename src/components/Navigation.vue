<template>
  <div>
    <v-layout>
      <v-navigation-drawer v-model="drawer" app>
        <div v-if="currentUser">
          <v-row class="pa-2" style="margin-top:15px;" justify="space-around">
            <v-avatar size="60px">
              <img src="../assets/avatar.jpg" />
            </v-avatar>
          </v-row>
          <h4 style="text-align:center;">{{ currentUser.email }}</h4>
        </div>
        <ul>
          <router-link style="color:#e6bccd; margin-top:80px;" tag="li" to="/">
            <v-icon color="#e6bccd">home</v-icon>Home
          </router-link>
          <router-link style="color:#e6bccd;" tag="li" to="/Menu">
            <v-icon color="#e6bccd">restaurant_menu</v-icon>Menu
          </router-link>
          <router-link style="color:#e6bccd;" tag="li" to="/About">
            <v-icon color="#e6bccd">info</v-icon>About Us
          </router-link>
          <div v-if="currentUser">
            <router-link style="color:#e6bccd;" tag="li" to="/Admin">
              <v-icon color="#e6bccd">lock_open</v-icon>Admin
            </router-link>
            <router-link style="color:#e6bccd;" tag="li" to="/Orders">
              <v-icon color="#e6bccd">assignment</v-icon>Orders
            </router-link>
          </div>
          <router-link style="color:#e6bccd; position:absolute; bottom: 0;" tag="li" to="/Login">
            <v-icon color="#e6bccd">lock</v-icon>
          </router-link>
        </ul>
      </v-navigation-drawer>
      <v-app-bar app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="headline">
          <span>Just Cupcakes</span>
        </v-toolbar-title>
      </v-app-bar>
    </v-layout>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { db } from "../../firebase";
import firebase from "firebase";
import "firebase/firestore";
import store from "../store/index.js";

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    store.dispatch("setUser", user);
  } else {
    store.dispatch("setUser", null);
  }
});

export default {
  data: () => ({
    drawer: null
  }),
  computed: {
    currentUser() {
      return this.$store.getters.getCurrentUser;
    }
  }
};
</script>

<style lang="scss" scoped>
.theme--light.v-navigation-drawer {
  background-color: #272b2c;
  color: #e6bccd;
  font-family: "Poiret One", cursive;
  letter-spacing: 0.2em;
}

.theme--light.v-app-bar.v-toolbar.v-sheet {
  background-color: #272b2c;
  color: #e6bccd;
}

.theme--light.v-app-bar.v-toolbar.v-sheet span {
  font-family: "Poiret One", cursive;
  font-size: 2.3rem;
  letter-spacing: 0.8em;
}

.mdi-menu::before {
  color: #e6bccd;
}
nav ul {
  padding: 0;
  margin-top: 20px;
  text-decoration: none;
}

nav li {
  color: #e6bccd;
  margin-left: 15%;
  padding: 5px 20px;
  list-style-type: none;
  cursor: pointer;
  font-size: 1.5rem;
}

nav li i {
  margin-right: 10px;
}
</style>