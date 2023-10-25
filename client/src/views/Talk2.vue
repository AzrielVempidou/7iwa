//Inbox.vue

<template>
  <div ref="talkjs" style="width: 100%; margin: 30px; height: 500px">
    <i>Loading chat...</i>
  </div>
  <!-- <div>{{ dataCounselor }}</div> -->
</template>

<script>
import Talk from 'talkjs';
import { mapState, mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';
export default {
  name: 'Inbox',
  computed: {
    ...mapState(useCounterStore, ['dataCounselor']),
  },
  methods: {
    ...mapActions(useCounterStore, ['getCounsellorById', 'getCustomerById'])
  },
  created() {
    this.getCounsellorById();
  },
  async mounted() {
    await Talk.ready
    await this.getCounsellorById();
    // console.log("test");
    console.log(
      localStorage.getItem("id"),
      localStorage.getItem("name"),
      localStorage.getItem("email"),
      this.dataCounselor
    );
    const other = new Talk.User({
      id: this.dataCounselor.id,
      name: this.dataCounselor.name,
      email: this.dataCounselor.email,
      welcomeMessage: "Hey there! How Can i help? :-)",
      role: "Customer"
    })

    const me = new Talk.User({
      id: localStorage.getItem("id"),
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      welcomeMessage: "Hey there! How Can i help? :-)",
      role: 'Customer'
    });

    const talkSession = new Talk.Session({
      appId: 'tKVug7dm',
      me: me
    });

    const conversation = talkSession.getOrCreateConversation(
      Talk.oneOnOneId(me, other)
    );

    conversation.setParticipant(me);
    conversation.setParticipant(other);

    const inbox = talkSession.createInbox();
    inbox.select(conversation);
    // console.log(inbox, "<<");

    inbox.mount(this.$refs.talkjs);
    setTimeout(() => {
    router.push('/cust/histories');
  }, 30000); 
  }
}
</script>