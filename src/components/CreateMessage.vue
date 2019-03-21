<template>
  <div class="container" style="margin-bottom: 30px">
    <form @submit.prevent="CreateMessage">
      <div class="form-group">
        <input type="text" class="form-control" name="message" placeholder="Enter message..." v-model="NewMessage">
        <p class="text-danger" v-if="errorText">{{ errorText }}</p>
        <button class="btn btn-primary" type="submit" name="action">Submit </button>
      </div>
    </form>
  </div>
</template>

<script>
//import fb from "./firebase/init.js"
import fb from "@/firebase/init";

export default {
  name: "CreateMessage",
  props: ["name"],
  data() {
    return {
      newMessage: null,
      errorText: null,
    }
  },
  methods: {
    createMessage () {
      if (this.newMessage) {
        fb.collection("messages").add( {   // This should collect messages to localstorage ! ! ! EDIT: ON THIS CASE WE ARE USING FIREBASE!
          message: this.newMessage,
          name: this.name,
          timestamp: Date.now()
        }) .catch(err => {
          console.log(err)
        });
        this.newMessage = null;
        this.errorText = null;

      } else {
        this.errorText = "Text field is empty";
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
