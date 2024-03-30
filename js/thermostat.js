const temperatureControl = document.getElementById('temperatureControl');
const temperatureDisplay = document.querySelector('.temperature-value');
// Функція для збереження значення температури у локальному сховищі
function saveTemperatureToLocalStorage() {
    const temperatureValue = temperatureControl.value;
    localStorage.setItem('temperature', temperatureValue);
}
// Функція завантаження значення температури з локального сховища
function loadTemperatureFromLocalStorage() {
    const temperatureValue = localStorage.getItem('temperature');
    if (temperatureValue) {
        temperatureControl.value = temperatureValue;
        temperatureDisplay.textContent = "select temperature: +" + temperatureValue;
    }
}

loadTemperatureFromLocalStorage();
// Призначаємо обробник події для елемента керування діапазоном
temperatureControl.addEventListener('input', function() {
    const temperatureValue = this.value;
    temperatureDisplay.textContent = "select temperature: +" + temperatureValue;
    saveTemperatureToLocalStorage();
});
