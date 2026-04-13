#!/bin/bash

# 推送脚本 - 用于将代码推送到Git仓库并触发Cloudflare Pages部署

echo "=== 推送脚本开始 ==="

# 检查Git状态
echo "检查Git状态..."
git status

# 添加所有文件
echo "添加所有文件..."
git add .

# 提交代码
echo "提交代码..."
git commit -m "更新项目代码"

# 推送代码
echo "推送代码到远程仓库..."
git push origin main:main

echo "=== 推送脚本完成 ==="
echo "代码已推送，Cloudflare Pages会自动开始部署"
echo "请登录Cloudflare Dashboard查看部署状态"