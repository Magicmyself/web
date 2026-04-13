@echo off
echo === Deployment Script Started ===
echo Checking Git status...
git status
echo Adding all files...
git add .
echo Committing changes...
git commit -m "Update project files"
echo Pushing to remote repository...
git push origin main
echo === Deployment Script Completed ===
echo Code has been pushed. Cloudflare Pages will automatically deploy.
echo Please check Cloudflare Dashboard for deployment status.
pause