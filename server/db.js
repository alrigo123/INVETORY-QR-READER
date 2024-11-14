import {createPool} from 'mysql2/promise'; //pool to use 

// Local Host
const pool = new createPool({
    host : 'localhost',
    // port : 3333, //this is the port but why what does mean ??? 
    user : 'root',
    password : '',
    // database : 'geragri-inventario'
    database : 'bienes-geragri'
})

// // Clever cloud 
// const pool = new createPool({
//     host : 'baobfvsm079fl2l3b4wv-mysql.services.clever-cloud.com',
//     port : 3306, //this is the port but why what does mean ??? 
//     user : 'umtuhz11zooiir2b',
//     password : 'JlKeGtt6n2csVeFYVFb4',
//     database : 'baobfvsm079fl2l3b4wv'
// })

export default pool