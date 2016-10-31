#!/bin/sh
pm2 start app.js --watch --name "api" && pm2 logs api --timestamp
