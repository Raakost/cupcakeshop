<template>
  <div>
    <v-layout>
      <v-navigation-drawer v-model="drawer" app>
        <ul>
          <router-link tag="li" to="/">Home</router-link>
          <router-link tag="li" to="/Menu">Menu</router-link>
          <router-link tag="li" to="/About">About Us</router-link>
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
      items: [
       
      ],
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

nav li:last-child {
  position: absolute;
  bottom: 40px;
}
</style>