<template>
  <div class="systems-table">
    <div class="title">Systems</div>
    <div class="table-list">
      <div class="systems-header">
        <div>System Name</div>
        <div>ID</div>
        <div>Created Date</div>
        <div>Active Licenses</div>
        <div></div>
      </div>
      <SystemRow
        v-for="system in uploadedData.systems"
        v-bind:key="system.id + '_system'"
        v-bind:systemData="system"
        v-bind:subsystemData="
          uploadedData.subsystems.filter(subsys => subsys.system_id === system.id)
        "
      />
    </div>
  </div>
</template>

<script>
import SystemRow from './SystemRow.vue'

export default {
  name: 'Systems',
  components: {
    SystemRow
  },
  props: {
    uploadedData: Object
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
.title {
  margin-bottom: 24px;
}
.systems-table {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
}
.table-header {

}
.table-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.systems-header {
  display: flex;
  width: 100%;
  justify-content: space-around;
  font-size: 12px;
  opacity: 0.6;
  margin-bottom: 8px;
  text-indent: 16px;
}
.systems-header div {
  flex-basis: 20%;
  display: flex;
  text-indent: 16px;
}
.systems-header div:nth-child(2),
.systems-header div:nth-child(4) {
  flex-basis: 15%;
  justify-content: flex-end;
}
.systems-header div:nth-child(3) {
  justify-content: center;
}
.systems-header div:nth-child(5) {
  flex-basis: 30%;
}
</style>
