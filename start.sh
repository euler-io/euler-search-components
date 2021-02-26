#!/bin/bash

set -e

npm start &
P1=$!
cd example
npm start &
P2=$!
wait $P1 $P2
cd -
