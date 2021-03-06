#!/bin/bash

echo "****Start Building SRS Portal Frontend****"
echo -n "Please enter the deployment environment [PMAX, TMAX, DEV] and press [ENTER]:"
read env
echo "The Environment selected is: $env"

#Constants
SERVER_USER="c_fpalou"
SERVER_OUTPUT="/tmp/"
ENVIRONMENT=$env
YARN_BUILD_ARGS=""

SERVER=""
WAR_NAME=""

#Envinroment discriminator
if [[ "$ENVIRONMENT" = "DEV" ]]; then
    SERVER="mercury"
    WAR_NAME="ROOT.war"
    ANIMATION_WAR="animations.war"
    YARN_BUILD_ARGS=" build:dev"
elif [[ "$ENVIRONMENT" = "TMAX" ]]; then
    SERVER="tmax1o1"
    WAR_NAME="schoolmax_tmax2.war"
    ANIMATION_WAR="schoolmax_tmax2-animations.war"
    YARN_BUILD_ARGS=" build:tmax"
elif [[ "$ENVIRONMENT" = "PMAX" ]]; then
    SERVER="pmax1o"
    WAR_NAME="registro.war"
    ANIMATION_WAR="registro-animations.war"
    YARN_BUILD_ARGS=" build"
fi


echo "Server = ${SERVER}"
echo "Output War = ${WAR_NAME}"
echo "Server Username = ${SERVER_USER}"

echo -n "Do you want to continue with the deployment please press [ENTER] ..."
read env

START_BUILD_DATE=date
echo "Yarn build Start At" `$START_BUILD_DATE '+%Y-%m-%d %H:%M:%S'`
yarn $YARN_BUILD_ARGS
END_BUILD_DATE=date
echo "Yarn build Start At" `$END_BUILD_DATE '+%Y-%m-%d %H:%M:%S'`
cp -r WEB-INF build/
cp -r META-INF build/
cd build/

pwd
echo "Generating war ${WAR_NAME}"
jar -cvf ../${WAR_NAME} .

cd ../
if [[ "$ENVIRONMENT" = "DEV" ]]; then
    echo -e "scp ${WAR_NAME} ${SERVER}:${SERVER_OUTPUT}"
    scp ${WAR_NAME} ${SERVER}:${SERVER_OUTPUT}
else
    echo -e "scp ${WAR_NAME} ${SERVER_USER}@${SERVER}:${SERVER_OUTPUT}"
    scp ${WAR_NAME} ${SERVER_USER}@${SERVER}:${SERVER_OUTPUT}
fi


echo -n "Do you want to create Animations WAR please press [ENTER] ..."
read env

cd animations/
echo "Generating war ${ANIMATION_WAR}"
jar -cvf ../${ANIMATION_WAR} .

cd ../
if [[ "$ENVIRONMENT" = "DEV" ]]; then
    echo -e "scp ${WAR_NAME} ${SERVER}:${SERVER_OUTPUT}"
    scp ${ANIMATION_WAR} ${SERVER}:${SERVER_OUTPUT}
else
    echo -e "scp ${WAR_NAME} ${SERVER_USER}@${SERVER}:${SERVER_OUTPUT}"
    scp ${ANIMATION_WAR} ${SERVER_USER}@${SERVER}:${SERVER_OUTPUT}
fi


echo "****End Building SRS Portal Frontend****"
