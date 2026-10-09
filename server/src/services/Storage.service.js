const {ImageKit} = require("@imagekit/nodejs")

const client = new ImageKit({
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});


async function uploadFile(file, fileName) {
    console.log("Uploading file")
    const result = await client.files.upload({
        file: file,
        fileName,
        folder:"/Library-management"
    });
    console.log("file uploaded")
    return result
}

module.exports = { uploadFile }

