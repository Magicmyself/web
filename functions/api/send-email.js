export async function onRequestPost(context) {
  try {
    // 解析表单数据
    const formData = await context.request.formData();
    const coserName = formData.get('coserName');
    const shootDate = formData.get('shootDate');
    const character = formData.get('character');
    const packageTitle = formData.get('packageTitle');
    const memberEmail = formData.get('memberEmail');
    const orderNumber = formData.get('orderNumber');
    
    // 处理文件上传（如果有）
    const paymentScreenshot = formData.get('paymentScreenshot');
    let attachment = null;
    if (paymentScreenshot && paymentScreenshot.size > 0) {
      const bytes = await paymentScreenshot.arrayBuffer();
      const buffer = Buffer.from(bytes);
      attachment = {
        content: buffer.toString('base64'),
        filename: paymentScreenshot.name,
        type: paymentScreenshot.type,
        disposition: 'attachment'
      };
    }
    
    // 使用QQ邮箱SMTP发送邮件
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransporter({
      host: 'smtp.qq.com',
      port: 465,
      secure: true,
      auth: {
        user: '3938591469@qq.com',
        pass: 'yvulntimuwefcdhh'
      }
    });
    
    const mailOptions = {
      from: '3938591469@qq.com',
      to: memberEmail,
      subject: '新的拍摄订单',
      html: `
        <h2>新订单通知</h2>
        <p><strong>Coser名字:</strong> ${coserName}</p>
        <p><strong>拍摄时间:</strong> ${shootDate}</p>
        <p><strong>拍摄角色:</strong> ${character}</p>
        <p><strong>套餐:</strong> ${packageTitle}</p>
        <p><strong>订单号:</strong> ${orderNumber}</p>
        <p><strong>支付截图:</strong> ${attachment ? '见附件' : '未上传'}</p>
      `,
      attachments: attachment ? [{
        filename: attachment.filename,
        content: Buffer.from(attachment.content, 'base64'),
        contentType: attachment.type
      }] : []
    };
    
    const info = await transporter.sendMail(mailOptions);
    
    return new Response(JSON.stringify({ message: '邮件发送成功' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}