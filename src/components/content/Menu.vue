<template>
  <div class="content-menu">
    <button
      v-for="(content, contIndx) in contentData"
      v-bind:key="content.value + contIndx"
      v-on:click="changeContent(contIndx)"
      v-bind:class="{active: contIndx === selectedContent}"
      class="menu-button"
    >
      {{content.title}}
    </button>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  props: {
    selectedContent: Number,
    changeContent: Function,
    contentData: Array
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
.content-menu {
  border-bottom: 1px solid rgba(139,144,145,0.25);
  margin-bottom: 43px;
}
.menu-button {
  font-family: Roboto;
  font-size: 16px;
  color: #D6DDDE;
  padding: 11px 0;
  width: 144px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
}
.active {
  border-bottom: 2px solid #18A7FF;
}
</style>
