<template>
  <div>
    <v-layout>
      <v-navigation-drawer v-model="drawer" app>
        <ul>
          <router-link style="color:#e6bccd; margin-top:80px;" tag="li" to="/"><v-icon color="#e6bccd">home</v-icon>Home</router-link>
          <router-link style="color:#56cac2;" tag="li" to="/Menu"><v-icon color="#56cac2">restaurant_menu</v-icon>Menu</router-link>
          <router-link style="color:#e9e26b;" tag="li" to="/About"><v-icon color="#e9e26b">info</v-icon>About Us</router-link>
          <router-link style="color:#e6bccd;" tag="li" to="/Login"><v-icon color="#e6bccd">lock</v-icon>Login</router-link>
          <router-link style="color:#56cac2; position:absolute; bottom: 0;" tag="li" to="/Admin"><v-icon color="#56cac2">lock</v-icon>Admin</router-link>
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
export default {
  data() {
    return {
      drawer: true,
      items: [],
      right: true
    };
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