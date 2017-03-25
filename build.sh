#!/bin/sh
npm run build || exit 1
npm run lint || exit 1
