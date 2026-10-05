const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
let healthData = { heartRate: 72, spo2: 98, temperature: 98.6, status: "STABLE", lastUpdated: new Date() };
app.post('/api/health-data', (req, res) => {
  const { heartRate, spo2, temperature } = req.body;
  healthData = { heartRate, spo2, temperature, status: heartRate > 100 || spo2 < 95 ? "CRITICAL" : "STABLE", lastUpdated: new Date() };
  res.json({ success: true, data: healthData });
});
app.get('/api/health-data', (req, res) => { res.json(healthData); });
app.get('/', (req, res) => { res.send('ArogyaDrish Backend Running'); });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server running on ${PORT}`); });
