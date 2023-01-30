const db = require("../../core/models/index").db;
const dbLogger = require("../../utils/loggers/db.logger");
const dbOperation = require("../../core/enums/db-operations.enum");
const fs = require("fs");

const imageFolderUrl = "src/public/images/";
const base64RegExp = /^data:image\/[a-z]+;base64,/;

module.exports = class NewsImagesStore {
  static async addImages(newsId, images) {
    try {
      const fileNames = [];
      images.forEach((image, index) => {
        fileNames.push(`${newsId}_${Date.now()}_${index}.jpg`);
        const data = image.replace(base64RegExp, "");
        fs.writeFileSync(imageFolderUrl + fileNames[index], data, "base64");
      });

      await db.NewsImages.bulkCreate(fileNames.map(fileName => ({
        url: fileName,
        newsId
      })));
    } catch (err) {
      dbLogger.warn(err.message, dbOperation.BULK_CREATE);
    }
  }

  static async updateImagesByNews(newsId, images) {
    try {
      const base64Images = [], simplePaths = [];
      images.forEach((image) => {
        base64RegExp.test(image) ?
          base64Images.push(image) : simplePaths.push(image);
      });

      (await db.NewsImages.findAll({ where: { newsId } }))
        .forEach(async (image) => {
          !simplePaths.some(v => v === image.url) && await image.destroy();
        });

      base64Images && await this.addImages(newsId, base64Images);
    } catch (err) {
      dbLogger.warn(err.message, dbOperation.BULK_CREATE);
    }
  }

  static async deleteImagesByNews(newsId) {
    try {
      const images = await db.NewsImages.findAll({ where: { newsId } });
      dbLogger.info(images, dbOperation.REMOVE);
      images.forEach(async (image) => {
        fs.unlinkSync(imageFolderUrl + image.url);
        await image.destroy();
      });
    } catch (err) {
      dbLogger.warn(err.message, dbOperation.REMOVE);
    }
  }
};
