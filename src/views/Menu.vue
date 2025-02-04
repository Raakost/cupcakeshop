<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col offset-md="1" offset-lg="1" offset-sm="1" offset-xs="1" lg="5" md="10" sm="10" xs="10">    
        <h1>Cupcake Menu</h1>
        <div id="info">
          <v-simple-table id="menu-table">
            <template v-slot:default>
              <thead>
                <tr>
                  <th></th>
                  <th class="text-left pa-3" style="width:60%;">Name</th>
                  <th class="text-left pa-3" style="width:15%;">Price</th>
                  <th class="text-left pa-3" style="width:100%;">Add to basket</th>
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
                    <v-btn text small v-on:click="addToBasket(item)">
                      <v-icon class="basket_btn">add_box</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-col>    
        <v-col offset-md="1" offset-lg="1" offset-sm="1" offset-xs="1" lg="4" md="10" sm="10" xs="10">
        <h1>Basket</h1>
        <div id="info">
          <v-simple-table id="menu-table" v-if="basket.length > 0">
            <template v-slot:default>
              <thead>
                <tr>
                  <th></th>
                  <th class="text-left pa-3" style="width:30%;">Name</th>
                  <th class="text-left pa-3" style="width:20%;">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in basket" :key="item.name">
                  <td>
                    <v-btn text small @click="decrease(item)">
                      <v-icon class="basket_btn">indeterminate_check_box</v-icon>
                    </v-btn>
                    {{item.quantity}}
                    <v-btn text small @click="increase(item)">
                      <v-icon class="basket_btn">add_box</v-icon>
                    </v-btn>
                  </td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.price }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-simple-table v-else>
            <p
              style="text-align: center; 
              padding: 16px; 
              font-size: 16px; margin:0;"
            >
              <b>No cupcakes in your basket yet :(</b>
            </p>
          </v-simple-table>
          <v-divider></v-divider>
          <v-row id="basket_checkout" class="mt-4" style="margin:0;">
            <v-col>
              <p>Subtotal:</p>
              <p>Delivery:</p>
              <p>
                <b style="font-size:16px;">Total:</b>
              </p>
            </v-col>
            <v-col class="text-right">
              <p>{{ subtotal }} DKK</p>
              <p v-if="basket.length > 0">45 DKK</p>
              <p v-else>0 DKK</p>
              <p>
                <b style="font-size:16px;" v-if="basket.length > 0">{{ total }} DKK</b>
                <b v-else>0 DKK</b>
              </p>
            </v-col>
          </v-row>
          <v-row style="margin:0;">
            <v-spacer></v-spacer>
            <v-btn
              text
              style="margin:10px; background-color:#56cac2; color:white; border-radius:0"
              @click="checkout()"
            >Proceed to Checkout</v-btn>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { dbMenuAdd } from "../../firebase";

export default {
  data() {
    return {
      tempBasket: []
    };
  },
  beforeCreate() {
    this.$store.dispatch("setMenuItems");
  },
  methods: {
    checkout() {
      this.$router.push("/checkout");
    },
    addToBasket(item) {
      this.tempBasket.push({
        name: item.name,
        price: item.price,
        quantity: 1
      });
      this.$store.commit("addBasketItems", this.tempBasket);
      this.tempBasket = [];
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
    basket() {
      return this.$store.getters.getBasketItems;
    },
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

#td_image {
  max-width: 120px;
  max-height: 120px;
  padding: 0;
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