import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBHH9U6Ow_xaYPdkoizAfJr6rvtHqBAR80",
    authDomain: "cupcakeapi-221e7.firebaseapp.com",
    databaseURL: "https://cupcakeapi-221e7.firebaseio.com",
    projectId: "cupcakeapi-221e7",
    storageBucket: "cupcakeapi-221e7.appspot.com",
    messagingSenderId: "39808885852",
    appId: "1:39808885852:web:7014402bf53c089e1ef299"
};
// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()
export const dbMenuAdd = db.collection('menuItems');
export const dbOrders = db.collection('orderItems');
export const dbCompanyInfo = db.collection('companyInfo');
