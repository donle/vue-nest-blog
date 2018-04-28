<template>
  <div id="travel">
      <v-layout>
        <v-flex sm7 xs12 class="articles pa-2">
          <ArticleList :articles="articles" />
        </v-flex>
        <v-flex sm5 hidden-xs-only class="pa-2">
          <RecentPost />
        </v-flex>
      </v-layout>
  </div>
</template>

<script>
import ArticleList from '../shares/ArticleList';
import RecentPost from '../shares/RecentPost';

export default {
  name: 'Travel',
  components: { ArticleList, RecentPost },
  data () {
    return {
      articles: [
        [
          { title: '雪梨留學打工記3 居然是團體面試？！', creationDate: new Date(), subCategory: '悉尼', articleId: 12345678 },
          { title: '雪梨留學打工記3 居然是團體面試？！', creationDate: new Date(), subCategory: '悉尼', articleId: 12345678 },
          { title: '雪梨留學打工記3 居然是團體面試？！', creationDate: new Date(), subCategory: '悉尼', articleId: 12345678 },
        ],
        [
          { title: '雪梨留學打工記3 居然是團體面試？！', creationDate: new Date(), subCategory: '墨尔本', articleId: 12345678 },
          { title: '雪梨留學打工記3 居然是團體面試？！', creationDate: new Date(), subCategory: '墨尔本', articleId: 12345678 },
          { title: '雪梨留學打工記3 居然是團體面試？！', creationDate: new Date(), subCategory: '墨尔本', articleId: 12345678 },
        ],
        [
          { title: '雪梨留學打工記3 居然是團體面試？！', creationDate: new Date(), subCategory: '堪培拉', articleId: 12345678 },
          { title: '雪梨留學打工記3 居然是團體面試？！', creationDate: new Date(), subCategory: '堪培拉', articleId: 12345678 },
          { title: '雪梨留學打工記3 居然是團體面試？！', creationDate: new Date(), subCategory: '堪培拉', articleId: 12345678 }
        ]
      ]
    }
  },
  created () {
  }
};
</script>

<style lang="scss" scoped>

</style>