# 部署指南 - QQ邮箱SMTP版

## 项目结构

```
/
├── src/              # 前端代码
├── public/           # 静态资源
├── functions/        # Cloudflare Pages Functions目录
│   └── api/          # API路由目录
│       └── send-email.js  # 邮件发送接口（使用QQ邮箱SMTP）
├── assets/           # 配置文件和图片资源
├── package.json
├── vite.config.ts
├── tsconfig.json
└── index.html
```

## 部署步骤

### 1. 准备Git仓库
- **创建Git仓库**（如果还没有）：
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  ```
- **推送到远程仓库**（GitHub、GitLab等）：
  ```bash
  git remote add origin https://github.com/your-username/your-repo.git
  git push -u origin main
  ```

### 2. 部署到Cloudflare Pages

1. **登录Cloudflare Dashboard**
   - 访问 https://dash.cloudflare.com/
   - 登录您的账号

2. **创建Pages项目**
   - 点击左侧菜单的「Workers & Pages」
   - 点击「Create application」
   - 选择「Pages」

3. **连接Git仓库**
   - 点击「Connect to Git」
   - 选择您的Git托管服务（GitHub、GitLab等）
   - 授权Cloudflare访问您的仓库
   - 选择您的项目仓库

4. **配置构建设置**
   - **Project name**：输入项目名称（如：cosplay-photography）
   - **Production branch**：选择 `main` 或您的主分支
   - **Framework preset**：选择 `Vite`
   - **Build command**：`npm run build`
   - **Build output directory**：`dist`

5. **开始部署**
   - 点击「Save and Deploy」
   - 等待部署完成（通常需要1-2分钟）

6. **获取部署域名**
   - 部署完成后，您会获得一个Cloudflare Pages域名（如：`your-project.pages.dev`）

### 3. 测试部署

1. **访问网站**
   - 打开您的Cloudflare Pages域名（如：`your-project.pages.dev`）

2. **测试完整流程**
   - 选择套餐 → 填写登记信息 → 选择团队成员 → 上传支付凭证 → 提交
   - 检查团队成员邮箱是否收到通知邮件

## 技术说明

### 1. 邮件服务
- **使用QQ邮箱SMTP**：无需第三方服务，直接使用您的QQ邮箱
- **发送限制**：QQ邮箱每天最多发送50封邮件
- **授权码**：已配置为 `yvulntimuwefcdhh`
- **邮箱地址**：已配置为 `3938591469@qq.com`

### 2. 后端API
- **API地址**：`https://your-project.pages.dev/api/send-email`
- **前端调用**：使用相对路径 `/api/send-email`
- **功能**：接收预约信息，发送邮件通知

### 3. 优势
- **无需第三方服务**：直接使用QQ邮箱，无需注册其他服务
- **完全免费**：QQ邮箱SMTP服务免费使用
- **配置简单**：已在代码中配置好所有参数
- **全球访问**：部署到Cloudflare Pages，用户可以通过公网访问

## 注意事项

1. **QQ邮箱限制**：每天最多发送50封邮件，如果需要更多，建议准备多个QQ邮箱账号
2. **邮件内容**：确保邮件内容合规，避免被标记为垃圾邮件
3. **附件大小**：QQ邮箱附件大小限制为20MB，确保支付截图不超过此限制
4. **部署更新**：代码推送到Git后，Cloudflare会自动重新构建和部署

## 故障排除

### 1. 邮件发送失败
- **检查QQ邮箱SMTP服务**：确保已开启SMTP服务
- **检查授权码**：确保授权码正确且未过期
- **查看Cloudflare日志**：在Cloudflare Pages项目的「Functions」→「Logs」中查看错误信息

### 2. 前端页面加载失败
- **检查构建日志**：在Cloudflare Pages项目的「Deployments」中查看构建过程
- **检查Git仓库**：确保所有文件都已提交到Git
- **检查依赖**：确保package.json中的依赖正确

### 3. API调用失败
- **检查前端代码**：确认API调用地址使用的是相对路径 `/api/send-email`
- **检查Functions代码**：确保send-email.js文件存在且语法正确
- **查看Functions日志**：在Cloudflare Pages项目的「Functions」→「Logs」中查看错误信息

## 总结

通过Cloudflare Pages和Pages Functions，您可以：

1. **完全免费**：无需购买服务器
2. **全球加速**：Cloudflare边缘节点提供快速响应
3. **同域名部署**：无跨域问题
4. **自动部署**：代码推送后自动构建和部署
5. **使用QQ邮箱**：无需第三方服务，直接使用您的QQ邮箱发送邮件

现在您的拍摄预约系统已经完全准备就绪，用户可以通过公网访问并使用所有功能！