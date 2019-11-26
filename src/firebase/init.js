 // Initialize Firebase
 var config = {
     apiKey: "AIzaSyAp5VIuPSSfljXitc-AS4sjmCflyNFZbE0",
     authDomain: "chat-a60d0.firebaseapp.com",
     databaseURL: "https://chat-a60d0.firebaseio.com",
     projectId: "chat-a60d0",
     storageBucket: "",
     messagingSenderId: "102400729618"
 };
 const firebaseApp = firebase.initializeApp(config);
 firebaseApp.firestore().settings({ timestampsInSnapshots: true });

 export default firebaseApp.firestore();