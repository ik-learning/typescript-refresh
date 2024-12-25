#!/usr/bin/env bash

if [ $# -eq 0 ]
then
	echo -e "You need to specify the target directory.\n"
	echo -e "Usage:"
	echo -e "\t$0 <directory>"
	exit 1
else
	directory=$1
fi

echo "in: $directory"

cd $directory

npm install
