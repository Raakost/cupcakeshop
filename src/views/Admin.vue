<template>
  <v-container>
    <v-snackbar v-model="updatedSuccess">
      {{ updatedText }}
      <v-btn color="pink" text @click="updatedSuccess = false">Close</v-btn>
    </v-snackbar>

    <v-row>
      <v-col offset-md="1" md="6">
        <h1 style="text-align: right;">
          <span></span>Cupcake menu
        </h1>
        <div id="info">
          <v-simple-table id="menu-table">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left" style="width:70%;">
                    <v-btn style="background-color:#56cac2;" text color="#ffffff" to="/addNew">
                      <v-icon size="small">add</v-icon>
                      <span>Add new</span>
                    </v-btn>
                  </th>
                  <th class="text-left pa-3" style="width:100%;">Price</th>
                  <th class="text-left pa-3" style="width:100%;">Edit</th>
                  <th class="text-left pa-3" style="width:100%;">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in menuItems" :key="item.name">
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
        <v-card>
          <h1>Edit cupcake</h1>
          <div id="info" class="pa-5">
            <v-col cols="12" sm="12" md="12">
              <v-text-field v-model="item.name" label="Name" placeholder="Name" outlined></v-text-field>
              <v-text-field
                v-model="item.description"
                label="Description"
                placeholder="Description"
                outlined
              ></v-text-field>
              <v-text-field v-model="item.price" label="Price" placeholder="Price" outlined></v-text-field>
              <v-btn
                @click="updateItem()"
                @click.stop="dialog = false"
                style="background-color:#56cac2; margin-right:5px;"
                text
                color="#ffffff"
              >Edit</v-btn>
              <v-btn
                style="background-color:#56cac2;"
                text
                color="#ffffff"
                @click.stop="dialog = false"
              >Close</v-btn>
            </v-col>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>


<script>
import { dbMenuAdd } from "../../firebase";

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
    editItem(item) {
      this.item = item;
      this.activeEditItem = item.id;
    },
    updateItem() {
      dbMenuAdd
        .doc(this.activeEditItem)
        .update(this.item)
        .then(() => {
          this.updatedSuccess = true
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
    deleteItem(id) {
      dbMenuAdd
        .doc(id)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
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
</style>