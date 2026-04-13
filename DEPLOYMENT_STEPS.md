# 完整部署指南

## 一、准备工作

### 1. 安装必要工具
- **Git**：下载并安装Git（https://git-scm.com/downloads）
- **Node.js**：下载并安装Node.js（https://nodejs.org/）

### 2. 项目结构
确保您的项目目录结构如下：

```
/
├── src/              # 前端代码
├── public/           # 静态资源
├── functions/        # Cloudflare Pages Functions目录
│   └── api/          # API路由目录
│       └── send-email.js  # 邮件发送接口
├── assets/           # 配置文件和图片资源
├── package.json      # 项目配置
├── vite.config.ts    # Vite配置
├── tsconfig.json     # TypeScript配置
├── index.html        # 入口HTML
└── push.sh           # 推送脚本
```

## 二、创建Git仓库

### 1. 初始化Git仓库
```bash
# 进入项目目录
cd e:\webtext

# 初始化Git仓库
git init

# 创建.gitignore文件
echo "node_modules/\ndist/\n.env" > .gitignore
```

### 2. 创建远程仓库
1. 登录GitHub（https://github.com/）
2. 点击右上角的「+」图标，选择「New repository」
3. 填写仓库名称（如：cosplay-photography）
4. 选择「Public」或「Private」
5. 点击「Create repository」
6. 复制仓库的HTTPS URL（如：https://github.com/your-username/cosplay-photography.git）

### 3. 关联远程仓库
```bash
# 添加远程仓库
git remote add origin https://github.com/your-username/cosplay-photography.git

# 首次推送
git add .
git commit -m "Initial commit"
git push -u origin master:main
```

## 三、部署到Cloudflare Pages

### 1. 登录Cloudflare
- 访问 https://dash.cloudflare.com/
- 登录您的Cloudflare账号

### 2. 创建Pages项目
1. 点击左侧菜单的「Workers & Pages」
2. 点击「Create application」
3. 选择「Pages」

### 3. 连接Git仓库
1. 点击「Connect to Git」
2. 选择「GitHub」（或其他Git托管服务）
3. 授权Cloudflare访问您的仓库
4. 选择您刚创建的仓库（如：cosplay-photography）
5. 点击「Begin setup」

### 4. 配置构建参数
- **Project name**：输入项目名称（如：cosplay-photography）
- **Production branch**：选择 `main`
- **Framework preset**：选择 `None`（或根据您的项目选择合适的框架）
- **Build command**：`npm run build`
- **Build output directory**：`dist`
- **Environment variables**：无需添加

### 5. 开始部署
- 点击「Save and Deploy」
- 等待部署完成（通常需要1-2分钟）
- 部署完成后，您会获得一个Cloudflare Pages域名（如：`your-project.pages.dev`）

## 四、使用推送脚本

### 1. 赋予脚本执行权限（Linux/Mac）
```bash
chmod +x push.sh
```

### 2. 运行推送脚本
```bash
# Windows（使用Git Bash或WSL）
./push.sh

# 或直接在PowerShell中运行git命令
git add .
git commit -m "更新项目代码"
git push origin main:main
```

## 五、测试部署

### 1. 访问网站
- 打开您的Cloudflare Pages域名（如：`your-project.pages.dev`）

### 2. 测试完整流程
1. **选择套餐**：点击价格表中的套餐
2. **填写登记信息**：输入Coser名字、拍摄时间、拍摄角色
3. **选择团队成员**：右划选择团队成员
4. **上传支付凭证**：上传支付截图或输入订单号
5. **提交**：点击「提交支付凭证」按钮
6. **验证**：查看提交成功提示

### 3. 检查部署状态
- 登录Cloudflare Dashboard
- 进入「Workers & Pages」→ 选择您的项目
- 查看「Deployments」标签页，确认部署状态

## 六、常见问题

### 1. Git推送失败
- **问题**：`error: src refspec main does not match any`
- **解决**：确保本地分支是master，使用 `git push origin master:main`

### 2. 构建失败
- **问题**：构建过程中出现错误
- **解决**：检查项目依赖是否正确，确保 `npm run build` 能在本地成功执行

### 3. API调用失败
- **问题**：提交支付凭证时API调用失败
- **解决**：检查浏览器控制台的错误信息，确保Functions代码正确

### 4. 邮件发送功能
- **说明**：当前版本会记录预约信息到日志中，不会实际发送邮件
- **生产环境**：在生产环境中，您可以配置Cloudflare Email Workers或其他兼容的邮件服务

## 七、后续维护

### 1. 更新代码
1. 修改代码后，运行推送脚本
2. Cloudflare Pages会自动重新构建和部署

### 2. 监控系统
- **访问统计**：在Cloudflare Pages项目的「Analytics」中查看网站访问情况
- **Functions日志**：在「Functions」→「Logs」中查看API调用日志

### 3. 扩展功能
- **添加新API**：在`functions/api`目录中添加新的函数文件
- **修改现有功能**：更新前端代码和Functions代码

## 八、技术支持

如果您在部署过程中遇到问题，可以：
1. 查看Cloudflare Pages文档：https://developers.cloudflare.com/pages/
2. 检查项目代码是否符合Cloudflare Workers要求
3. 确保所有依赖都已正确安装

## 九、总结

通过Cloudflare Pages，您可以：
- **完全免费**：无需购买服务器
- **全球加速**：Cloudflare边缘节点提供快速响应
- **自动部署**：代码推送后自动构建和部署
- **无服务器架构**：无需管理服务器
- **安全可靠**：Cloudflare提供安全保障

现在您的拍摄预约系统已经完全准备就绪，可以为用户提供专业的预约服务了！