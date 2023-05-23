const oracledb = require("oracledb");

// Oracle Database 연결 정보
const dbConfig = {
  user: 'C##DBTI',
  password: 'dbti',
  connectString: 'localhost:1521/XE'
};

const getConnection = () => {
  return new Promise((resolve, reject) => {
    oracledb.getConnection(dbConfig, (err, connection) => {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    })
  })
}

function doRelease(connection) {
  connection.close(
    function(err) {
      if (err) console.error(err.message);
    });
}

module.exports = {
  getConnection, doRelease
};