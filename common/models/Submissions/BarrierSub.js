/*module.exports = function (BarrierSub) {
  const subQuery = require("../../javascripts/upsertQuery.js");

  BarrierSub.exports = function (BarrierSub) {

    BarrierSub.prototype.submission = function (myData, cb) {
      const barrierSub = [myData];
      //const barrierObj = {};
      // for (let k in myData.body) {
      //   if (myData.body[k] === '' || myData.body[k] === 'select') {
      //     barrierSub.push(null);
      //     // barrierObj[k] = null
      //   } else if (k === 'gid' || k === 'agency' || k === 'photo_azim') {
      //     barrierSub.push(parseInt(myData.body[k]));
      //     //barrierObj[k] = parseInt(myData.body[k])
      //   } else if (k === 'barr_miles' || k === 'bar_km' || k === 'shape_stle' || k === 'shape_leng') {
      //     barrierSub.push(parseFloat(myData.body[k]));
      //     //barrierObj[k] = parseFloat(myData.body[k])
      //   } else {
      //     barrierSub.push(myData.body[k]);
      //     //barrierObj[k] = myData.body[k];
      //   }
      // }
      console.log(barrierSub);
      const dataSource = BarrierSub.app.datasources.mip;
      const barrierQuery = subQuery.barrierSub;

      dataSource.connector.execute(barrierQuery, barrierSub, function (err, data) {
        if (err) {
          console.log(err);
          // console.log(data);
          // console.log(barrierSub)
        } else {
          console.log(data)
        }
      });

      return cb(null, barrierSub);
    };
  };

  BarrierSub.remoteMethod(
    'submission',
    {
      http: {verb: 'post'},
      accepts: {
        arg: 'req',
        type: 'object',
        http: function (ctx) {
          return ctx.req
        }
      },
      returns: {
        arg: 'data',
        type: 'string',
        root: true
      }
    }
  )
};
*/

module.exports = function (BarrierSub) {
  const testQuery = require("../../javascripts/query.js");

  BarrierSub.barrierSubGeoJSON = function (query, cb) {
    const dataSource = BarrierSub.app.datasources.mip;
    const sql = testQuery.barrier_sub_query;

    dataSource.connector.query(sql, query, function (err, barrierQ) {
      if (err) return cb(err);
      cb(err, barrierQ);
    });

  };
  BarrierSub.remoteMethod(
    'barrierSubGeoJSON',
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
        arg:'data',
        type: ['BarrierSub'],
        root: true
      }
    }
  );
};
