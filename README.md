# MiKun Vision 摄影工作室网站

## 📁 项目简介

MiKun Vision 是一个专业的摄影工作室网站，专为cosplay和二次元摄影服务设计。网站包含作品展示、套餐选择、团队成员介绍和预约功能，采用现代化的前端技术栈构建，具有响应式设计，适配各种设备。

## 🛠 技术栈

- **前端框架**: React + TypeScript
- **构建工具**: Vite
- **样式方案**: Tailwind CSS
- **后端服务**: Cloudflare Pages Functions
- **部署平台**: Cloudflare Pages
- **版本控制**: Git

## 📂 项目结构

```
webtext/
├── assets/             # 资源文件
│   ├── config/         # 配置文件 (JSON格式)
│   ├── images/         # 图片文件
│   └── 配置文件使用指南.md  # 配置文件使用说明
├── functions/          # Cloudflare Pages Functions
│   └── api/            # API接口
├── public/             # 静态资源
├── src/                # 源代码
│   ├── App.tsx         # 主应用组件
│   ├── index.css       # 全局样式
│   └── main.tsx        # 入口文件
├── build.bat           # 构建脚本
├── deploy.bat          # 部署脚本
├── start.bat           # 启动脚本
├── package.json        # 项目配置
├── tsconfig.json       # TypeScript配置
├── vite.config.ts      # Vite配置
├── README.md           # 项目说明
└── UPLOAD_GUIDE.md     # 部署指南
```

## 🚀 快速开始

### 环境搭建

1. **安装Node.js**
   - 下载并安装 Node.js 16.0+：https://nodejs.org/
   - 验证安装：`node --version`

2. **克隆项目**
   ```bash
   git clone https://github.com/Magicmyself/web.git
   cd web
   ```

3. **安装依赖**
   ```bash
   npm install
   ```

### 本地开发

1. **启动开发服务器**
   - 双击 `start.bat` 或运行：
   ```bash
   npm run dev
   ```

2. **访问网站**
   - 打开浏览器访问：`http://localhost:3000`

### 构建与部署

1. **构建项目**
   - 双击 `build.bat` 或运行：
   ```bash
   npm run build
   ```

2. **部署到Cloudflare Pages**
   - 双击 `deploy.bat` 或运行：
   ```bash
   git add .
   git commit -m "Update project files"
   git push origin main
   ```

## 📝 内容管理

### 修改配置文件

所有配置文件都位于 `assets/config/` 目录，使用 JSON 格式：

- **site-info.json**: 网站基本信息（标题、描述等）
- **members.json**: 团队成员信息（头像、联系方式、收款码）
- **works.json**: 作品展示信息
- **packages.json**: 套餐价格信息
- **posters.json**: 海报轮播信息
- **contact.json**: 联系信息
- **rules.json**: 预约须知
- **icons.json**: 网站图标
- **popular-ips.json**: 热门IP信息

### 更新图片

1. **添加新图片**
   - 将图片复制到 `assets/images/` 对应文件夹：
     - `assets/images/works/` - 作品图片
     - `assets/images/members/` - 成员头像
     - `assets/images/members/payment/` - 收款码图片

2. **同步图片**
   - 双击 `build.bat` 自动同步图片到 `public` 目录

### 团队成员管理

1. **添加新成员**
   - 编辑 `assets/config/members.json` 文件
   - 按照现有格式添加新成员信息
   - 上传成员头像到 `assets/images/members/`
   - 上传收款码到 `assets/images/members/payment/`

2. **收款码命名规则**
   - 微信：`[成员标识]_wechat.jpg`
   - 支付宝：`[成员标识]_alipay.jpg`
   - 成员标识对应关系：
     - Magicmyself → magic
     - Mikun → mikun
     - 筱黎 → xiaoli
     - 墨离凡尘 → moli
     - 面包 → bread

### 作品展示管理

1. **添加新作品**
   - 上传作品图片到 `assets/images/works/`
   - 编辑 `assets/config/works.json` 文件
   - 按照现有格式添加新作品信息

### 套餐信息管理

1. **修改套餐**
   - 编辑 `assets/config/packages.json` 文件
   - 修改套餐价格、描述和包含内容

## ☁️ 部署流程

### GitHub仓库设置

1. **创建GitHub仓库**
   - 登录GitHub，创建新仓库
   - 仓库名称：`web`
   - 选择公开或私有

2. **关联本地仓库**
   ```bash
   git remote add origin https://github.com/[你的用户名]/web.git
   git push -u origin main
   ```

### Cloudflare Pages部署

1. **登录Cloudflare**
   - 访问：https://dash.cloudflare.com/
   - 登录或注册Cloudflare账户

2. **创建Pages项目**
   - 点击左侧菜单中的 "Pages"
   - 点击 "Create a project"
   - 选择 "Connect to Git"
   - 选择你的GitHub仓库
   - 点击 "Begin setup"

3. **配置构建设置**
   - **Production branch**: main
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - 点击 "Save and Deploy"

4. **部署完成**
   - Cloudflare Pages会自动构建和部署你的网站
   - 部署完成后，你会获得一个 `*.pages.dev` 域名

### 自定义域名配置

1. **添加自定义域名**
   - 在Cloudflare Pages项目中，点击 "Custom domains"
   - 点击 "Add custom domain"
   - 输入你的域名，如 `mikunvision.site`
   - 点击 "Continue"

2. **配置DNS记录**
   - 按照Cloudflare的指示，在你的域名注册商处添加DNS记录
   - 通常需要添加一个CNAME记录，指向你的 `*.pages.dev` 域名

3. **验证域名**
   - 等待DNS记录生效（通常需要几分钟到几小时）
   - Cloudflare会自动验证域名配置

## 🔧 常见问题与解决方案

### 问题1：图片不显示
**解决方案**：
- 双击 `build.bat` 同步图片
- 检查图片路径是否正确
- 检查图片文件是否存在

### 问题2：服务器无法启动
**解决方案**：
- 关闭其他占用3000端口的程序
- 重新双击 `start.bat`
- 检查Node.js是否正确安装

### 问题3：构建失败
**解决方案**：
- 检查配置文件JSON格式是否正确
- 检查依赖是否安装完整
- 查看构建日志了解具体错误

### 问题4：收款码不显示
**解决方案**：
- 确保收款码图片已上传到 `assets/images/members/payment/`
- 确保收款码文件名符合命名规则
- 双击 `build.bat` 同步图片

### 问题5：Git推送失败
**解决方案**：
- 检查网络连接
- 检查GitHub仓库权限
- 确保本地分支与远程分支一致

## 📞 技术支持

如果遇到问题，请参考以下资源：

1. **配置文件使用指南.md** - 详细的配置文件使用说明
2. **UPLOAD_GUIDE.md** - 完整的部署和更新指南
3. **GitHub Issues** - 提交问题和bug报告

## 📄 许可证

本项目采用 MIT 许可证，详见 LICENSE 文件。

---

**感谢使用 MiKun Vision 摄影工作室网站！** 🎊

如有任何问题或建议，欢迎联系我们！