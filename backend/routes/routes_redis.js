const redis=require('redis')
const express=require('express')


const router=express.Router()
const client=redis.createClient()

client.on("connect",()=>{
    console.log("Connection created")
});

client.on('error',(err)=>{
    console.log("Error occured",err)
});

const kadali=async ()=>{
   await client.connect()

try{
    await client.set("Aman","Nilu")

    var c=await client.get("Aman")
    console.log(c)

    await client.hSet("Aman_kar",{
        g1:"Smita",
        g2:"Nilu"
    });

    const data=await client.hGetAll("Aman_kar")
    console.log(data)
  }catch(err){
    console.log(err)
  }

}
kadali()