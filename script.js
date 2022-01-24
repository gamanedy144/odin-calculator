function operate(operation, value1, value2){
    switch (operation){
        case 'add':
            return add(value1, value2);
        case 'subtract':
            return subtract(value1,value2);
        case 'multiply':
            return multiply(value1,value2);
        case 'divide':
            return divide(value1, value2);
        case 'percentage':
            return remainder(value1, value2);
        default:
            return 0;
    }

}

function add(value1, value2){
    return value1 + value2;
}
function subtract(value1, value2){
    return value1 - value2;
}
function multiply(value1, value2){
    return value1*value2;
}
function divide(value1, value2){
    return value1/value2;
}
function remainder(value1, value2){
    return value1%value2;
}

const curr = document.querySelector('#current');
const prev = document.querySelector('#previous');
const digits = document.querySelectorAll('.digit');
let digitPressed = false;
let operationDoneBefore = false;
digits.forEach(digit => {
    digit.addEventListener('click', e =>{
        if(equalPressed == true){
            prev.textContent = `&nbsp;`;
            equalPressed = false;
            console.log('I am here');
        }       // FIX DIGIT WHEN EQUAL WAS PRESSED BEFORE
        if(digit.dataset.value == 0 && digitPressed == false){
            digitPressed = false;
        }
        else{
            if(digitPressed == false){
                curr.textContent = digit.dataset.value;
                digitPressed = true;
            }
            else{
                curr.textContent += digit.dataset.value;
                digitPressed = true;
            }
            
        }     
    })
});

const operations = document.querySelectorAll('.operation');
let prevValue = 0;
let currValue;
let lastOperation;
let prevFunctionName;
operations.forEach(operation =>{
    operation.addEventListener('click', e =>{
        
        let functionName = operation.dataset.value;
        currValue = parseFloat(curr.textContent);
        console.log(`currValue = ${currValue}   prevValue = ${prevValue} `)

        if(prevFunctionName == 'divide' && currValue == 0){
            prev.textContent = parseFloat(prev.textContent);
        }
        else if(operationDoneBefore == false && digitPressed == true){
            
            prev.textContent = `${curr.textContent}`;
            
        }
    
        else if(equalPressed == false){
            let operationResult = operate(prevFunctionName, prevValue, currValue)
            prev.textContent = `${operationResult}`;
        }
        else{
            prev.textContent = curr.textContent;
            equalPressed = false;
        }

        prevValue = parseFloat(prev.textContent);
        prev.textContent +=  ` ${operation.dataset.key} `;
        curr.textContent = "0";
        digitPressed = false;
        operationDoneBefore = true;
        prevFunctionName = functionName;
        lastOperation = operation;
    })
});
let equalPressed = false;
const equal = document.querySelector('#equal');
equal.addEventListener('click', e =>{
    if(prevFunctionName != undefined && equalPressed == false){

        currValue = parseFloat(curr.textContent);
        prev.textContent = `${prevValue} ${lastOperation.dataset.key} ${currValue} =`;
        curr.textContent = operate(prevFunctionName, prevValue, currValue);
        prevValue = parseFloat(curr);
        equalPressed = true;
        digitPressed = false;
        
    }
    else{
        prevValue = 0;
    }
    return 0;
});
