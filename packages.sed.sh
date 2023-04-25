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


	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-fork-ribbon-css/0.2.3/gh-fork-ribbon.min.css" />
	<a class="github-fork-ribbon" href="https://url.to-your.repo" data-ribbon="Fork me on GitHub" title="Fork me on GitHub">Fork me on GitHub</a>
