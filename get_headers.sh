for f in *.csv; do <"$f" read line; printf "$line in $f\n" >> headers.txt; done
