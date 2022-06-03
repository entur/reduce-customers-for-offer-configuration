#!/bin/bash -e

npx tsc --outDir dist/esm

SED_OPTIONS=
    if [[ "$OSTYPE" == "darwin" ]]; then
        SED_OPTIONS="-E -i ''"
    else
        SED_OPTIONS="-E -i"
    fi

for f in dist/esm/*.js; do
    sed $SED_OPTIONS "s/(import.*from.*)';/\1\.js';/g" $f
done
