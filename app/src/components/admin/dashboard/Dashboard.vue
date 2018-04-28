<template>
  <div id="dashboard">
    dashboard works!
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