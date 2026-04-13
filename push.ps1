# 推送脚本 - 用于将代码推送到Git仓库并触发Cloudflare Pages部署

# 设置输出编码为UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
[System.Console]::InputEncoding = [System.Text.Encoding]::UTF8

Write-Host "=== 推送脚本开始 ==="

# 检查Git状态
Write-Host "检查Git状态..."
git status

# 添加所有文件
Write-Host "添加所有文件..."
git add .

# 提交代码
Write-Host "提交代码..."
git commit -m "更新项目代码"

# 推送代码
Write-Host "推送代码到远程仓库..."
git push origin main

Write-Host "=== 推送脚本完成 ==="
Write-Host "代码已推送，Cloudflare Pages会自动开始部署"
Write-Host "请登录Cloudflare Dashboard查看部署状态"