<template>
  <v-container>
    <v-row>
      <v-col offset-md="1" md="5">
        <h1>Add cupcake</h1>
        <div id="info" class="pa-2">
          <v-col cols="12" sm="12" md="12">
            <v-text-field required v-model="name" label="Name" placeholder="Name" outlined></v-text-field>
            <v-text-field
              required
              v-model="description"
              label="Description"
              placeholder="Description"
              outlined
            ></v-text-field>
            <v-text-field required v-model="price" label="Price" placeholder="Price" outlined></v-text-field>
            <v-file-input label="File input" @change="uploadImage"></v-file-input>
            <v-btn
              class="add_btn"
              @click="addNewMenuItem"
              :disabled="btnDisabled"
              text
            >Add</v-btn>
            <v-btn class="add_btn" text>Cancel</v-btn>
          </v-col>
        </div>
      </v-col>
      <v-col offset-md="1" md="4">
        <h1>Preview</h1>
        <div id="info" class="pa-2">
          <v-simple-table id="menu-table">
            <thead>
              <tr>
                <th class="text-left" style="width:20%">Image</th>
                <th class="text-left" style="width:60%">Name</th>
                <th class="text-left" style="width:100px">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div v-if="image">
                    <v-img id="td_image" v-bind:src="image"></v-img>
                  </div>
                </td>
                <td>
                  <span id="td_name">{{ name }}</span>
                  <br />
                  <span id="td_description">{{ description }}</span>
                </td>
                <td id="preview_menuitem_price">{{ price }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { dbMenuAdd, fb } from "../../../firebase";

export default {
  data() {
    return {
      name: "",
      description: "",
      price: "",
      image: null,
      btnDisabled: true
    };
  },
  methods: {
    uploadImage(e) {
      let file = e;
      console.log(e);
      var storageRef = fb.storage().ref("products/" + file.name);
      let uploadTask = storageRef.put(file);
      uploadTask.on(
        "state_changed",
        // eslint-disable-next-line no-unused-vars
        snapshot => {},
        error => {
          console.error("Error updating document: ", error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.image = downloadURL;
            this.btnDisabled = false;
            console.log("File available at", downloadURL);
          });
        }
      );
    },
    addNewMenuItem() {
      dbMenuAdd.add({
        name: this.name,
        description: this.description,
        price: this.price,
        image: this.image
      });
      this.$router.push("/admin");
    }
  }
};
</script>

<style lang="scss" scoped>
.v-btn.add_btn {
  @include button_mixin(#56cac2, #ffffff, 0);
  margin-right:5px;
}
.col h1 {
  @include infobox_mixin(
    3px,
    map-get($colorz, white),
    10px,
    5px,
    map-get($colorz, lightgrey)
  );
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 200;
  text-align: right;
  background-color: map-get($colorz, secondary);
  font-size: 16px;
  font-family: "Lato", sans-serif;
}
.col:last-child h1 {
  @include infobox_mixin(
    3px,
    map-get($colorz, white),
    10px,
    5px,
    map-get($colorz, lightgrey)
  );
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 200;
  text-align: left;
  background-color: map-get($colorz, secondary);
  font-size: 16px;
  font-family: "Lato", sans-serif;
}

#info {
  background-color: white;
}

tr th {
  font-size: 16px;
  font-family: "Lato", sans-serif;
  color: #636363;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 200;
}
tr th:last-child {
  font-size: 16px;
  font-family: "Lato", sans-serif;
  color: #636363;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 200;
  height: 46px;
}

tr td {
  padding: 10px 10px 10px 12px;
  font-family: "Lato", sans-serif;
}

#td_description {
  font-style: italic;
  font-weight: 200;
  color: map-get($colorz, lightgrey);
  font-family: "Lato", sans-serif;
}

#td_image {
  max-width: 80px;
  max-height: 80px;
  padding: 0;
}

.theme--light.v-data-table
  tbody
  tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: #56cac25c;
}

#basket_checkout {
  font-family: "Lato", sans-serif;
}

#basket_checkout p:first-child {
  line-height: 0.1rem;
}

.basket_btn {
  color: #e9e26b !important;
  caret-color: #e9e26b !important;
}
</style>