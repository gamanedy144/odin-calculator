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

const hiddenP = document.querySelector('.hidden');


let digitPressed = false;
let operationDoneBefore = false;
let exceptions = 'divide remainder';
let prevValue = 0;
let currValue;
let lastOperation;
let prevFunctionName;
let equalPressed = false;
let dotPreviouslyPressed = false;

function digitFunction(digit){
    if(equalPressed == true){
        hiddenP.classList.remove('hidden');
        prev.textContent = "";
        prevValue = 0;
        equalPressed = false;
        operationDoneBefore = false;
        dotPreviouslyPressed = false;
        // console.log('I am here');
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
}
function operationFunction(operation){
        
    let functionName = operation.dataset.value;
    currValue = parseFloat(curr.textContent);
    // console.log(`START currValue = ${currValue}   prevValue = ${prevValue} \n prevFunctionName = ${prevFunctionName} digitPressed = ${digitPressed} equalPressed = ${equalPressed}`);
    // console.log(`operationDoneBefore = ${operationDoneBefore}`);

    if(exceptions.includes(prevFunctionName) && currValue == 0){
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
    prev.textContent +=  ` ${operation.dataset.operator} `;
    curr.textContent = "0";
    currValue = parseFloat(curr.textContent);
    digitPressed = false;
    operationDoneBefore = true;
    prevFunctionName = functionName;
    lastOperation = operation;
    dotPreviouslyPressed = false;
    hiddenP.classList.add('hidden');
    // console.log(`END currValue = ${currValue}   prevValue = ${prevValue} \n prevFunctionName = ${prevFunctionName} digitPressed = ${digitPressed} equalPressed = ${equalPressed}`)
    // console.log(`operationDoneBefore = ${operationDoneBefore}`);
}
function equalFunction(){
    if(prevFunctionName != undefined && equalPressed == false){

        currValue = parseFloat(curr.textContent);
        prev.textContent = `${prevValue} ${lastOperation.dataset.operator} ${currValue} =`;
        curr.textContent = operate(prevFunctionName, prevValue, currValue);
        prevValue = parseFloat(curr.textContent);
        if(Number.isInteger(prevValue)){
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
}
function deleteOneFunction(){
    //delete the last character of the current number entered
    //if there is no number entered, do nothing
    //if there was a previous value entered, delete the last character of that number
    if(digitPressed == true || equalPressed == true){
        curr.textContent = curr.textContent.slice(0,-1);
        prev.textContent = "";
        prevValue = 0;
        hiddenP.classList.remove('hidden');

    }
    else{
        curr.textContent = ("" + parseFloat(prev.textContent)).slice(0,-1);
        prev.textContent ="";
        hiddenP.classList.remove('hidden');
        digitPressed = true;
    }
    if(isNaN(parseFloat(curr.textContent))){
        curr.textContent = '0';
        digitPressed = false;
    }
}
function dotFunction(){
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
}
function allClearFunction(){
    hiddenP.classList.remove('hidden');
    prev.textContent = "";
    prevValue = 0;
    equalPressed = false;
    operationDoneBefore = false;
    dotPreviouslyPressed = false;
    digitPressed = false;
    curr.textContent = '0';
}
function addAnimation(key, typeOfKey){
    key.classList.add(`clicked-${typeOfKey}`);
    key.classList.add('noHover');
}
const digits = document.querySelectorAll('.digit');
digits.forEach(digit => {
    digit.addEventListener('click', e => {
        digitFunction(digit);
        addAnimation(digit, 'digit');
    });
});

const operations = document.querySelectorAll('.operation');
operations.forEach(operation =>{
    operation.addEventListener('click', e => {
        operationFunction(operation);
        addAnimation(operation, 'operation');
    })
});

const equal = document.querySelector('#equal');
equal.addEventListener('click', e => {
    equalFunction(e);
    addAnimation(equal, 'equal');
});


const deleteOne = document.querySelector('#delete');
deleteOne.addEventListener('click', e => {
    deleteOneFunction(e);
    addAnimation(deleteOne, 'delete');
});

const dot = document.querySelector('#dot');
dot.addEventListener('click', e => {
    dotFunction(e);
    addAnimation(dot, 'dot');
});

const allClear = document.querySelector('#clear');
allClear.addEventListener('click', e=> {
    allClearFunction(e);
    addAnimation(allClear, 'delete');
});
allClear.addEventListener('transitionend', removeTransition)

function removeTransition(e){
    if(e.propertyName !== 'transform') return;
    let classOfE = e.target.className.split(" ")[0];
    this.classList.remove(`clicked-${classOfE}`);
    this.classList.remove('noHover');
} 
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', function(e) {
    let key;
    if(e.keyCode >= '96' && e.keyCode <= '111'){
        key = document.querySelector(`.key[data-keyNumpad="${e.keyCode}`);
    }
    else{
        key = document.querySelector(`.key[data-key="${e.keyCode}`);
    }
    

    if(key.dataset.key == '53'){
        if(e.shiftKey){
            operationFunction(key);
            addAnimation(key, 'operation');
        }
        else {
            const fiveKey = document.querySelector('#five');
            digitFunction(fiveKey);
            addAnimation(fiveKey, 'digit');
        }
    }
    // else if(key.dataset.key == '187'){
    //     if(e.keyCode == key.dataset.keyNumpad){
    //         const addKey = document.querySelector('#add');
    //         operationFunction(addKey);
    //     }
    //     else{
    //         if(e.shiftKey){
    //         const addKey = document.querySelector('#add');
    //         operationFunction(addKey);
    //         }
    //         else equalFunction(key);
    //     }
    // }
    else if(key.classList.value.includes('digit')){
        digitFunction(key);
        addAnimation(key, 'digit');
    }
    else if(key.classList.value.includes('operation')){
        operationFunction(key);
        addAnimation(key, 'operation');
    }
    else if(key.classList.value.includes('equal')){
        equalFunction(key);
        addAnimation(key, 'equal');
    }
    else if(key.classList.value.includes('dot')){
        dotFunction(key);
        addAnimation(key, 'dot');
    }
    else if(key.classList.value.includes('delete')){
        deleteOneFunction(key);
        addAnimation(key, 'delete');
    }
    

    // console.log(e);
});