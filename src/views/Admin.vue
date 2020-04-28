<template>
  <v-container>
    <v-row>
      <v-col offset-md="1" md="6">
        <h1>Cupcake menu items</h1>
        <div id="info">
          <v-simple-table id="menu-table">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left" style="width:70%;">
                    Name
                    <v-btn color="green" small text to="/addNew">
                      <v-icon>add</v-icon>
                      <span style="padding:0 10px;">Add new menu item</span>
                    </v-btn>
                  </th>
                  <th class="text-left pa-3" style="width:100%;">Price</th>
                  <th class="text-left pa-3" style="width:100%;">Edit</th>
                  <th class="text-left pa-3" style="width:100%;">Remove</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cupcakes" :key="item.name">
                  <td>
                    <span id="td_name">{{ item.name }}</span>
                    <span id="td_description">{{ item.description }}</span>
                  </td>
                  <td>{{ item.price }}</td>
                  <td>
                    <v-btn text small>
                      <v-icon color="#56cac2">edit</v-icon>
                    </v-btn>
                  </td>
                  <td>
                    <v-btn text small @click="deleteItem(item.id)">
                      <v-icon color="red">delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { dbMenuAdd } from "../../firebase";

export default {
  data() {
    return {
      basket: [],
      cupcakes: []
    };
  },
  created() {
    dbMenuAdd.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(doc.id, "=>", doc.data());
        var cupcakeMenuItems = doc.data();
        //this.cupcakes.push(cupcakeMenuItems);
        this.cupcakes.push({
          id: doc.id,
          name: cupcakeMenuItems.name,
          description: cupcakeMenuItems.description,
          price: cupcakeMenuItems.price
        });
      });
    });
  },
  methods: {
    deleteItem(id) {
      dbMenuAdd.doc(id).delete().then(function() {
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