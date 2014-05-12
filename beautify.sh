#!/bin/bash

let exitStatus=0

for file in `ls site/app/js/*.js site/test/unit/*.js`
do
  old=$file
  tmpfile=`mktemp`
  cp $old $tmpfile
  js-beautify -s 2 $file > $tmpfile
  diff $file $tmpfile > /dev/null
  (( exitStatus += $? ))

  rm $file
  mv $tmpfile $old
done

echo "$exitStatus \
$([ $exitStatus -eq 1 ] && (echo "file") || (echo "files")) changed"

exit $exitStatus
