<template>
<div>
  <h4 class="mb-3 subheading">留言</h4>
  <div class="mb-4" v-for="(comment, index) of comments" :key="index">
    <v-layout class="comment-title px-2">
      <span class="body-1">{{ comment.messager }}</span>
      <v-spacer></v-spacer>
      <span class="date"> {{ formatDate(comment.date) }}</span>
    </v-layout>
    <p class="px-2 mt-2">{{ comment.body }}</p>
  </div>
</div>
</template>

<script>
import { ArticlesService } from "../../util/services/admin/articles.service";
import moment from 'moment';

export default {
  name: "Comments",
  props: {
    comments: Array
  },
  data: () => ({
    articleService: new ArticlesService(),
    username: "",
    comment: ""
  }),
  created() {},
  methods: {
    formatDate (date) {
      return moment(date).format('MMM DD, YYYY');
    }
  },
  watch: {
    comments: function(from, to) {}
  },
  computed: {
  },
  mounted() {
    console.log(this.comments);
  }
};
</script>

<style lang="scss" scoped>
.comment-title {
  border-bottom: 1px solid #e2e2e2;
  .date {
    font-size: 12px;
    color: #b6b6b6;
  }
}
</style>