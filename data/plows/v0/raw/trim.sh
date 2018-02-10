#!/usr/bin/env bash

for file in *.csv
do
    echo "$file"
    sed -e 's/  *//g' $file > ../trimmed/$file
done

