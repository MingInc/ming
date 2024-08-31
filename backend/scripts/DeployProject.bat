@echo off
set CONTAINER_NAME=my_container # this should be dynamic
set IMAGE_NAME=my_image # this should be dynamic
set GIT_URL=https://github.com/user/repo.git # this should be dynamic

docker build -t %IMAGE_NAME% .
docker run --name %CONTAINER_NAME% %IMAGE_NAME%
docker exec %CONTAINER_NAME% git clone %GIT_URL%