const fs = require('fs');
const path = require('path');

module.exports = class ImageManager {
    static saveImg(imgBase64, imgName) {
        const imageFolderUrl = (path.join(process.cwd(), "src", "public", "images", imgName));
        if (!imgBase64 || !imgName) {
            return;
        }
        const dataimg = imgBase64.replace(/^data:image\/jpeg;base64,/, "");
        fs.writeFileSync(imageFolderUrl, dataimg, "base64");
    }
}