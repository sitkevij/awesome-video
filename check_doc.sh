#!/bin/sh
egrep -orh --line-buffered "(http(s)?://){1}[^'\)]+" README.md >urls.tmp
while read LINE; do
    curl -o /dev/null --silent --progress-bar --head --write-out '%{http_code} %{time_starttransfer} %{url_effective}\n' "$LINE" >> urls_result.tmp
    sleep 2
done < urls.tmp
