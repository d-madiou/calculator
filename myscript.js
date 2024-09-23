let firstNumber = '';
let currentValue = '';
let operator = '';

document.addEventListener('DOMContentLoaded', function(){
    let clear = document.querySelector('#clear');
    
    // Corrected: Use querySelectorAll to select multiple operators with a class
    let operators = document.querySelectorAll("#operator");
    
    // Use querySelectorAll to select all elements with the class 'number'
    let numbers = document.querySelectorAll(".number");
    
    let decimal = document.querySelector(".decimal");
    let answer = document.querySelector(".ans");
    let delet = document.querySelector('#del');
    let equal = document.querySelector(".equal");
    let firstScreen = document.querySelector("#firstScreen");
    let currentScreen = document.querySelector(".currentScreen");
    let offon = document.querySelector(".offon");

    // Iterate through all the number buttons
    numbers.forEach((number) => number.addEventListener("click", function(e){
        handleNumber(e.target.textContent);
        currentScreen.textContent = currentValue;
    }));

    operators.forEach((op) => op.addEventListener("click", function(e){
        handleOperator(e.target.textContent);
        firstScreen.textContent = firstNumber + " " + operator;
        currentScreen.textContent = currentValue;
    }));

    clear.addEventListener("click", function(){
        firstNumber = '';
        currentValue = '';
        operator = '';
        firstScreen.textContent = '';
        currentScreen.textContent = '';
    });

    delet.addEventListener("click", function(){
        currentValue = "";
        currentScreen.textContent = currentValue;
    });

    offon.addEventListener("click", function(){
        firstNumber = "0";
        currentScreen.textContent = firstNumber;
        firstScreen.textContent = '';
    });

    equal.addEventListener("click", function(){
        if (firstNumber !== "" && currentValue !== ""){
            calculation();
            firstScreen.textContent = '';
            if (firstNumber.length <= 6){
                currentScreen.textContent = firstNumber;
            } else {
                currentScreen.textContent = firstNumber.slice(0,6) + "...";
            }
        }
    });

    decimal.addEventListener("click", function(){
        addDecimal();
        currentScreen.textContent = currentValue;
    });

    answer.addEventListener("click", function(){
        if (firstNumber !== "" && currentValue !== ""){
            calculation();
            firstScreen.textContent = '';
            if (firstNumber.length <= 6){
                currentScreen.textContent = firstNumber;
            } else {
                currentScreen.textContent = firstNumber.slice(0,6) + "...";
            }
        }
    });
});

function handleNumber(num){
    if (currentValue.length <= 8){
        currentValue += num;
    }
}

function handleOperator(opera){
    operator = opera;
    firstNumber = currentValue;
    currentValue = "";
}

function calculation(){
    firstNumber = Number(firstNumber);
    currentValue = Number(currentValue);

    if (operator === "+"){
        firstNumber += currentValue;
    } else if(operator === "-"){
        firstNumber -= currentValue;
    } else if(operator === "*"){
        firstNumber *= currentValue;
    } else if(operator === "/"){
        if (currentValue === 0) {
            firstNumber = "Error"; // Prevent division by zero
        } else {
            firstNumber /= currentValue;
        }
    }

    firstNumber = roundNumber(firstNumber);
    firstNumber = firstNumber.toString();
    currentValue = currentValue.toString();
}

function roundNumber(num){
    return Math.round(num * 1000) / 1000;
}

function addDecimal(){
    if (!currentValue.includes(".")){
        currentValue += ".";
    }
}
