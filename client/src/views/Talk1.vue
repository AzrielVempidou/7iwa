//Inbox.vue

<template>
  <div ref="talkjs" style="width: 100%; margin: 30px; height: 500px">
    <i>Loading chat...</i>
  </div>
</template>

<style>
.Inbox .center-stage {
  margin: unset !important
}
</style>

<script>
import { mapState, mapActions } from 'pinia';
import { useCounterStore } from '../stores/counter';
import Talk from 'talkjs';
export default {
  name: 'Inbox',
  computed: {
    ...mapState(useCounterStore, ['dataCustomer']),
  },
  methods: {
    ...mapActions(useCounterStore, ['getCustomerById'])
  },
  created() {
    this.getCustomerById()
  },
  async mounted() {
    await Talk.ready
    // console.log("test");
    console.log(
      localStorage.getItem("id"),
      localStorage.getItem("name"),
      localStorage.getItem("email")
    );
    const me = new Talk.User({
      id: localStorage.getItem("id"),
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      welcomeMessage: "Hey there! How Can i help? :-)",
      role: "Counselor"
    })

    const talkSession = new Talk.Session({
      appId: 'tKVug7dm',
      me: me,
    });

    talkSession.onMessage(() => {
      console.log("Ada yang nge chat");
    })

    const other = new Talk.User({
      id: '1',
      name: 'azriel.vempidou00@gmail.com',
      email: 'azriel.vempidou00@gmail.com',
      welcomeMessage: 'Hey... I need your help',
      role: 'Customer'
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
      const chatEndedMessage = new Talk.Message({
        text: "Chat has ended.",
        sender: me,
      });
      conversation.sendMessage(chatEndedMessage);
    }, 30000); 
  }
}
</script>