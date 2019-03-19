<template>
  <div class = "container chat">
    <h2 class="text-primary text-center">Real chat</h2>
    <h5 class="text-secondary text-center">Powered by Vue.js</h5>
    <div class="card">
      <div class="card-body">
        <p class="text-seconday nomessages" v-fi="messages.length == 0"> 
          [No messages!]
        </p>
        <div class="messages box" v-scroll="handleScroll">
          <div v-for="message in messages" :key="message.id">
            <span class="text-info">[{{ message.name }}]</span>
            <span class="">{{ message.message }}</span>
            <span class="text-secondary time">{{ message.timestamp }}</span>
          </div>
        </div>
      </div>
      <div class="card-action">
        <CreateMessage :name="name"/>
      </div>
    </div>
  </div>  
</template>

<!-- JavaScript part -->
<script>
import CreateMessage from "@/components/CreateMessage";
import fb from "@/firebase/init";
import moment from "moment";

export default {
  name: 'chat',
  props: ['name'],
  components: {
    CreateMessage
  },
  // data function is the best here
  data() {
    return {
      messages: []
    }
  },
  
  created: function printTime() {
      var d = new Date();
      var hours = d.getHours();
      var mins = d.getMinutes();
      var secs = d.getSeconds();
      //document.body.innerHTML = hours+":"+mins+":"+secs;
      let realtime = hours+":"+mins+":"+secs;
      //document.body.innerHTML = realtime;  
  }, // USE THIS: setInterval(printTime, 1000); TO PRINT TIME STAMP
  
  created() {
   let ref = fb.collection("messages").orderBy("timestamp"); // LOCAL STORAGEEN! ! !

    ref.onSnapshot(snapshot => {
      snapshot.docChages().forEach(change => {
        if (change.type = "added") {
          let cod = change.doc;
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            message: doc.data().message,
            timestamp: moment(doc.data().timestamp).format("LTS") //https://momentjs.com/  GOOD TOOL ;)
          });
        }

      });
    });
  } 
}

Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
});


// MAIN APP
new Vue({
	el: '#Chat',
  methods: {
    handleScroll: function (evt, el) {
      if (window.scrollY > 50) {
        el.setAttribute(
          'style',
          'opacity: 1; transform: translate3d(0, -10px, 0)'
        )
      }
      return window.scrolly > 100
    }
  }
}); 

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  transition: 1.5s all cubic-bezier(0.39, 0.575, 0.565, 1);
}
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
.chat h2 {
  font-size: 2.6em;
  margin-bottom: 0px;
}
.chat h5 {
  margin-bottom: 40px;
  margin-top: 0px;
}
.chat span {
  font-size: 1.2em;
}
.chat .time {
  display: block;
  font-size: 0.7em;
}
.messages {
  max-height: 300px;
  overflow: auto;
}
</style>
