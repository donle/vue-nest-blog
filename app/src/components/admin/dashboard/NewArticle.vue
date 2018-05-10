<template>
  <v-layout row wrap id='new-thread'>
    <h3 class='title pb-4'>新的文章</h3>
    <v-card>
      <v-card-title>
        <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            name='title-input'
            label='标题'
            v-model='title'
          ></v-text-field>
        </v-flex>
        <v-flex xs12 class='quill-editor'>
          <vue-editor 
            v-model='content'
            :editorOptions='editorOption' 
            placeholder='在这里输入文章正文' 
            useCustomImageHandler 
            @imageAdded='handleImageAdded'
          ></vue-editor>
        </v-flex>
      </v-layout>
      </v-card-title>
      <v-card-actions>
        <v-layout class='pa-2'>
          <v-spacer></v-spacer>
          <v-flex class='text-xs-right'>
            <v-btn flat color='red accent-2' @click.native='preview_dialog = true'>预览</v-btn>
            <v-btn flat color='red accent-2' @click.native.stop='openSaveMenu()'>保存</v-btn>
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>
    <v-dialog
      v-model='preview_dialog'
      fullscreen
      hide-overlay
      transition='dialog-bottom-transition'
      scrollable
    >
    <v-card tile>
      <v-toolbar card dark color='red accent-2'>
        <v-btn icon @click.native='preview_dialog = false' dark>
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title class='preview-content'>
        <v-layout row wrap>
          <v-flex xs12><h3 class='headline mt-3 mb-3'>{{ title }}</h3></v-flex>
          <v-flex xs12><div class='ql-editor' v-html='content'></div></v-flex>
        </v-layout>
      </v-card-title>
    </v-card>
    </v-dialog>

    <v-dialog v-model='save_dialog' max-width='350'>
      <v-card>
        <v-card-text>
          <span v-if="article_category.length === 0">还有创建任何类别</span>
          <v-layout row wrap class="py-1 save-dialog" v-else v-for="(category, index) in article_category" :key="index">
            <div class="text-xs-left" style="align-items: center">
              <span>{{ category.name }}</span>
              <span class="total-num">共有{{ category.total }}条记录</span>
            </div>
            <v-spacer></v-spacer>
            <v-btn outline color="red accent-2" @click.native="saveArticle(category)">保存</v-btn>
          </v-layout>
        </v-card-text>
        <v-card-actions class="px-3">
        <v-btn color="red accent-2 white--text mb-2 mr-2 ml-0" style="width: 100%" @click.native.stop="create_new_dialog = true">新建新的类别</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model='create_new_dialog' max-width='350'>
      <v-card>
        <v-card-title>
          <h3 class="headline ma-0">新建类别</h3>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap class="py-1">
            <v-flex xs12>
              <v-text-field
                label="名称"
                v-model="new_category.name"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-radio-group v-model="new_category.private">
                <v-radio label="公开" :value="false"></v-radio>
                <v-radio label="私密" :value="true"></v-radio>
              </v-radio-group>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="pa-3">
          <v-layout row wrap class="ma-0">
            <v-flex xs6 class="px-1"><v-btn flat class="ma-0" @click.native="create_new_dialog = false" style="width: 100%">返回</v-btn></v-flex>
            <v-flex xs6 class="px-1"><v-btn class="ma-0" color="red accent-2 white--text" style="width: 100%" @click.native="createNewCategory()">新建</v-btn></v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { VueEditor, Quill } from "vue2-editor";

import { requestDOM } from '@/util/default.config';
import { DashboardService } from "../../../util/services/admin/dashboard.service";
// import { ImageDrop } from 'quill-image-drop-module';
// import ImageResize from 'quill-image-resize-module';

// Quill.register('modules/imageDrop', ImageDrop);
// Quill.register('modules/imageResize', ImageResize);

export default {
  name: "NewArticle",
  components: { VueEditor },
  data: () => ({
    httpService: new DashboardService(),
    preview_dialog: false,
    save_dialog: false,
    create_new_dialog: false,
    new_category: {
      name: "",
      private: false
    },
    article_category: [],
    content_images: [],
    content: "",
    title: "",

    editorOption: {
      modules: {
        // imageDrop: true,
        // imageResize: {},
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ direction: "rtl" }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ["clean"],
          ["link", "image", "video"]
        ]
      }
    }
  }),
  created() {},
  methods: {
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("image", file);
      this.httpService.uploadArticleImage(formData).then(result => {
          let url = result.url;
          Editor.insertEmbed(cursorLocation, "image", requestDOM + url);
          resetUploader();
          this.content_images.push(url);
        })
        .catch(err => {
          //@@todo
        });
    },
    openSaveMenu() {
      this.save_dialog = true;
      if (!!this.article_category.length) return;

      this.httpService.getArticleCategory({
        type: this.$route.query.type
      }).then(result => {
        this.article_category = result;
      })
      .catch(err => {
        //@@todo
      });
    },
    createNewCategory() {
      this.httpService.createNewCategory({
          type: this.$route.query.type,
          new_category: this.new_category.name,
          private: this.new_category.private
        })
        .then(() => {
          this.save_dialog = false;
        })
        .catch(e => {
          
        });
    },
    saveArticle(category) {
      this.httpService.saveNewArticle(this.title, this.content, this.content_images, this.$route.query.type, category)
      .then(res => {
        console.log(res);
        this.save_dialog = false;
        this.title = '';
        this.content_images = [];
        this.content = '';
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.quill-editor /deep/ .ql-toolbar {
  text-align: left;
}
.preview-content {
  justify-content: center;
  align-items: flex-start;
  .headline {
    font-weight: bold !important;
  }
  /deep/ {
    .card__toolbar {
      align-items: baseline;
      justify-content: center;
    }
    .layout {
      max-width: 960px;
      text-align: left;
    }
  }
}
.save-dialog {
  max-height: 500px;
  overflow: auto;
  span {
    display: block;
    &.total-num {
      font-size: 13px;
      color: #888;
    }
  }
}
</style>