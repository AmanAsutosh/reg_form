const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/authentication.js");
const db = require("../db/dbcon.js");
require("dotenv").config();

const router = express.Router();

async function registerUser(username, password) {
  await db.execute(
    "INSERT INTO reg (username, password) VALUES (?, ?)",
    [username, password]
  );
}
router.get("/profile", auth, (req, res) => {
  res.json({
    success: true,
    message: `User validated. Welcome ${req.user.username}`,
    user: req.user,
  });
});

router.post('/login',async(req,res)=>{
  try{
  const [username,password]=req.body

  const [row]=await db.execute("select * from reg where username=?",[username])

  user=row[0]
  const v=await bcrypt.compare(password,user.password)
  if(!v){
    return res.status(401).json({
      msg:"Invalid Username or password"
    })
  }
  const token=jwt.sign({
    username
  },process.env.MY_SECRET,
  {expiresIn:'10s'}
)

 res.status(200).json({
  msg:"Login Successful",
  token:"
  })


}catch(err){
    console.err(err)
    res.status(500).json({
      msg:"Some error occured"
    })
  }
})



router.post("/register", async (req, res) => {
  try {

    const { username, password } = req.body;
    const hashedpass = await bcrypt.hash(password, 10);
    const result = await registerUser(username,hashedpass)

    const token=jwt.sign({
      username
    },process.env.MY_SECRET,{expiresIn:'10s'})

    console.log(result);

    res.status(201).json({
      msg: "Registered",
      token:`${token}`,
    });
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({
      msg: err.message,
    });
  }
});

module.exports = router;