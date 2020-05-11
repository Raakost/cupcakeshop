/* eslint-disable vue/no-use-v-if-with-v-for */
<template>
  <v-container grid-list-xs>
    <v-row>
      <!-- info box -->
      <v-col offset-md="1" offset-lg="1" lg="5" md="10" sm="12" xs="12">
        <h1 style="text-align:left">Info</h1>
        <div id="info" class="pa-2">
          <v-row class="ma-0">
            <v-col cols="12" md="4">
              <v-row align="center">
                <div
                  style="margin-left:10px; opacity:70%;"
                  id="status_box"
                  class="incomplete"
                >Imcomplete</div>
                <span class="font-weight-light caption pl-1 pa-2">Not started yet</span>
              </v-row>
              <v-row align="center">
                <div
                  style="margin-left:10px; opacity:70%;"
                  id="status_box"
                  class="inprogress"
                >In progress</div>
                <span class="font-weight-light caption pl-1 pa-2">Working on it</span>
              </v-row>
              <v-row align="center">
                <div
                  style="margin-left:10px; opacity:70%;"
                  id="status_box"
                  class="complete"
                >Completed</div>
                <span class="font-weight-light caption pl-1">Done</span>
              </v-row>
            </v-col>
            <v-col cols="12" md="7">
              <v-row>
                <p class="caption pl-1">
                  <b>Click</b> to switch stage: incomplete => in progres => complete
                </p>
                <div id="status_box" class="incomplete" style="opacity:70%">Incomplete</div>
                <div id="status_box" class="inprogress" style="opacity:70%">In progress</div>
                <div id="status_box" class="complete" style="opacity:70%">Completed</div>
              </v-row>
              <v-row>
                <span class="mt-4" style="font-size:12px;">
                  <v-icon color="grey">archive</v-icon>Archive to hide from list
                </span>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </v-col>

      <v-col offset-md="1" offset-lg="1" lg="10" md="10" sm="12" xs="12">
        <!-- Orders -->
        <h1 style="text-align:left;" class="mt-2 mb-1">Orders</h1>
        <div id="info">
          <v-simple-table id="menu-table">
            <template v-slot:default>
              <thead>
                <tr style="background-color:#984c6b1f;">
                  <th style="width:5%;">Order Number</th>
                  <th style="width:35%">Customer</th>
                  <th style="width:5%;">QTY</th>
                  <th style="width:35%;">Item</th>
                  <th style="width:5%;">Price</th>
                  <th style="width:5%;">Status</th>
                  <th style="width:5%;">Archive</th>
                  <th style="width:5%;">Remove</th>
                </tr>
              </thead>
              <tbody class="font-weight-light">
                <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
                <tr v-for="item in orderItems" :key="item.name" v-if="item.archive == false">
                  <td>{{ item.orderNo }}</td>
                  <td>                
                    {{item.customer.name}}<br> 
                    {{item.customer.address}}<br>
                    {{item.customer.zipcode}} {{item.customer.city}}<br>
                    {{item.customer.email}}             
                  </td>
                  <td>
                    <p v-for="subitem in item.orderLines" :key="subitem.id">{{ subitem.quantity }}</p>
                  </td>
                  <td>
                    <p v-for="subitem in item.orderLines" :key="subitem.id">{{ subitem.name }}</p>
                  </td>
                  <td>
                    <p v-for="subitem in item.orderLines" :key="subitem.id">{{ subitem.price }}</p>
                  </td>
                  <td>
                    <div
                      style="opacity:70%;"
                      id="status_box"
                      v-bind:class="item.status"
                      @click="switchStage(item.id)"
                    >{{ item.status }}</div>
                  </td>
                  <td>
                    <v-btn text small @click="archiveOrderItem(item.id)">
                      <v-icon color="grey">archive</v-icon>
                    </v-btn>
                  </td>
                  <td>
                    <v-btn text small @click="deleteOrderItem(item.id)">
                      <v-icon color="incomplete">delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-col>
      <!-- Completed orders -->
      <v-col offset-lg="1" offset-md="1" lg="5" md="5" sm="6" xs="6">
        <h1>Completed orders</h1>
        <v-simple-table id="menu-table" style="border-radius: 0;">
          <thead>
            <tr style="background-color:#984c6b1f;">
              <th style="width:15%;">Order Number</th>
              <th style="width:70%;">Customer</th>
              <th style="width:15%;">Remove</th>
            </tr>
          </thead>
          <tbody class="font-weight-light">
            <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
            <tr id="revenueList" v-for="item in orderItems" :key="item.name" v-if="item.archive == true">
              <td>{{item.orderNo}}</td>
              <td>{{item.customer.name}}</td>
              <td>
                <v-btn small text @click="deleteOrderItem(item.id)">
                  <v-icon color="incomplete" style="text-align: right; opacity: 0.7;">delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
      <!-- Revenue -->
      <v-col lg="5" md="5" sm="6" xs="6">
        <h1 style="text-align:left;" class="mb-1">Revenue</h1>
        <div id="info" class="pa-2">
          <div id="totalRevenue">
            <p id="totalRevenueText">
              Total Revenue:
              <span id="totalRevenueTextTotal">{{ revenueTotal }}</span>
            </p>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { dbMenuAdd, dbOrders } from "../../firebase";

export default {
  data() {
    return {
      tempBasket: []
    };
  },
  beforeCreate() {
    this.$store.dispatch("setOrderItems");
  },
  methods: {
    switchStage(id) {
      let selectedOrderItem = this.orderItems.filter(item => item.id === id)[0];
      if (selectedOrderItem.status === "inprogress") {
        dbOrders
          .doc(id)
          .update({ status: "complete" })
          .then(() => {});
      } else if (selectedOrderItem.status === "incomplete") {
        dbOrders
          .doc(id)
          .update({ status: "inprogress" })
          .then(() => {});
      } else if (selectedOrderItem.status === "complete") {
        dbOrders
          .doc(id)
          .update({ status: "incomplete" })
          .then(() => {});
      }
    },
    archiveOrderItem(id) {
      dbOrders
        .doc(id)
        .update({
          archive: true
        })
        .then(() => {});
    },
    deleteOrderItem(id) {
      dbOrders
        .doc(id)
        .delete()
        .then(() => {
          console.log("deleted: ");
        })
        .catch(error => {
          console.log(error);
        });
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
    orderItems() {
      return this.$store.getters.getOrderItems;
    },
    revenueTotal() {
      var revenueIncome = 0;

      this.orderItems.forEach(element => {
        if (element.archive == true) {
          element.orderLines.forEach(elem => {
            revenueIncome += elem.price * elem.quantity;
          });
        }
      });
      return revenueIncome;
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
  font-size: 12px;
  font-family: "Lato", sans-serif;
  color: #636363;
  text-transform: uppercase;
  font-weight: 200;
  padding-left: 16px;
}
tr th:last-child {
  font-size: 12px;
  font-family: "Lato", sans-serif;
  color: #636363;
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

#status_box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  width: 70px;
  font-family: Lato, sans-serif;
  font-size: 9px;
  font-weight: bold;
  text-transform: uppercase;
  color: black;
  border-radius: 2px;
  margin: 5px;
}

#totalRevenue {
  padding: 20px 10px 20px 0;
  display: flex;
}

#totalRevenueText {
  display: flex;
  margin: 0;
  justify-content: space-between;
  font-style: italic;
  width: 100%;
}

#totalRevenueTextTotal {
  text-decoration: underline;
  border-bottom: 1px solid black;
  font-weight: bold;
  font-style: normal;
}
</style>