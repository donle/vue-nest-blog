<template>
  <div></div>
</template>

<script>
export default {
  name: "RecentPost",
  data() {
    return {
      list: []
    };
  },
  created() {
    this.$http
      .get("/api/articles/recent")
      .then(res => res.data)
      .then(data => {
        this.list = data;
        console.log(data);
      });
  },
  methods: {}
};
</script>

<style lang="scss" scoped>

</style>

