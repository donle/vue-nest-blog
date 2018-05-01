<template>
<div class="text-xs-center">
  <v-btn fab bottom right dark fixed color="red accent-2" :to="{ path: 'new-thread', query: { type: 'blog' }}">
    <v-icon dark class="add-btn-icon">add</v-icon>
  </v-btn>
</div>
</template>

<script>
export default {
  name: "Blog",
  created() {},
  methods: {
  }
};
</script>

<style lang="scss" scoped>
  .add-btn-icon {
    display: flex;
  }
</style>