#!/bin/bash -e

npx tsc --module commonjs --target es5 --outDir dist/commonjs

for f in dist/commonjs/*.js; do
    sed -E 's/require\("(\.\/.*).js"\)/require\("\1\.cjs"\)/g' "$f" > "${f%.js}.cjs"
    rm "$f"
done
