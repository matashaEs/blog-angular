import {connection} from './connection';

connection.sync({force: false});

export {
    connection
}