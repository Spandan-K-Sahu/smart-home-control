// This is a simple Express server to handle device states and control commands.
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
let deviceStates = {
    fan: {
        isOn: false,
        speed: 0
    },
    lights: {
        isOn: false,
        brightness: 100
    },
    led: {
        isOn: false,
        color: '#ff0000'
    },
    ac: {
        isOn: false,
        temperature: 23
    }
};
app.get('/api/devices', (req, res) => {
    res.json(deviceStates);
});
app.post('/api/devices/:device/toggle', (req, res) => {
    const device = req.params.device;
    if (deviceStates[device]) {
        deviceStates[device].isOn = !deviceStates[device].isOn;
        res.json(deviceStates[device]);
    } else {
        res.status(404).json({ error: 'Device not found' });
    }
});
app.post('/api/devices/fan/speed', (req, res) => {
    const { speed } = req.body;
    deviceStates.fan.speed = parseInt(speed);
    res.json(deviceStates.fan);
});
app.post('/api/devices/lights/brightness', (req, res) => {
    const { brightness } = req.body;
    deviceStates.lights.brightness = parseInt(brightness);
    res.json(deviceStates.lights);
});
app.post('/api/devices/led/color', (req, res) => {
    const { color } = req.body;
    deviceStates.led.color = color;
    res.json(deviceStates.led);
});
app.post('/api/devices/ac/temperature', (req, res) => {
    const { temperature } = req.body;
    deviceStates.ac.temperature = parseInt(temperature);
    res.json(deviceStates.ac);
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:3000`);
});