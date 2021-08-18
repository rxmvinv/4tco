<template>
  <header class="main-header">
    <div class="header-title">Licenses</div>
    <div class="plans">
      <div class="current">
        <button
          v-for="plan in plans"
          v-bind:key="plan.slug"
          v-bind:class="{active: plan.active, [plan.name]: plan.name}"
        >
          <span>{{plan.name}}</span>
        </button>
      </div>
      <button
        class="upgrade"
      >Upgrade Now</button>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Header',
  props: {
    msg: String
  },
  computed: {
    ...mapState({
      plans: state => state.main.plans,
    })
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
.main-header {
  font-family: Roboto;
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: 33px;
  letter-spacing: 0em;
  text-align: left;
  color: #D6DDDE;

  display: flex;
  width: 100%;
  justify-content: space-between;
}
.header-title {
  margin: 35px 33px;
}
.plans {
  display: flex;
  align-items: center;
}
.current button {
  width: 56px;
  height: 48px;
  border: none;
  padding: 0;
  margin: 29px 12px;
  cursor: pointer;
}
.current button.Free {
  background: url('../assets/coat_free.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.current button.Pro {
  background: url('../assets/coat_pro.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.current button.VIP {
  background: url('../assets/coat_vip.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.current button span {
  color: #D6DDDE;
  background: #131718;
  display: block;
  width: 100%;
  font-family: Roboto;
  text-transform: uppercase;
}
.current button:not(.active ) span {
  opacity: 0.25;
}
.plans .upgrade {
  font-family: Roboto;
  font-weight: 500;
  font-size: 16px;
  color: #fff;
  background: #18A7FF;
  border: none;
  border-radius: 4px;
  height: 35px;
  margin-left: 24px;
  margin-right: 32px;
  padding-left: 20px;
  padding-right: 20px;
  cursor: pointer;
}
</style>
