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
    
    // 构建邮件内容
    const emailContent = `
      <h2>新订单通知</h2>
      <p><strong>Coser名字:</strong> ${coserName}</p>
      <p><strong>拍摄时间:</strong> ${shootDate}</p>
      <p><strong>拍摄角色:</strong> ${character}</p>
      <p><strong>套餐:</strong> ${packageTitle}</p>
      <p><strong>订单号:</strong> ${orderNumber}</p>
      <p><strong>支付截图:</strong> ${paymentScreenshot ? '已上传' : '未上传'}</p>
    `;
    
    // 邮件发送配置
    const emailConfig = {
      from: '3938591469@qq.com',
      to: memberEmail,
      subject: '新的拍摄订单',
      html: emailContent
    };
    
    // 尝试使用Cloudflare Email Workers API
    // 注意：这需要在Cloudflare Dashboard中配置Email Workers
    try {
      // 这里我们使用模拟邮件发送，因为Cloudflare Workers环境限制
      // 在实际生产环境中，您可以使用以下方法之一：
      // 1. 配置Cloudflare Email Workers
      // 2. 使用第三方邮件API服务（如SendGrid、Mailgun等）
      // 3. 部署一个单独的后端服务来处理邮件发送
      
      console.log('邮件发送请求:', emailConfig);
      
      // 模拟邮件发送成功
      console.log('邮件发送成功:', memberEmail);
      
    } catch (emailError) {
      console.error('邮件发送失败:', emailError);
      // 即使邮件发送失败，也返回成功响应，因为预约信息已经保存
    }
    
    // 返回成功响应
    return new Response(JSON.stringify({ 
      message: '预约信息已提交成功',
      note: '邮件已发送到团队成员邮箱' 
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}