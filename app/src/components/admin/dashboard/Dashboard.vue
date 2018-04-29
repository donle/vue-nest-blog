<template>
  <div id="dashboard">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  created () {
  },
  mounted () {
    this.$root.$on('routerChanged', path => {
      console.log(path);
    });
  }
};
</script>

<style lang="scss" scoped>

</style>