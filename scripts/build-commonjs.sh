#!/bin/bash -e

npx tsc --module commonjs --target es5 --outDir dist/commonjs

SED_OPTIONS=
    if [[ "$OSTYPE" == "darwin" ]]; then
        SED_OPTIONS="-E -i ''"
    else
        SED_OPTIONS="-E -i"
    fi

for f in dist/commonjs/*.js; do
    sed $SED_OPTIONS 's/require\("(\.\/.*)"\)/require\("\1\.cjs"\)/g' $f
    mv "$f" "${f%.js}.cjs"
done
