var express = require('express')
var router = express.Router()
const nodemailer = require('nodemailer')
var CryptoJS = require('crypto-js')

// 创建发送邮件的请求对象
let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com', // 发送端邮箱类型（QQ邮箱）
    port: 465,
    secure: true,
    auth:{
        user: '1053649721@qq.com',
        pass: 'ysrwwncqdjoybbac' // mtp验证码
    }
})


// 发送验证码
function send(mail, code) {
    let mailObj = {
        from: '"猪油糖杂货铺" <1053649721@qq.com>',   // 邮件名称和发件人邮箱地址
        to: mail,   //收件人邮箱地址（这里的mail是封装后方法的参数，代表收件人的邮箱地址）
        subject: '猪油糖杂货铺-邮箱验证码',   //邮件标题
        text: '【猪油糖杂货铺】您的验证码是'+ code +',在5分钟内有效。' // 邮件内容
    }
    // 发送邮件(封装成一个promise对象)，方便后面调用该方法
    return new Promise((resolve, reject)=>{
        transporter.sendMail(mailObj, (err, data) => {
            if(err){
                reject()    //出错
            }else{
                resolve()    //成功
            }
        })
    })
}

// 生成随机验证码
function codeGenerator(length) {
    let code = []
    for (let i = 0; i < length; i++) {
        code.push(Math.floor(Math.random()*10))
    }
    return code.join('')
}

router.post('/', function (req, res) {
    let validateCode = codeGenerator(6)
    let MD5_valCode = CryptoJS.MD5(validateCode).words.toString()
    let ret = send(req.body.email, validateCode)
    res.send(MD5_valCode)
})

module.exports = router


