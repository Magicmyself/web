# 图片和配置上传指南

## 一、项目结构

```
/
├── src/              # 前端代码
├── public/           # 静态资源
├── functions/        # Cloudflare Pages Functions目录
│   └── api/          # API路由目录
│       └── send-email.js  # 邮件发送接口
├── assets/           # 配置文件和图片资源
│   ├── config/       # 配置文件目录
│   │   ├── members.json     # 团队成员配置
│   │   ├── packages.json    # 套餐配置
│   │   ├── works.json       # 作品配置
│   │   └── ...
│   └── images/       # 图片目录
│       ├── members/  # 团队成员图片
│       │   ├── member1.jpg   # 成员头像
│       │   ├── member2.jpg   # 成员头像
│       │   └── payment/      # 收款码图片
│       │       ├── magic_wechat.jpg   # Magicmyself微信收款码
│       │       ├── magic_alipay.jpg   # Magicmyself支付宝收款码
│       │       ├── mikun_wechat.jpg   # Mikun微信收款码
│       │       ├── mikun_alipay.jpg   # Mikun支付宝收款码
│       │       └── ...
│       └── works/    # 作品图片
├── package.json      # 项目配置
├── vite.config.ts    # Vite配置
├── tsconfig.json     # TypeScript配置
├── index.html        # 入口HTML
└── push.ps1          # 推送脚本
```

## 二、如何更新团队成员信息

### 1. 修改成员配置文件
- **文件路径**：`assets/config/members.json`
- **配置格式**：
  ```json
  [
    {
      "id": 1,
      "name": "Magicmyself",
      "role": "神",
      "avatarUrl": "assets/images/members/member1.jpg",
      "description": "Magic就完了",
      "email": "magic@example.com",
      "payment": {
        "wechat": "assets/images/members/payment/magic_wechat.jpg",
        "alipay": "assets/images/members/payment/magic_alipay.jpg"
      }
    }
  ]
  ```

### 2. 上传成员图片
1. **头像图片**：上传到 `assets/images/members/` 目录
   - 命名格式：`member1.jpg`, `member2.jpg`, 依此类推
   - 建议尺寸：200x200像素

2. **收款码图片**：上传到 `assets/images/members/payment/` 目录
   - 命名格式：`{成员名}_wechat.jpg` 和 `{成员名}_alipay.jpg`
   - 例如：`magic_wechat.jpg`（Magicmyself的微信收款码）
   - 建议尺寸：300x300像素

## 三、如何更新作品展示

### 1. 修改作品配置文件
- **文件路径**：`assets/config/works.json`
- **配置格式**：
  ```json
  [
    {
      "id": 1,
      "title": "原神 - 刻晴",
      "category": "原神",
      "imageUrl": "assets/images/works/1.jpg",
      "description": "刻晴cosplay拍摄"
    }
  ]
  ```

### 2. 上传作品图片
- **目录**：`assets/images/works/`
- **命名格式**：`1.jpg`, `2.jpg`, 依此类推
- **建议尺寸**：1200x800像素
- **支持格式**：jpg, jpeg, png

## 四、如何更新套餐信息

### 1. 修改套餐配置文件
- **文件路径**：`assets/config/packages.json`
- **配置格式**：
  ```json
  [
    {
      "id": "single",
      "title": "单人棚景",
      "price": 199,
      "features": [
        "3小时拍摄时长",
        "精修9张/特效1张",
        "底片全送(简调色)",
        "限单套服装",
        "不含妆造"
      ]
    }
  ]
  ```

## 五、如何更新网站信息

### 1. 修改网站信息配置文件
- **文件路径**：`assets/config/site-info.json`
- **配置格式**：
  ```json
  {
    "title": "MiKun Vision摄影工作室",
    "description": "专业二次元摄影服务",
    "keywords": "二次元摄影, cosplay摄影, 武汉摄影",
    "logo": "MiKun Vision"
  }
  ```

## 六、如何更新联系信息

### 1. 修改联系信息配置文件
- **文件路径**：`assets/config/contact.json`
- **配置格式**：
  ```json
  {
    "phone": "131-4710-5647",
    "email": "3938591469@qq.com",
    "address": "武汉市洪山区",
    "wechat": "your-wechat-id",
    "instagram": "your-instagram-id"
  }
  ```

## 七、如何部署更新

### 1. 本地更新步骤
1. 修改配置文件或上传图片
2. 运行推送脚本：`.ush.ps1`
3. 等待Cloudflare Pages自动部署

### 2. 验证部署
- 登录Cloudflare Dashboard
- 进入「Workers & Pages」→ 选择您的项目
- 查看「Deployments」标签页，确认部署状态
- 访问网站验证更新是否生效

## 八、注意事项

### 1. 图片优化
- 上传前压缩图片，确保加载速度
- 建议使用JPEG格式，质量70-80%
- 避免上传过大的图片（建议单张不超过2MB）

### 2. 配置文件格式
- 确保JSON格式正确，使用在线JSON验证工具检查
- 保持配置文件的结构一致
- 不要删除必要的字段

### 3. 安全注意事项
- 不要在配置文件中存储敏感信息
- 收款码图片建议设置为适当的大小，避免被滥用

### 4. 故障排查
- 如果更新后网站显示异常，检查配置文件格式
- 如果图片不显示，检查图片路径和文件名是否正确
- 如果部署失败，查看Cloudflare Pages的构建日志

## 九、常见问题

### 1. 成员收款码不显示
- **原因**：图片路径错误或文件不存在
- **解决**：检查 `members.json` 中的路径配置，确保收款码图片已上传到正确位置

### 2. 部署后网站无变化
- **原因**：缓存问题或部署失败
- **解决**：清除浏览器缓存，或检查Cloudflare Pages的部署状态

### 3. 图片加载缓慢
- **原因**：图片过大或未优化
- **解决**：压缩图片，使用适当的尺寸

现在您可以轻松管理和更新您的拍摄预约系统了！