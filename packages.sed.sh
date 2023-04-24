#!/bin/bash
#
#unpublish a package:
#	meteor admin set-unmigrated  keplerjs:base
#
DIR=$(pwd)
for d in $(find . -maxdepth 3 -type d -name .git | sed 's/\.git//') ; do

  echo "$d"
  cd $d

  #git status


  cd $DIR
done

 6247  grep -lr '<script src="/labs-common.js"></script>' . | xargs sed -i '/<script src="\/labs-common.js"><\/script>/d'
