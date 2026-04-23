echo "Deploying to PRODUCTION..."
# Copy build to IIS server
xcopy build\ C:\inetpub\wwwroot\app\ /E /Y
iisreset