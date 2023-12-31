//con esto podemos hacer consultas a la base de datos

const  mysql = require ('mysql');
const { promisify } = require('util');

const { database } = require('./keys');


const pool = mysql.createPool(database);

pool.getConnection((err,connection) => { 
        if(err) {
            if(err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TOO MANY CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if(connection) connection.release();
    console.log('Conectado a la base de datos');
    return;

});

//promisify pool querys
pool.query = promisify(pool.query);

module.exports = pool;