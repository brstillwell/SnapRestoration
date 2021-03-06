// https://stackoverflow.com/questions/26999327/execute-raw-query-on-mysql-loopback-connector
// https://stackoverflow.com/questions/28868617/how-can-i-create-a-loopback-remote-method-with-a-model-schema?rq=1
// both links above were used  so i can make a custom REST API based on my native SQL Query

module.exports = function (RestoPointSub) {
  const testQuery = require("../../javascripts/query.js");

  RestoPointSub.restoPointSubGeoJSON = function (query, cb) {
    const dataSource = RestoPointSub.app.datasources.mip;
    const sql = testQuery.restoPointSub_query;

    dataSource.connector.query(sql, query, function (err, barrierQ) {
      if (err) return cb(err);
      cb(err, barrierQ);
    });
  };

  RestoPointSub.remoteMethod(
    'restoPointSubGeoJSON',
    {
      http: {verb: 'get'},
      description: 'This will query Postgres and return a GeoJSON for Leaflet',
      accepts: {
        arg: 'filter',
        type: 'array',
        http: {
          source: 'query'
        }
      },
      returns: {
        arg: 'data',
        type: ['RestoPointSub'],
        root: true
      }
    }
  );
};
