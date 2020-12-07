import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAG6Z0UK2AEaqvUFJinJTQKphP-T2mYS00",
  authDomain: "vue-10-example.firebaseapp.com",
  projectId: "vue-10-example",
  storageBucket: "vue-10-example.appspot.com",
  messagingSenderId: "898811174458",
  appId: "1:898811174458:web:f5cc8293b5e181f8dc5f03",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
export const chatsRef = db.ref("chats");

export default firebase;
