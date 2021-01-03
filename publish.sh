#!/bin/sh

TIME=$(date "+%Y-%m-%d %Hh%M")

rm -Rf production/

gulp && \

git clone git@github.com:gabiolivalmeida/gabiolivalmeida.github.io.git production && \

cd production && \

rm -Rf * && \

cp -R ../build/* .  && \

git add . && \

git commit -m "version $TIME" && \

git push -f origin main

rm -Rf production/
