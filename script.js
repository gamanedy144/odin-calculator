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
        case 'remainder':
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
const hiddenP = document.querySelector('.hidden');
let digitPressed = false;
let operationDoneBefore = false;
let exceptions = 'divide multiply remainder';
digits.forEach(digit => {
    digit.addEventListener('click', e =>{
        if(equalPressed == true){
            hiddenP.classList.remove('hidden');
            prev.textContent = "";
            prevValue = 0;
            equalPressed = false;
            operationDoneBefore = false;
            dotPreviouslyPressed = false;
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
        console.log(`START currValue = ${currValue}   prevValue = ${prevValue} \n prevFunctionName = ${prevFunctionName} digitPressed = ${digitPressed} equalPressed = ${equalPressed}`);
        console.log(`operationDoneBefore = ${operationDoneBefore}`);

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
        currValue = parseFloat(curr.textContent);
        digitPressed = false;
        operationDoneBefore = true;
        prevFunctionName = functionName;
        lastOperation = operation;
        dotPreviouslyPressed = false;
        hiddenP.classList.add('hidden');
        console.log(`END currValue = ${currValue}   prevValue = ${prevValue} \n prevFunctionName = ${prevFunctionName} digitPressed = ${digitPressed} equalPressed = ${equalPressed}`)
        console.log(`operationDoneBefore = ${operationDoneBefore}`);
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
        if(prevValue % 1 == 0){
            dotPreviouslyPressed = false;
        }
        equalPressed = true;
        digitPressed = false;
        operationDoneBefore = false;
        hiddenP.classList.add('hidden');
    }
    else{
        if(exceptions.includes(prevFunctionName)){
            prevValue = 1;
        }
        else prevValue = 0;
    }

    return 0;
});


const deleteOne = document.querySelector('#delete');

deleteOne.addEventListener('click', e=>{
    //delete the last character of the current number entered
    //if there is no number entered, do nothing
    //if there was a previous value entered, delete the last character of that number
    console.log('hello');
    if(digitPressed == true){
        curr.textContent = curr.textContent.slice(0,-1);
    }
    else{
        curr.textContent = ("" + parseFloat(prev.textContent)).slice(0,-1);
        prev.textContent ="";
        hiddenP.classList.remove('hidden');
        digitPressed = true;
    }

});

const dot = document.querySelector('#dot');
let dotPreviouslyPressed = false;
dot.addEventListener('click', e=>{
    if(parseFloat(curr.textContent) == 0 && dotPreviouslyPressed == false){
        dotPreviouslyPressed = true;
        curr.textContent +='.';
        digitPressed = true;
    }
    else if(equalPressed == true && dotPreviouslyPressed == false){
        equalPressed == false;
        dotPreviouslyPressed = true;
        digitPressed = true;
        curr.textContent = parseFloat(curr.textContent) + '.';
        prev.textContent ="";
        hiddenP.classList.remove('hidden');

    }
    else if(digitPressed == true && dotPreviouslyPressed != true){
        curr.textContent += '.';
        dotPreviouslyPressed = true;
    }
    else if(dotPreviouslyPressed == true){
        //do nothing
    }
    else{
        curr.textContent = parseFloat(prev.textContent) + '.';
        prev.textContent ="";
        hiddenP.classList.remove('hidden');
        dotPreviouslyPressed = true;
    }
});

const allClear = document.querySelector('#clear');
allClear.addEventListener('click', e=>{
    hiddenP.classList.remove('hidden');
    prev.textContent = "";
    prevValue = 0;
    equalPressed = false;
    operationDoneBefore = false;
    dotPreviouslyPressed = false;
    digitPressed = false;
    curr.textContent = '0';
})