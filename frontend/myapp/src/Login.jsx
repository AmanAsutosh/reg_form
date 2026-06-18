import {useState} from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'

function tokenExpired(token){
    try{
    const payload=JSON.parse(aotb(token.split(".")[1]))
    const expiry=payload.exp*1000
    return Date.now()>expiry
    }catch(err){
        console.err(err)
        return true
    }
}

export default function Login(){
const nav=useNavigate()
const [fdata,setForm]=useState({ n:"",pass:""})
const [status,setStatus]=useState("")

    async function handleSubmit(e){
        e.preventDefault()
        setStatus("Logging In")

     try{

       const response = await fetch("http://localhost:3000/openPage/login", {
             method: "POST",
             headers: {
                    "Content-Type": "application/json",
             },
            body: JSON.stringify({
               fdata
            }),
        });

        const data = await response.json();
        
        if(data.token && tokenExpired(token)){
        localStorage.setItem("token",data.token)
        setStatus("Logging is successful")
        nav('/validate')
        }
        }   
        catch(err){
        console.err(err)
    }
    }
    
    

    function handleChange(e){
        setForm({
            ...fdata,
            [e.target.name]:e.target.value
        })

    }
    return(
        <div className="flex flex-col justify-center items-center h-screen">
            <div>
           <div className='flex justify-between w-full max-w-md'>
            <span>Register</span>
            <span>Login</span>
           </div>
           <div  className="border border-black rounded-lg p-10 shadow-md">
            <form onSubmit={handleSubmit}>
                Name: <input type="text" name="n" value={fdata.n} onChange={handleChange}  className="border border-black"/><br></br>
                password:<input type="password" name="pass" value={fdata.pass} onChange={handleChange}  className="border border-black"/><br/>
               <button type='submit' className="box-border border-black p-5 hover:bg-red-500">Submit</button>       
                {status}
               
            </form>
            </div>
            </div>
        </div>
    )
}