function updateControlPanel(currentWaterLevel, remainingCapacity, percentageUsed, safetyThreshold, damGateStatus, controlMechanism, selectedUnit) {

        document.getElementById('current-flow-info').textContent = currentWaterLevel + " " + selectedUnit;
        document.getElementById('remaining-capacity-info').textContent = remainingCapacity + " " + selectedUnit;
        document.getElementById('percentage-used-info').textContent = percentageUsed + "%";
        document.getElementById('safety-threshold-info').textContent = safetyThreshold + " " + selectedUnit;
        document.getElementById('dam-gate-status-info').textContent = damGateStatus;
        document.getElementById('control-mechanism-info').textContent = controlMechanism;
}

function handleApplyButtonClick() {
    var fullCapacity = document.getElementById('full-capacity').value;
    var unitMeasurement = document.getElementById('units').value;
    var waterLimit = document.querySelector('input[name="Limit"]').value;
    var manualAuto = document.getElementById('Manual').value;

    // Convert fullCapacity and waterLimit to numbers for validation
    fullCapacity = parseFloat(fullCapacity);
    waterLimit = parseFloat(waterLimit);

    if (!fullCapacity || !unitMeasurement || waterLimit==='' || !manualAuto) {
        alert('Please fill in all fields.');
    } else if (isNaN(fullCapacity) || isNaN(waterLimit)) {
        alert('Full Capacity and Water Limit must be numeric values.');
    } else if (!Number.isInteger(fullCapacity) || !Number.isInteger(waterLimit)) {
        alert('Full Capacity and Water Limit must be integer values.');
    } else if (fullCapacity < 0 || waterLimit < 0) {
        alert('Full Capacity and Water Limit must be non-negative.');
    } else if (fullCapacity === 0) {
        alert('Full Capacity must be greater than zero.');
    } else if (fullCapacity % 10 !== 0) {
        alert('Full Capacity must be a multiple of 10.');
    } else if (waterLimit > fullCapacity) {
        alert('Water limit cannot exceed full capacity.');
    } else {
        console.log('Full Capacity:', fullCapacity);
        console.log('Unit of Measurement:', unitMeasurement);
        console.log('Water Limit:', waterLimit);
        console.log('Manual or Auto:', manualAuto);

        // Handle the values (e.g., send them to a server)

        // Disable all inputs and selects after clicking the apply button
        document.getElementById('full-capacity').disabled = true;
        document.getElementById('units').disabled = true;
        document.querySelector('input[name="Limit"]').disabled = true;
        document.getElementById('Manual').disabled = true;
        document.getElementById('apply-button').disabled = true; // Optionally disable the Apply button itself

        updateControlPanel(0,fullCapacity,100,waterLimit,"Closed",manualAuto,unitMeasurement)
    }
}

function updateRulerLines() {
    // Get the full capacity value
    const fullCapacity = parseInt(document.getElementById('full-capacity').value);

    // Calculate the step size between each line
    const stepSize = fullCapacity / 7;

    // Update the positions of the lines
    for (let i = 1; i <= 7; i++) {
        const line = document.getElementById(`line-${i}`);
        if (line) {
            // Calculate the value to display on the line
            const value = Math.round(fullCapacity - (i - 1) * stepSize);
            // Update the position and value of the line
            line.style.display = 'block';
            line.textContent = value;
        }
    }
}



document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('apply-button').addEventListener('click', function() {
        handleApplyButtonClick();
        updateRulerLines();
    });
});
