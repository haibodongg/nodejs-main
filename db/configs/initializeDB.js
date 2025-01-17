const fs = require('fs')
const DBPool = require('./dbConfig')

//adds all required tables and configuration data to a new database

const initializeDatabase = ()=>{
    try {
        const newPool = DBPool("localhost","kpgsc_main","A2AJEPJXe4XYHeim","kpgsc_main")//change later
        //create tables
        fs.readFile('./db.sql',async (err,data)=>{
            if(err) return err
            let file = data.toString('utf-8')
            let SQLcommand = ''
            for (let index = 0; index < file.length; index++) {
                SQLcommand += file[index];
                if (file[index] === ";") {
                    newPool.query(SQLcommand)
                    SQLcommand = ''
                }
            }  
            newPool.end()
        })
        return {success:true}
    } catch (error) {
        return error
    }
}

module.exports = initializeDatabase