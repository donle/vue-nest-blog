<template>
  <div class="aboutme-card elevation-1 mt-3">
    <h3 class="card-title ma-0 px-3">关于我</h3>
    <v-layout class="card-body pa-3" row wrap>
      <v-flex xs12 class="snapshot pb-3">
        <img :src="snapshotUrl" />
      </v-flex>
      <v-flex xs6 class="personal-info">
        <span class="mt-2 mb-2" v-for="(attr, index) of personalInfo" :key="index"> {{attr.property + '：' + attr.value }}</span>
      </v-flex>
      <v-flex xs6 class="personal-intro"> {{ corpIntro(personalIntroduction) }}
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "AboutMe",
  data() {
    return {
      snapshotUrl: "",
      personalInfo: [
        {
          property: "坐标",
          value: "澳洲悉尼"
        },
        {
          property: "爱好",
          value: "写歌拍照旅行"
        },
        {
          property: "星座",
          value: "天蝎座"
        }
      ],
      personalIntroduction: `愛好攝影、音樂、閱讀，和紀錄故事。來澳洲第8年，旅行足跡涵蓋澳洲各大城市和一些東亞國家。雖然是雪梨大學資工系畢業，但是目前正在自學數位行銷和平面設計。超愛吃，很會吃，而且吃不胖。唯一不喜歡的食物是巧克力。`
    };
  },
  created() {
    this.snapshotUrl = require("@/assets/articles/aboutme/dsc_00951.jpg");
  },
  methods: {
    corpIntro: function(text) {
      return text.substring(0, 60) + "...";
    }
  }
};
</script>

<style lang="scss" scoped>
.aboutme-card {
  background: #fff;
}
.card-title {
  border-bottom: 1px solid rgb(223, 223, 223);
  height: 48px;
  align-items: center;
  justify-content: center;
  display: flex;
}
.card-body {
  .snapshot {
    img {
      max-width: 100%;
    }
  }
  .personal-info {
    span {
      display: block;
      font-size: 14px;
      text-align: left;
    }
  }
  .personal-intro {
    font-size: 14px;
    text-align: left;
  }
}
</style>

