# commands

```
docker compose -f ./docker-compose.yaml up -d
docker-compose run --rm k6-service run --out influxdb=http://influxdb-service:8086/k6 /src/test/load-test.js 
docker-compose run --rm k6-service run /src/test/load-test.js 
```

# References
- [influxDB](https://docs.influxdata.com/influxdb/v2/tools/grafana/?t=InfluxQL)
- [setup1](https://vabarnabas.medium.com/kickstart-your-load-testing-setting-up-grafana-and-influxdb-with-k6-98ec1dba948d)