// var bodyParser = require('body-parser');
// var STS = require('qcloud-cos-sts');
var express = require('express');
var router = express.Router()
// var tencentcloud = require('tencentcloud-sdk-nodejs')
var COS = require('cos-nodejs-sdk-v5')
var fs = require('fs')
var formidable = require('formidable')
var uuid = require('uuid')
var path = require('path')



// 使用永久密钥初始化
var cos = new COS({
    // AppId: '1258652529',
    SecretId: 'AKIDHRM3XmzZFwSjjUmEEeqqa4LNAi04jZ1P',
    SecretKey: 'QbcNvFLCwTnsiJejYKrCG6i6GBzXpreB'
})

// 1.创建表单
let form = new formidable.IncomingForm()
// 2.设置编码格式
form.encoding = 'utf-8'
// 3.设置文件存储路径
form.uploadDir = 'public/tempImage'
// 4.保留后缀
form.keepExtensions = true
// 5. 设置单文件限制大小 2m
// form.maxFieldsSize = 2 * 1024 * 1024

// let imgObject = []

// cos内置上传方法
// function cosPutObject(picName) {

// }

// 修改文件名称，并长传图片到腾讯COS，返回图片获取地址
// async function renameFile(res, file, picName) {

// }

router.post('/', (req, res) => {
    // console.log(form)
    // // 存放图片返回地址
    let picAddrList = []
    form.parse(req, async (err, fields, files) => {
        // console.log(files)
        // // 单图片
        // let file = files.image
        // let picName = uuid.v1() + path.extname(file.name)
        // fs.rename(file.path, 'public\\images\\' + picName, (err) => {
        //     if (err) {
        //         console.log(err)
        //         return res.send({
        //             "error": 403,
        //             "msg": "图片保存异常！"
        //         })
        //     }
        //     res.send({
        //         "picAddr": picName
        //     })
        // })
        // 上传到腾讯云COS，并返回图片获取地址
        for (let _img in files) {
            let file = files[_img]
            // console.log(file)
            let picName = uuid.v1() + path.extname(file.name)
            fs.rename(file.path, 'public\\tempImage\\' + picName, (err) => {
                if (err) {
                    console.log(err)
                    return res.send({
                        "error": 403,
                        "msg": "图片保存异常！"
                    })
                } else {
                    // 上传对象
                    cos.putObject({
                        Bucket: 'lardcandy-1258652529',
                        Region: 'ap-guangzhou',
                        Key: picName,
                        /* 必须 */
                        StorageClass: 'STANDARD',
                        Body: fs.createReadStream(`../myapp/public/tempImage/${picName}`),
                        // onProgress: (progressData) => {
                        //     console.log(JSON.stringify(progressData));
                        // }
                    }, (err, data) => {
                        if (err) console.log(err)
                        if (data) {
                            picAddrList.push([picName, data.Location])

                            if (picAddrList.length == Object.keys(files).length) {
                                res.send(picAddrList)
                            }
                        }
                    });
                }
            })
            // picAddrList.push(picName)
        }
        // console.log(picAddrList)
        // res.send(picAddrList)
        // res.send('ok')
    })
})

module.exports = router