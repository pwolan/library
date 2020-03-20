set message=%1
git add .
git commit -m %message%
git push origin master
git push heroku master
echo "deployed on heroku!"
echo %message%
