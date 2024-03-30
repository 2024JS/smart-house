const brightnessControl = document.getElementById('brightnessControl');
const brightnessDisplay = document.querySelector('.brightness-level');
const lampSwitch = document.getElementById('lampSwitch');
const brightnessControlContainer = document.getElementById('brightnessControlContainer');

// Функція для збереження значення у локальному сховищі
function saveSettingsToLocalStorage() {
    localStorage.setItem('lampSwitchState', lampSwitch.checked);
    localStorage.setItem('brightnessLevel', brightnessControl.value);
}

// Функція завантаження значень з локального сховища
function loadSettingsFromLocalStorage() {
    const lampSwitchState = localStorage.getItem('lampSwitchState');
    const brightnessLevel = localStorage.getItem('brightnessLevel');
    if (lampSwitchState !== null) {
        lampSwitch.checked = JSON.parse(lampSwitchState);
    }
    if (brightnessLevel !== null) {
        brightnessControl.value = brightnessLevel;
        updateBrightnessDisplay();
    }
}

// Функція оновлення відображення рівня яскравості
function updateBrightnessDisplay() {
    const brightnessValue = parseInt(brightnessControl.value);
    let powerLevel;
    switch (brightnessValue) {
        case 0:
            powerLevel = 'Low';
            document.body.style.backgroundColor = 'gray';
            break;
        case 1:
            powerLevel = 'Medium';
            document.body.style.backgroundColor = 'darkkhaki';
            break;
        case 2:
            powerLevel = 'High';
            document.body.style.backgroundColor = 'white';
            break;
        default:
            powerLevel = 'Medium'; // По умолчанию установим средний уровень яркости
            document.body.style.backgroundColor = 'darkkhaki'; // По умолчанию установим цвет darkkhaki
    }
    brightnessDisplay.textContent = "Light power: " + powerLevel;
}

loadSettingsFromLocalStorage();

// Призначаємо обробник подій для елемента управління яскравістю
brightnessControl.addEventListener('input', function() {
    updateBrightnessDisplay();
    saveSettingsToLocalStorage();
});

// Призначаємо обробник подій для перемикача лампи
lampSwitch.addEventListener('change', function() {
    brightnessControlContainer.style.display = this.checked ? 'block' : 'none';
    saveSettingsToLocalStorage();
});

// Призначаємо обробник подій для зміни кольору фону при включенні/вимкненні лампи
lampSwitch.addEventListener('change', function() {
    document.body.style.backgroundColor = this.checked ? 'darkkhaki' : 'black';
});

// Функція перевірки стану перемикача лампи під час завантаження сторінки
function checkLampStateOnLoad() {
    // Проверяем состояние переключателя лампы в localStorage
    const lampSwitchState = localStorage.getItem('lampSwitchState');
    if (lampSwitchState !== null) {
        lampSwitch.checked = JSON.parse(lampSwitchState);
        // Применяем соответствующие действия в зависимости от состояния переключателя лампы
        brightnessControlContainer.style.display = lampSwitch.checked ? 'block' : 'none';
        document.body.style.backgroundColor = lampSwitch.checked ? 'darkkhaki' : 'black';
    }
}

checkLampStateOnLoad();
