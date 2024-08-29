#!/bin/sh
docker container create -i -t --name mycontainer alpine
docker container start mycontainer
docker exec -it mycontainer sh -c "pwd"