const newsStore = require("../../infrastructure/store/news.store");
const newsImagesStore = require("../../infrastructure/store/news-images.store");

module.exports = class NewsService {
  static async addNews(data) {
    const model = {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
    };
    const news = await newsStore.addNews(model);
    await newsImagesStore.addImages(news.id, data.images);
    return news;
  }

  static getAllNews(config) {
    return newsStore.getAllNews(config);
  }

  static getNews(id) {
    return newsStore.getNews(id);
  }

  static deleteNews(id) {
    return newsStore.deleteNews(id);
  }

  static async updateNews(id, data) {
    const model = {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
    };
    await newsImagesStore.updateImagesByNews(id, data.images);
    return newsStore.updateNews(id, model);
  }
};
