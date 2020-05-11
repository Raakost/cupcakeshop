<template>
  <div>
    <v-layout>
      <v-navigation-drawer v-model="drawer" app>
        <ul>
          <!-- Avatar -->
          <div v-if="currentUser">
            <v-row class="pa-2" style="margin-top:20px;" justify="space-around">
              <v-avatar size="90px">
                <img src="../assets/avatar.jpg" />
              </v-avatar>
            </v-row>
            <h3 style="text-align:center; padding-bottom:20px;">{{ currentUser.email }}</h3>
            <!-- Edit Home -->
            <hr style="margin-top:10px; border-color:#e6bccd;" />
            <router-link style="color:#e6bccd; margin-top:50px;" tag="li" to="/EditHome">
              <v-icon color="#e6bccd">edit</v-icon>Home
            </router-link>
            <!-- Edit Menu -->
            <router-link style="color:#e6bccd;" tag="li" to="/Admin">
              <v-icon color="#e6bccd">edit</v-icon>Menu
            </router-link>
            <!-- Edit About -->
            <router-link style="color:#e6bccd;" tag="li" to="/EditAbout">
              <v-icon color="#e6bccd">edit</v-icon>About
            </router-link>
            <!-- Orders -->
            <router-link style="color:#e6bccd;" tag="li" to="/Orders">
              <v-icon color="#e6bccd">assignment</v-icon>Orders
            </router-link>
            <hr style="margin-top:50px; border-color:#e6bccd;" />
            <!-- login/sign out -->
            <a
              class="aStyle"
              href="#"
              v-if="currentUser"
              @click.prevent.stop="signOut()"
            >
              <v-icon color="#e6bccd">lock_open</v-icon> Sign out
            </a>
          </div>
          <!-- Home -->
          <router-link style="color:#e6bccd; margin-top:100px;" tag="li" to="/">
            <v-icon color="#e6bccd">home</v-icon>Home
          </router-link>
          <!-- Menu -->
          <router-link style="color:#e6bccd;" tag="li" to="/Menu">
            <v-icon color="#e6bccd">restaurant_menu</v-icon>Menu
          </router-link>
          <!-- Checkout -->
          <router-link style="color:#e6bccd;" tag="li" to="/Checkout">
            <v-icon color="#e6bccd">shopping_cart</v-icon>Checkout
          </router-link>
          <!-- About -->
          <router-link style="color:#e6bccd;" tag="li" to="/About">
            <v-icon color="#e6bccd">info</v-icon>About Us
          </router-link>
          <div v-if="!currentUser">
            <router-link
              style="color:#e6bccd; position:absolute; bottom: 15px;"
              tag="li"
              to="/Login"
            >
              <v-icon color="#e6bccd">lock</v-icon>Login
            </router-link>
          </div>
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
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("You are about to be logged out");
          this.$router.replace("/Home");
        });
    }
  },
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
.aStyle {
  position: absolute;
  bottom: 15px;
  color: #e6bccd;
  margin-left: 15%;
  padding: 5px 20px;
  list-style-type: none;
  cursor: pointer;
  font-size: 1.5rem;
  text-decoration: none;
}
</style>