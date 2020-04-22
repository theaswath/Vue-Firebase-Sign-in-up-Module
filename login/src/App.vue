<template>
  <div id="app">
    <transition
      name="router-anim"
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutRight"
      mode="out-in"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>

<style>
body {
  background-color: white;
}
.speed-3 {
  animation-duration: 0.4s;
}
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css";
</style>