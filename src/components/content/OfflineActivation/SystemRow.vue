<template>
  <div
    class="system-row"
    v-on:click="toggleActive"
    v-bind:class="{active: isActive}"
  >
    <div class="main-details">
      <div>
        <span class="toggle-indicator"></span>
        {{systemData.system_name}}
      </div>
      <div>{{systemData.id}}</div>
      <div>{{systemData.created_date}}</div>
      <div>{{systemData.active_licenses}}</div>
      <div class="button-section">
        <button
          class="add-license"
          v-on:click="updateSystem({
            ...randomLicense,
            system_id: systemData.id
          })"
        >Add License</button>

        <button
          class="remove-system"
          v-on:click="removeSystem(systemData.id)"
        >Remove</button>
      </div>
    </div>
    <div class="subsystems-list">
      <div class="subsystem-header">
        <div>Licenses</div>
        <div>Expires</div>
        <div></div>
      </div>
      <div
        class="subsystems-details"
        v-for="(subsystem, indx) in subsystemData"
        v-bind:key="'subsystem' + subsystem.system_id + indx"
      >
        <div>{{subsystem.licenses}}</div>
        <div>{{subsystem.expires}}</div>
        <div class="download"><span>Download</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SystemRow',
  props: {
    systemData: Object,
    subsystemData: Array
  },
  data() {
    return {
      isActive: false,
      randomLicense: {
        licenses: "Default", 
        expires: "Never", 
        cost: "00.00"
      }
    }
  },
  methods: {
    ...mapActions({
      uploadFile: 'main/uploadSystem',
      updateSystem: 'main/updateSystem',
      removeSystem: 'main/removeSystem'
    }),
    toggleActive(ev) {
      if (ev.target.tagName !== "BUTTON") {
        this.isActive = !this.isActive;
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
/*
.system-row.active {
  height: auto;
  overflow: auto;
}
.system-row.active .subsystems-list {
  height: auto;
  margin-top: auto;
}
.system-row.active .main-details .toggle-indicator {
  transform: rotate(0deg);
}
*/
.system-row.active {
  animation: mainexp 0.3s linear forwards;
  -webkit-animation: mainexp 0.3s linear forwards;
}
.system-row.active .subsystems-list {
  animation: listexp 0.3s linear forwards;
  -webkit-animation: listexp 0.3s linear forwards;
}
.system-row.active .main-details .toggle-indicator {
  animation: toggleexp 0.3s linear forwards;
  -webkit-animation: toggleexp 0.3s linear forwards;
}

@keyframes mainexp {
    from {
      height: 44px;
      overflow: hidden;
    }
    to {
      height: max-content;
      overflow: auto;
    }
}
@-webkit-keyframes mainexp {
    from {
      height: 44px;
      overflow: hidden;
    }
    to {
      height: max-content;
      overflow: auto;
    }
}


@keyframes listexp {
    from {
      height: 0;
      margin-top: -44px;
    }
    to {
      height: max-content;
      margin-top: 0;
    }
}
@-webkit-keyframes listexp {
    from {
      height: 0;
      margin-top: -44px;
    }
    to {
      height: max-content;
      margin-top: 0;
    }
}

@keyframes toggleexp {
    from {
      transform: rotate(-90deg);
    }
    to {
      transform: rotate(0deg);
    }
}
@-webkit-keyframes toggleexp {
    from {
      transform: rotate(-90deg);
    }
    to {
      transform: rotate(0deg);
    }
}

.system-row {
  display: flex;
  width: 100%;
  justify-content: space-around;

  height: 44px;
  overflow: hidden;

  user-select: none;
}
.main-details, .subsystems-list {
  display: flex;
  width: 100%;
  justify-content: space-around;
}
.main-details {
  z-index: 9;
  cursor: pointer;
}
.main-details div {
  flex-basis: 20%;
  display: flex;
  text-indent: 16px;

  align-items: center;
}

.main-details div:nth-child(2),
.main-details div:nth-child(4) {
  flex-basis: 15%;
  justify-content: flex-end;
}
.main-details div:nth-child(3) {
  justify-content: center;
}
.main-details div:nth-child(5) {
  flex-basis: 30%;
  justify-content: flex-end;
}

.main-details .toggle-indicator {
  display: block;
  background: url('../../../assets/table_indicator.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 12px;
  height: 10px;
  margin: 16px 17px;

  transform: rotate(-90deg);
}
.main-details .button-section button:last-child {
  margin-right: 26px;
}
.main-details .button-section button {
  font-family: Roboto;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  padding: 6px 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  margin-left: 15px;
}
.main-details .add-license {
  background: #499861;
}
.main-details .remove-system {
  background: #CC4343;
}
.subsystems-list {
  flex-direction: column;
  width: 95%;
  margin: auto;

  height: 0;
  margin-top: -44px;

  position: relative;
}
.subsystems-list::before {
  content: "";
  position: absolute;
  background: #161819;
  width: 6px;
  height: calc(100% - 22px);
  left: -16px;
  top: -8px;
}
.system-row {
  display: flex;
  width: 100%;
  justify-content: space-around;
  flex-direction: column;
  margin-bottom: 8px;
}
.subsystems-details, .subsystem-header {
  display: flex;
  width: 100%;
  justify-content: space-around;
}
.subsystems-details {
  position: relative;
  animation: loadsubsystem 0.3s linear forwards;
  -webkit-animation: loadsubsystem 0.3s linear forwards;
}

@keyframes loadsubsystem {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@-webkit-keyframes loadsubsystem {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
.subsystems-details::before {
  content: "";
  position: absolute;
  background: #161819;
  height: 6px;
  width: 16px;
  left: -16px;
  top: 50%;
}
.subsystem-header {
  font-size: 12px;
  opacity: 0.6;
  margin: 8px auto;
  text-indent: 16px;
}
.subsystem-header div, .subsystems-details div {
  flex-basis: 33%;
  display: flex;
  text-indent: 16px;
}
.subsystems-details div:last-child {
  justify-content: flex-end;
}
.subsystems-details div:last-child span {
  margin-right: 30px;
}
.subsystems-details, .main-details {
  background: #1A1C1E;
  border-radius: 4px;
  height: 44px;
  align-items: center;
  margin-bottom: 8px;
}
.download {
  cursor: pointer;
}
</style>
