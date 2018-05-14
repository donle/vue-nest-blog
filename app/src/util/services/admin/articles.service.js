import Vue from 'vue';
import { requestDOM } from '@/util/default.config';

export class ArticlesService {
  constructor() { }

  getArticleCategory(query) {
    return Vue.axios({
      url: requestDOM + "api/articles/category/list",
      method: "GET",
      params: query
    }).then(res => res.data);
  }

  createNewCategory(data) {
    return Vue.axios({
      url: requestDOM + "api/articles/category/new",
      method: "POST",
      data
    }).then(res => res.data);
  }

  uploadArticleImage(data) {
    return Vue.axios({
      url: requestDOM + "api/media/image/article/upload",
      method: "POST",
      data
    }).then(res => res.data);
  }

  saveNewArticle (title, html, imgs, category, subCategory) {
    return Vue.axios({
      url: requestDOM + "api/articles/create",
      method: "POST",
      data: { html, imgs, title, category, subCategory: subCategory.name, private: subCategory.private }
    }).then(res => res.data);
  }

  getArticleList(type) {
    return Vue.axios({
      url: requestDOM + "api/articles/list",
      method: "GET",
      params: { type }
    }).then(res => res.data);
  }

  deleteArticleById(id) {
    return Vue.axios({
      url: requestDOM + "api/articles/remove",
      method: "POST",
      data: { articleId: id }
    }).then(res => res.data);
  }

  getArticleById(id) {
    return Vue.axios({
      url: requestDOM + "api/articles/byid",
      method: "GET",
      params: { articleId: id }
    }).then(res => res.data);
  }

  updateArticleById(article_subject) {
    return Vue.axios({
      url: requestDOM + "api/articles/update",
      method: "POST",
      data: article_subject
    }).then(res => res.data);
  } 
}