#!/bin/bash -e

npx tsc --module commonjs --target es5 --outDir dist/commonjs

for f in dist/commonjs/*.js; do
    sed -E -i '' 's/require\("(\.\/.*)"\)/require\("\1\.cjs"\)/g' $f
    mv "$f" "${f%.js}.cjs"
done
