<template>
  <v-container>
    <v-row>
      <v-col offset-md="3" md="6" xs="12">
        <h1>Login</h1>
        <div id="info" class="pa-2">
          <v-col cols="12" sm="12" md="12">
            <v-text-field required v-model="email" label="Email" placeholder="Email" outlined></v-text-field>
            <v-text-field
              required
              v-model="password"
              label="Password"
              placeholder="Password"
              outlined
            ></v-text-field>
            <v-btn @click.prevent="login()" text class="add_btn">Login</v-btn>            
          </v-col>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";
import "firebase/firestore";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace("/admin");
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === "auth/wrong/password") {
            alert("Wrong Password!");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    },
  }
};
</script>

<style lang="scss">
.v-btn.add_btn {
  @include button_mixin(#56cac2, #ffffff, 0);
  margin-right: 5px;
}
</style>