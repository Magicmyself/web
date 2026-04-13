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
    
    // 使用Cloudflare Email Workers API（如果可用）
    // 或者使用其他兼容的邮件服务
    
    // 由于Cloudflare Workers环境限制，我们使用模拟邮件发送
    // 在实际生产环境中，建议使用Cloudflare Email Workers或其他兼容的邮件服务
    
    console.log('邮件发送请求:', {
      to: memberEmail,
      subject: '新的拍摄订单',
      content: emailContent,
      hasAttachment: !!paymentScreenshot
    });
    
    // 返回成功响应
    return new Response(JSON.stringify({ 
      message: '预约信息已提交成功',
      note: '由于环境限制，邮件发送功能需要在生产环境中配置' 
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