<template>
  <v-container>
    <v-snackbar v-model="updatedSuccess">
      {{ updatedText }}
      <v-btn color="pink" text @click="updatedSuccess = false">Close</v-btn>
    </v-snackbar>
    <v-row>  
        <v-col offset-md="1" offset-lg="1" offset-sm="1" offset-xs="1" lg="6" md="10" sm="10" xs="10">
        <h1 style="text-align: right;">
          <span></span>Cupcake menu
        </h1>
        <div id="info">
          <v-simple-table id="menu-table">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left" style="width:20%; padding: 0 10px;">
                    <v-btn
                      class="add_btn"
                      style="background-color:#56cac2; border-radius:0;"
                      text
                      color="#ffffff"
                      to="/addNew"
                    >
                      <v-icon size="small">add</v-icon>
                      <span>Add new</span>
                    </v-btn>
                  </th>
                  <th class="text-left pa-3" style="width:100%;">Name</th>
                  <th class="text-left pa-3" style="width:100%;">Price</th>
                  <th class="text-left pa-3" style="width:100%;">Edit</th>
                  <th class="text-left pa-3" style="width:100%;">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in menuItems" :key="item.name">
                  <td>
                    <v-img id="td_image" v-bind:src="item.image"></v-img>
                  </td>
                  <td>
                    <b>
                      <span id="td_name">{{ item.name }}</span>
                    </b>
                    <br />
                    <span id="td_description">{{ item.description }}</span>
                  </td>
                  <td>{{ item.price }}</td>
                  <td>
                    <v-btn text small @click.stop="dialog = true" @click="editItem(item)">
                      <v-icon color="#56cac2">edit</v-icon>
                    </v-btn>
                  </td>
                  <td>
                    <v-btn text small @click="deleteItem(item.id)">
                      <v-icon color="#56cac2">delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-dialog v-model="dialog" max-width="400">
        <v-card class="dialog-box">
          <h1>Edit cupcake</h1>
          <div class="pa-5">
            <v-col cols="12" sm="12" md="12">
              <v-text-field v-model="item.name" label="Name" placeholder="Name" outlined></v-text-field>
              <v-text-field
                v-model="item.description"
                label="Description"
                placeholder="Description"
                outlined
              ></v-text-field>
              <v-text-field v-model="item.price" label="Price" placeholder="Price" outlined></v-text-field>
              <v-img id="td_image" v-bind:src="item.image"></v-img>
              <v-file-input id="td_edit_image" label="File input" @change="uploadImage"></v-file-input>
              <v-btn class="add_btn" @click="updateItem()" @click.stop="dialog = false" text>Edit</v-btn>
              <v-btn class="add_btn" text @click.stop="dialog = false">Close</v-btn>
            </v-col>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>


<script>
import { dbMenuAdd, fb } from "../../firebase";

export default {
  data() {
    return {
      basket: [],
      dialog: false,
      item: [],
      activeEditItem: null,
      updatedSuccess: false,
      updatedText: "Cupcake has been updated!"
    };
  },
  beforeCreate() {
    this.$store.dispatch("setMenuItems");
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
            this.item.image = downloadURL;
            console.log("File available at", downloadURL);
          });
        }
      );
    },
    editItem(item) {
      this.item = item;
      this.activeEditItem = item.id;
    },
    updateItem() {
      dbMenuAdd
        .doc(this.activeEditItem)
        .update(this.item)
        .then(() => {
          this.updatedSuccess = true;
          console.log("Document successfully updated!");
        })
        .catch(error => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    deleteItem(id) {
      dbMenuAdd
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch(error => {
          console.error("Error removing document: ", error);
        });
    },
    addToBasket(item) {
      if (this.basket.find(arrayItem => item.name === arrayItem.name)) {
        item = this.basket.find(arrayItem => item.name === arrayItem.name);
        this.increase(item);
      } else {
        this.basket.push({
          name: item.name,
          price: item.price,
          quantity: 1
        });
      }
    },
    increase(item) {
      item.quantity++;
    },
    decrease(item) {
      item.quantity--;
      if (item.quantity <= 0) {
        this.basket.splice(this.basket.indexOf(item), 1);
      }
    }
  },
  computed: {
    menuItems() {
      return this.$store.getters.getMenuItems;
    },
    subtotal() {
      var subtotal = 0;
      for (var item in this.basket) {
        subtotal += this.basket[item].quantity * this.basket[item].price;
      }
      return subtotal;
    },
    total() {
      var delivery = 45;
      var total = this.subtotal + delivery;
      return total;
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
  max-width: 120px;
  max-height: 120px;
  padding: 0;
}
#td_edit_image {
  max-width: 60px;
  max-height: 60px;
}

.theme--light.v-data-table
  tbody
  tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: #984c6b1f;
}

#basket_checkout {
  font-family: "Lato", sans-serif;
}

#basket_checkout p:first-child {
  line-height: 0.1rem;
}

.basket_btn {
  color: #56cac2 !important;
  caret-color: #56cac2 !important;
}

.dialog-box h1 {
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #e6bccd;
  font-size: 16px;
  font-family: "Lato", sans-serif;
  color: #636363;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 200;
  border: 3px dotted white;
}
.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
  border-radius: 0px;
}
</style>