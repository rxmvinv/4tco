<template>
  <div id="app">
    <Header msg="Welcome to Your Vue.js App"/>
    <Content />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Content from './components/content/Content.vue'
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    Header,
    Content
  },
  methods: {
    ...mapActions({
      fetchInitial: 'main/fetchInitial'
    })
  },
  mounted() {
    this.fetchInitial();
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background: #1F2224;
  overflow-x: hidden;
}
html, body, #app {
  width: 100vw;
  min-height: 100vh;
  height: auto;
  margin: 0;
}
</style>
