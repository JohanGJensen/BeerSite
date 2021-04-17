cd .. \
&& ls

# heroku login
docker login --username=${USERNAME} --password=${TOKENPWD} registry.heroku.com

docker tag ${EMAIL}/beersite_server registry.heroku.com/${SITECONTAINER}/web

docker push registry.heroku.com/${SITECONTAINER}/web

heroku container:release web -a ${SITECONTAINER}