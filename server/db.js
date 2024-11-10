import {createPool} from 'mysql2/promise'; //pool to use 

const pool = new createPool({
    host : 'localhost',
    // port : 3333, //this is the port but why what does mean ??? 
    user : 'root',
    password : '',
    database : 'geragri-inventario'
})

export default pool