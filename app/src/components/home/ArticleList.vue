<template>
  <div class="article-list">
    <div class="article-card pt-2 pb-3 mt-3 mb-3 elevation-1" v-for="(article, index) in articles" :key="index">
      <h3 class="card-title ma-0 pl-3 pr-3 pb-2">
        <span>{{article.title + ' - ' + article.category}}</span>
        <v-spacer></v-spacer>
        <span class="sub-card-title"> {{ formatDate(article.date) }} </span>
      </h3>
      <div class="card-body pl-3 pr-3 pt-3">
        <span v-if="article.snapshotUrl" class="card-body-media">
          <img src="@/assets/articles/trips/2018030128374/wechat-image_20180219173001.jpg" />
        </span>
        <v-layout class="card-body-context ma-0 pl-2" row wrap> 
          <v-flex xs12 class="snapshot">
            {{ getShortBody(article.body) }} 
          </v-flex>
          <v-layout row wrap>
            <v-spacer></v-spacer>
            <v-btn flat class="red--text text--accent-2 read-more">阅读全文</v-btn>
          </v-layout>
        </v-layout>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "ArticleList",
  data() {
    return {
      articles: []
    };
  },
  computed: {

  },
  methods: {
    requestArticles: function() {
      this.axios
        .get("/articles/latest")
        .then(result => {
          this.articles = result;
        })
        .catch(err => {});
    },
    formatDate: function(date) {
      return moment(date).format("MMM DD, YYYY");
    },
    getImgUrl(pet) {
      return require(pet);
    },
    getShortBody: function (body) {
      return body.substring(0, 120) + '...';
    }
  },
  created() {
    // this.requestArticles();
    this.articles = [
      {
        category: "游记",
        subCategory: "三月游记",
        title: "雪梨留學打工記3 居然是團體面試？！",
        body: `說完漢堡王的蠢蠢打工小妹經驗
          現在跳到大三
          在學生會（University of Sydney Union）的三週短期打工
          是我漫長打工生涯中，流程走得最正式
          每小時工資也最高的工作

          中間跳過的補習班打工
          因為我現在有時候還會去幫忙
          所以會之後再說
          意思就是說我在申請這份工作的時候
          已經有兩年客戶服務（Customer Service）經驗了
          那份工作上面的要求是一年以上客戶服務經驗

          簡單來介紹一下工作本身
          是在每年初開學前為期一週的Orientation Week
          其實就是社團博覽會跟迎新啦
          這麼重要的活動
          學生會當然也不能錯過
          身為管理所有學生社團的頭頭
          學生會的攤位是所有攤位最大的
          當然，需要的人手也最多囉！
          附上幾張o-week學校的照片

          於是定期有在關注學生會職缺的我
          (那時候想賺錢想瘋了哈哈)
          一看到這個工資這麼高的肥缺就趕快去申請了($25.53一個小時)

          ＿＿＿正文＿＿＿

          申請的時候其實要填很多東西的
          比如你的服務業經驗
          你會怎麼做好這份工作
          還有一些其他的問題大概有五六題吧
          雖然一度想放棄
          但是最後還是認真的回答了全部
          其實就是結合你實際工作的情況回答
          也不算太難
          就是要花一點時間想一下而已
          過大概兩三個星期吧
          收到了郵件`,
        date: new Date("2018-03-01"),
        snapshotUrl:
          "@/assets/articles/trips/2018030128374/wechat-image_20180219173001.jpg"
      },
      {
        category: "文章",
        subCategory: "三月游记",
        title: "雪梨留學打工記3 居然是團體面試？！",
        body: `說完漢堡王的蠢蠢打工小妹經驗
          現在跳到大三
          在學生會（University of Sydney Union）的三週短期打工
          是我漫長打工生涯中，流程走得最正式
          每小時工資也最高的工作

          中間跳過的補習班打工
          因為我現在有時候還會去幫忙
          所以會之後再說
          意思就是說我在申請這份工作的時候
          已經有兩年客戶服務（Customer Service）經驗了
          那份工作上面的要求是一年以上客戶服務經驗

          簡單來介紹一下工作本身
          是在每年初開學前為期一週的Orientation Week
          其實就是社團博覽會跟迎新啦
          這麼重要的活動
          學生會當然也不能錯過
          身為管理所有學生社團的頭頭
          學生會的攤位是所有攤位最大的
          當然，需要的人手也最多囉！
          附上幾張o-week學校的照片

          於是定期有在關注學生會職缺的我
          (那時候想賺錢想瘋了哈哈)
          一看到這個工資這麼高的肥缺就趕快去申請了($25.53一個小時)

          ＿＿＿正文＿＿＿

          申請的時候其實要填很多東西的
          比如你的服務業經驗
          你會怎麼做好這份工作
          還有一些其他的問題大概有五六題吧
          雖然一度想放棄
          但是最後還是認真的回答了全部
          其實就是結合你實際工作的情況回答
          也不算太難
          就是要花一點時間想一下而已
          過大概兩三個星期吧
          收到了郵件`,
        date: new Date("2018-03-02"),
        snapshotUrl:
          "@/assets/articles/trips/2018030128374/wechat-image_20180219173001.jpg"
      },
      {
        category: "音乐",
        subCategory: "三月游记",
        title: "雪梨留學打工記3 居然是團體面試？！",
        body: `說完漢堡王的蠢蠢打工小妹經驗
          現在跳到大三
          在學生會（University of Sydney Union）的三週短期打工
          是我漫長打工生涯中，流程走得最正式
          每小時工資也最高的工作

          中間跳過的補習班打工
          因為我現在有時候還會去幫忙
          所以會之後再說
          意思就是說我在申請這份工作的時候
          已經有兩年客戶服務（Customer Service）經驗了
          那份工作上面的要求是一年以上客戶服務經驗

          簡單來介紹一下工作本身
          是在每年初開學前為期一週的Orientation Week
          其實就是社團博覽會跟迎新啦
          這麼重要的活動
          學生會當然也不能錯過
          身為管理所有學生社團的頭頭
          學生會的攤位是所有攤位最大的
          當然，需要的人手也最多囉！
          附上幾張o-week學校的照片

          於是定期有在關注學生會職缺的我
          (那時候想賺錢想瘋了哈哈)
          一看到這個工資這麼高的肥缺就趕快去申請了($25.53一個小時)

          ＿＿＿正文＿＿＿

          申請的時候其實要填很多東西的
          比如你的服務業經驗
          你會怎麼做好這份工作
          還有一些其他的問題大概有五六題吧
          雖然一度想放棄
          但是最後還是認真的回答了全部
          其實就是結合你實際工作的情況回答
          也不算太難
          就是要花一點時間想一下而已
          過大概兩三個星期吧
          收到了郵件`,
        date: new Date("2018-03-03"),
        snapshotUrl:
          "@/assets/articles/trips/2018030128374/wechat-image_20180219173001.jpg"
      },
      {
        category: "摄影",
        subCategory: "三月游记",
        title: "雪梨留學打工記3 居然是團體面試？！",
        body: `說完漢堡王的蠢蠢打工小妹經驗
          現在跳到大三
          在學生會（University of Sydney Union）的三週短期打工
          是我漫長打工生涯中，流程走得最正式
          每小時工資也最高的工作

          中間跳過的補習班打工
          因為我現在有時候還會去幫忙
          所以會之後再說
          意思就是說我在申請這份工作的時候
          已經有兩年客戶服務（Customer Service）經驗了
          那份工作上面的要求是一年以上客戶服務經驗

          簡單來介紹一下工作本身
          是在每年初開學前為期一週的Orientation Week
          其實就是社團博覽會跟迎新啦
          這麼重要的活動
          學生會當然也不能錯過
          身為管理所有學生社團的頭頭
          學生會的攤位是所有攤位最大的
          當然，需要的人手也最多囉！
          附上幾張o-week學校的照片

          於是定期有在關注學生會職缺的我
          (那時候想賺錢想瘋了哈哈)
          一看到這個工資這麼高的肥缺就趕快去申請了($25.53一個小時)

          ＿＿＿正文＿＿＿

          申請的時候其實要填很多東西的
          比如你的服務業經驗
          你會怎麼做好這份工作
          還有一些其他的問題大概有五六題吧
          雖然一度想放棄
          但是最後還是認真的回答了全部
          其實就是結合你實際工作的情況回答
          也不算太難
          就是要花一點時間想一下而已
          過大概兩三個星期吧
          收到了郵件`,
        date: new Date("2018-03-04"),
        snapshotUrl:
          "@/assets/articles/trips/2018030128374/wechat-image_20180219173001.jpg"
      }
    ];
  }
};
</script>

<style lang="scss" scoped>
.article-card {
  background: #f8f8f8;
}
.card-title {
  font-size: 14px;
  font-weight: 600;
  display: flex;
  border-bottom: 1px solid rgb(223, 223, 223);
  box-sizing: border-box;
  height: 48px;
  span {
    display: flex;
    align-items: center;
  }
  .sub-card-title {
    font-size: 12px;
    font-weight: 500;
    color: rgb(182, 182, 182);
  }
}
.card-body {
  max-height: 228px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  .card-body-media {
    flex: 0 0 25%;
    height: 100%;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .card-body-context {
    .snapshot {
      text-overflow: ellipsis;
      overflow: hidden;
      text-align: left;
    }
    .read-more {
      font-weight: 600;
    }
    // white-space: nowrap;
    
  }
}
</style>

