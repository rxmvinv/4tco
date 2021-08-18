<template>
  <div class="content">
    <Menu
      v-bind:selectedContent="selectedContent"
      v-bind:changeContent="changeContent"
      v-bind:contentData="contentData"
    />
    <component
      v-bind:is="contentData[selectedContent] ? 
        contentData[selectedContent].value : ''"
      v-bind:uploadedData="contentData[selectedContent] ? 
        contentData[selectedContent].data : {}"
      class="content-inside"
    ></component>
  </div>
</template>

<script>
import Menu from './Menu.vue'
import Outright from './Outright.vue'
import Subscription from './Subscription.vue'
import OfflineActivation from './OfflineActivation/OfflineActivation.vue'
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Content',
  components: {
    Menu,
    Outright,
    Subscription,
    OfflineActivation
  },
  props: {
    msg: String
  },
//   data() {
//     return {
//       selectedContent: 0
//     }
//   },
  computed: {
    ...mapState({
      contentData: state => state.main.tabs,
      selectedContent: state => state.main.selectedContent
    })
  },
  methods: {
    ...mapActions({
      changeContent: 'main/changeContent'
    }),
    // changeContent(indx) {
    //   this.selectedContent = indx;
    // }
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
.content {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
}
.content-menu {
    width: calc(100% - (33px * 2));
    display: flex;
    margin-left: auto;
    margin-right: auto;
}
.content-inside {
    display: flex;
    width: calc(100% - (33px * 2));
    flex-direction: column;
    align-items: flex-start;
    margin: auto;
    color: #D6DDDE;
    font-family: Roboto;
    font-size: 16px;
    animation: opencontent 0.3s linear forwards;
    -webkit-animation: opencontent 0.3s linear forwards;
}

@keyframes opencontent {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@-webkit-keyframes opencontent {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
