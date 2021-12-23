#!/bin/bash

cd db/src
npm run build
cd ../../

cd process-centric/src
npm run build
cd ../../

cd business-logic/src
npm run build
cd ../../

echo "Build done!"

sudo docker-compose up --build