<template>
<div>
  <h4 class="mb-3 subheading">留言</h4>
  <div class="mb-4" v-for="(comment, index) of comments" :key="index">
    <v-layout class="comment-title px-2">
      <span class="body-1">{{ comment.messenger }}</span>
      <v-spacer></v-spacer>
      <span class="date"> {{ formatDate(comment.date) }}</span>
    </v-layout>
    <p class="px-2 mt-2">{{ comment.body }}</p>
  </div>

  <v-form class="mt-4">
    <h4 class="body-2">添加留言</h4>
    <v-text-field label="昵称" v-model="username" hide-details class="my-1" required color="red accent-2 white--text"></v-text-field>
    <v-text-field label="留言" v-model="comment" hide-details multi-line required color="red accent-2 white--text"></v-text-field>
    <v-layout>
      <v-spacer></v-spacer>
      <v-btn @click="submitComment" color="red accent-2 white--text">提交</v-btn>
    </v-layout>
  </v-form>
</div>
</template>

<script>
import { ArticlesService } from "../../util/services/admin/articles.service";
import moment from 'moment';

export default {
  name: "Comments",
  props: {
    comments: Array,
    articleId: String | Object
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
    },
    submitComment () {
      this.articleService.uploadCommentByArticleId(this.articleId, {
        username: this.username,
        comment: this.comment
      }).then(article => {
        this.comment = '';
        this.comments = article.comments;
      }).catch(error => {
        //@@todo: add error prompt
      });
    }
  },
  watch: {
    comments: function(from, to) {}
  },
  computed: {
  },
  mounted() {
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