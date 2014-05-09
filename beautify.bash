#!/bin/bash

let exitStatus=0

pushd .
cd site/app/js

for file in `ls *.js`
do
    old=$file
    js-beautify -s 2 $file > .$file
    diff $file .$file > /dev/null
    (( exitStatus += $? ))

    rm $file
    mv .$file $old
done

popd
pushd .
cd site/test/unit

for file in `ls *.js`
do
    old=$file
    js-beautify -s 2 $file > .$file
    diff $file .$file > /dev/null
    (( exitStatus += $? ))
    echo "exitStatus: $exitStatus"
    rm $file
    mv .$file $old
done

popd

exit $exitStatus 
