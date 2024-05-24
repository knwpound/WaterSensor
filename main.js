function updateControlPanel(currentWaterLevel, remainingCapacity, percentageUsed, safetyThreshold, damGateStatus, controlMechanism, selectedUnit) {
        
        document.getElementById('current-flow-info').textContent = currentWaterLevel + " " + selectedUnit;
        document.getElementById('remaining-capacity-info').textContent = remainingCapacity + " " + selectedUnit;
        document.getElementById('percentage-used-info').textContent = percentageUsed + "%";
        document.getElementById('safety-threshold-info').textContent = safetyThreshold + "%";
        document.getElementById('dam-gate-status-info').textContent = damGateStatus;
        document.getElementById('control-mechanism-info').textContent = controlMechanism;
}

function handleApplyButtonClick() {
    var fullCapacity = document.getElementById('full-capacity').value;
    var unitMeasurement = document.getElementById('units').value;
    var waterLimit = document.querySelector('input[name="Limit"]').value;
    var manualAuto = document.getElementById('Manual').value;

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
    }else if(waterLimit>100){
        alert('Water Limit Percentage must between 0-100.');
    } else {
        console.log('Full Capacity:', fullCapacity);
        console.log('Unit of Measurement:', unitMeasurement);
        console.log('Water Limit:', waterLimit);
        console.log('Manual or Auto:', manualAuto);

        updateRulerLines();
        updateControlPanel(0,fullCapacity,0,waterLimit,"Closed",manualAuto,unitMeasurement);
        updateWaterLimitPosition(waterLimit);

        updateWaterLevel(0,fullCapacity);
    }
}

function updateRulerLines() {
    const fullCapacity = parseInt(document.getElementById('full-capacity').value);

    const stepSize = fullCapacity / 7;

    for (let i = 1; i <= 7; i++) {
        const line = document.getElementById(`line-${i}`);
        if (line) {
            const value = Math.round(fullCapacity - (i - 1) * stepSize);
            line.style.display = 'block';
            line.textContent = value;
        }
    }
}
function updateWaterLimitPosition(waterLimit) {
    var waterLimitElement = document.getElementById('water-limit');
    var containerHeight = 280;

    var newPosition = (containerHeight * ((waterLimit / 100)));

    waterLimitElement.style.bottom = newPosition + 'px';
}

function toggleSpinAnimation() {
    var settingImg = document.getElementById('setting');
    var isSpinning = settingImg.style.animationPlayState === 'running';
    
    if (isSpinning) {
        settingImg.style.animationPlayState = 'paused';
        settingImg.classList.add('stop-spin');
        document.getElementById('full-capacity').disabled = true;
        document.getElementById('units').disabled = true;
        document.querySelector('input[name="Limit"]').disabled = true;
        document.getElementById('Manual').disabled = true;
        document.getElementById('apply-button').disabled = true; 
    } else {
        settingImg.style.animationPlayState = 'running';
        settingImg.classList.remove('stop-spin');
        document.getElementById('full-capacity').disabled = false;
        document.getElementById('units').disabled = false;
        document.querySelector('input[name="Limit"]').disabled = false;
        document.getElementById('Manual').disabled = false;
        document.getElementById('apply-button').disabled = false; 
    }
}

function updateWaterLevel(currentWaterLevel, fullCapacity) {
    var waterContainer = document.querySelector('.waterContainer');
    var minTop = -95;

    // Calculate percentage of water filled
    var percentageFilled = (currentWaterLevel / fullCapacity) * 100;
    console.log('Percentage Filled:', percentageFilled);

    // Map the percentage to the range of top values
    var newTop = minTop - ((110) * (percentageFilled / 100));
    console.log('New Top:', newTop);

    // Update the top property of the pseudo-elements
    waterContainer.style.setProperty('--water-top-before', newTop + '%');
    waterContainer.style.setProperty('--water-top-after', (newTop - 2) + '%');
}

function updateCurrentControlPanel(currentWaterLevel){
    document.getElementById('current-flow').textContent=currentWaterLevel;

}


document.addEventListener("DOMContentLoaded", function() {
    var settingImg = document.getElementById('setting');
    document.getElementById('apply-button').addEventListener('click', function() {
        handleApplyButtonClick();
        toggleSpinAnimation();
    });
    settingImg.addEventListener('click', function() {
        toggleSpinAnimation();
    });
});
