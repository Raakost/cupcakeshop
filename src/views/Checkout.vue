<template>
  <v-container grid-list-xs>
    <v-row class>
      <v-col offset-md="1" md="5" xs="12">
        <h1>Checkout</h1>
        <div id="info" class="pa-2">
          <v-col cols="12" sm="12" md="12">
            <v-text-field required v-model="email" label="Email" placeholder="Email" outlined></v-text-field>
            <v-text-field required v-model="name" label="Name" placeholder="Name" outlined></v-text-field>
            <v-text-field
              required
              v-model="address"
              label="Streetname & No"
              placeholder="Streetname & No"
              outlined
            ></v-text-field>
            <v-text-field
              style="display:inline-block; width:40%; margin-right:2%;"
              required
              v-model="zipcode"
              label="Zipcode"
              placeholder="Zipcode"
              outlined
            ></v-text-field>
            <v-text-field
              style="display:inline-block; width:58%;"
              required
              v-model="city"
              label="City"
              placeholder="City"
              outlined
            ></v-text-field>
            <br />
            <v-btn @click="checkout()" text class="add_btn">Checkout</v-btn>
          </v-col>
        </div>
      </v-col>
      <v-col offset-md="1" md="4">
        <h1>Basket</h1>
        <div id="info">
          <v-simple-table id="menu-table" v-if="basket.length > 0">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left pa-3" style="width:30%;">Quantity</th>
                  <th class="text-left pa-3" style="width:30%;">Name</th>
                  <th class="text-left pa-3" style="width:20%;">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in basket" :key="item.name">
                  <td>{{ item.quantity }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.price }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-simple-table v-else></v-simple-table>
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
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      tempBasket: [],
      email: "",
      name: "",
      address: "",
      zipcode: "",
      city: ""
    };
  },
  methods: {
    checkout() {
      if (this.tempBasket) {
        this.$store.dispatch("setCheckoutItems", {
          email: this.email,
          name: this.name,
          address: this.address,
          zipcode: this.zipcode,
          city: this.city
        });
      }
    }
  },
  computed: {
    basket() {
      return this.$store.getters.getBasketItems;
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
</style>