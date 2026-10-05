// Simple Node + Express Backend for Health Data
const express = require('express');
const app = express();
app.use(express.json());
app.use((req,res,next)=>{res.header('Access-Control-Allow-Origin','*');next();});

let latestData = { heartRate: 72, spo2: 98, temp: 98.6, status: "STABLE" };

// ESP32 will POST here
app.post('/api/data', (req,res)=>{
  latestData = req.body;
  console.log("New Data:", latestData);
  if(latestData.heartRate > 100){
    console.log("ALERT! Critical -> Send to Telegram/Doctor");
  }
  res.json({success:true});
});

// React will GET here
app.get('/api/data', (req,res)=>{ res.json(latestData); });

app.listen(3000, ()=> console.log("Backend running on port 3000"));
