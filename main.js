let buttons = document.querySelectorAll('#calculator button');
let display = document.getElementById('box');

let currentValue = '0';
let operator = null;
let previousValue = null;
let memoryValue = 0;

// Добавление обработчиков событий для кнопок калькулятора
buttons.forEach(button => {
    button.addEventListener('click', () => {
        handleButtonClick(button.id);
    });
});

// Обработка нажатий на кнопки
function handleButtonClick(buttonId) {
    switch (buttonId) {
        case 'mc':
            memoryValue = 0; // Очистка памяти
            break;
        case 'm+':
            memoryValue += parseFloat(currentValue); // Добавление текущего значения в память
            break;
        case 'm-':
            memoryValue -= parseFloat(currentValue); // Вычитание текущего значения из памяти
            break;
        case 'mr':
            currentValue = memoryValue.toString(); // Восстановление значения из памяти
            break;
        case '%':
            currentValue = (parseFloat(currentValue) / 100).toString(); // Процент от текущего значения
            break;
        case 'ce':
            clearDisplay(); // Очистка дисплея (текущего значения)
            break;
        case 'ca':
            clearDisplay(); // Очистка дисплея (текущего значения)
            break;
        case 'remove':
            // Удаление последнего символа из текущего значения
            if (currentValue.length > 1) {
                currentValue = currentValue.slice(0, -1);
            } else {
                currentValue = '0'; // Сброс к '0', если длина 1
            }
            break;
        case '1divx':
            currentValue = (1 / parseFloat(currentValue)).toString(); // Обратное значение
            break;
        case 'pow':
            currentValue = Math.pow(currentValue, 2).toString(); // Возведение в квадрат
            break;
        case 'sqrt':
            currentValue = Math.sqrt(parseFloat(currentValue)).toString(); // Квадратный корень
            break;
        case '+':
            calculate(); // Выполнение расчета
            operator = '+'; // Установка оператора
            break;
        case '-':
            calculate(); // Выполнение расчета
            operator = '-'; // Установка оператора
            break;
        case '*':
            calculate(); // Выполнение расчета
            operator = '*'; // Установка оператора
            break;
        case '/':
            calculate(); // Выполнение расчета
            operator = '/'; // Установка оператора
            break;
        case 'changeSign':
            currentValue = (parseFloat(currentValue) * -1).toString(); // Смена знака текущего значения
            break;
        case '=':
            calculate(); // Выполнение расчета при нажатии на '='
            operator = null; // Сброс оператора
            break;
        default:
            handleNumber(buttonId); // Обработка нажатия числа
            break;
    }
    updateDisplay(); // Обновление дисплея
}

// Обработка нажатия кнопки с числом
function handleNumber(number) {
    if (currentValue === '0') {
        currentValue = number; // Установка нового числа
    } else {
        currentValue += number; // Добавление числа к текущему значению
    }
}

// Выполнение расчета
function calculate() {
    if (previousValue !== null && operator !== null) {
        const prev = parseFloat(previousValue); // Преобразование предыдущего значения в число
        const curr = parseFloat(currentValue); // Преобразование текущего значения в число
        switch (operator) {
            case '+':
                currentValue = (prev + curr).toString(); // Сложение
                break;
            case '-':
                currentValue = (prev - curr).toString(); // Вычитание
                break;
            case '*':
                currentValue = (prev * curr).toString(); // Умножение
                break;
            case '/':
                if (curr === 0) {
                    currentValue = 'Error'; // Обработка деления на ноль
                } else {
                    currentValue = (prev / curr).toString(); // Деление
                }
                break;
            default:
                break;
        }
        previousValue = null; // Сброс предыдущего значения
    } else {
        previousValue = currentValue; // Установка текущего значения как предыдущего
        currentValue = '0'; // Сброс текущего значения
    }
}

// Очистка дисплея
function clearDisplay() {
    currentValue = '0'; // Сброс текущего значения на '0'
    previousValue = null; // Сброс предыдущего значения
    operator = null; // Сброс оператора
}

// Обновление дисплея
function updateDisplay() {
    display.textContent = currentValue; // Обновление отображаемого значения
}
