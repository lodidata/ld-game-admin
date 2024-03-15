'use strict'
const nodemailer = require('nodemailer')
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
module.exports = {
  sendmail: function(htmlCon, argList) {
    nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      console.log(argList)
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'web@funtsui.com', // generated ethereal user
          pass: 'webadmin123' // generated ethereal password
        }
      })
      // setup email data with unicode symbols

      const build = 'npm run build --client=${client} --cdn=${cdn} (--pre=${pre})'
      console.log('------开始发邮件------')
      const mailOptions = {
        from: '来自火星的邮件<web@funtsui.com>', // sender address
        to: 'huangjie@funtsui.com', // list of receivers
        cc: ['hongyuanqi@funtsui.com', 'linsimin@funtsui.com', 'yini@funtsui.com'],
        // to: 'yini@funtsui.com',
        subject: 'H5发包失败提醒', // Subject line
        date: new Date().toLocaleString(),
        text:
          '正确的打包姿势，npm run build --client=${client} --cdn=${cdn} (--pre=${pre})。您的发包失败了！！！ ', // plain text body
        html: `<p>正确的打包姿势，${build}</p><br><font style="color:red;font-size:30px;">${htmlCon}</font><br><p>输入的打包命令为:${argList}</p>` // html body
      }

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          // transporter.sendMail(mailOptions, (error, info) => {})
          return console.log('------发送失败---------')
        }
        console.log('Message sent: %s', info.messageId)
        // Preview only available when sending through an Ethereal account
        console.log('----------发送成功------------')
        // transporter.close(); // 如果没用，关闭连接池
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      })
    })
  }
}
