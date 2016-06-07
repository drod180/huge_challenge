#!/usr/bin/env bash

rm public/js/app.js
cat prefix.js > public/js/app.js
cat src/*.js >> public/js/app.js
cat suffix.js >> public/js/app.js
