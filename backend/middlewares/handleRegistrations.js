const db = require("../db/dbcon.js");

async function registerUsers(username, password) {
  await db.execute(
    "INSERT INTO reg (username, password) VALUES (?, ?)",
    [username, password]
  );
}
async function getInfo(username){
    try{
        const [row]=await db.execute("select * from reg where username=?",[username])
        return row
    }catch(err){
        console.log("Error from getInfo from handleRegistrations.js ",err)
    }
}
async function postPatientData(name,age,symptoms){
  try{
    await db.execute(
      "insert into diagnostics(name,age,symptoms) values(?,?,?)",[name,age,symptoms]
    );
    return {name,age,symptoms}
  }catch(err){
    console.log("Error from getPatientData from hhandleRegistrations.js ",err)
  }
}

module.exports={registerUsers,getInfo,postPatientData}