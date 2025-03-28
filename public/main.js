async function toggleDevice(deviceType) {
    try {
        const response = await fetch(`http://localhost:3000/api/devices/${deviceType}/toggle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const deviceElement = document.getElementById(deviceType);
        const button = deviceElement.querySelector('button span');
        
        if (data.isOn) {
            deviceElement.style.backgroundColor = '#4ade80';
            button.textContent = 'On';
        } else {
            deviceElement.style.backgroundColor = 'white';
            button.textContent = 'Off';
        }
        
        // Update specific device controls based on state
        if (deviceType === 'fan') {
            document.getElementById('fanrange').disabled = !data.isOn;
        } else if (deviceType === 'lights') {
            document.getElementById('brightness').disabled = !data.isOn;
        } else if (deviceType === 'led') {
            document.getElementById('color-picker').disabled = !data.isOn;
        } else if (deviceType === 'ac') {
            document.getElementById('acrange').disabled = !data.isOn;
        }
        
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to toggle device. Please check if the server is running.');
    }
}