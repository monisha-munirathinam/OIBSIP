
const form = document.getElementById("converterForm");
const temperatureInput = document.getElementById("temperature");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const result = document.getElementById("result");

const unitNames = {
    C: "°C",
    F: "°F",
    K: "K"
};

function toCelsius(value, unit) {
    if (unit === "C") return value;
    if (unit === "F") return (value - 32) * 5 / 9;
    return value - 273.15;
}

function fromCelsius(value, unit) {
    if (unit === "C") return value;
    if (unit === "F") return (value * 9 / 5) + 32;
    return value + 273.15;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const temperature = Number(temperatureInput.value);
    const sourceUnit = fromUnit.value;
    const targetUnit = toUnit.value;

    result.classList.remove("error");

    if (temperatureInput.value.trim() === "" ||
        !Number.isFinite(temperature)) {
        showError("Please enter a valid temperature.");
        return;
    }

    const celsius = toCelsius(temperature, sourceUnit);

    if (celsius < -273.15) {
        showError("Temperature cannot be below absolute zero.");
        return;
    }

    const converted = fromCelsius(celsius, targetUnit);

    result.textContent =
        `${temperature} ${unitNames[sourceUnit]} = ` +
        `${converted.toFixed(2)} ${unitNames[targetUnit]}`;

    if (sourceUnit === targetUnit) {
        result.textContent += " (Same unit)";
    }
});

function showError(message) {
    result.textContent = message;
    result.classList.add("error");
}
