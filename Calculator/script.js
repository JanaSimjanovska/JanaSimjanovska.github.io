let numBtns = document.querySelectorAll('[data-num]');
let opsBtns = document.querySelectorAll('[data-ops]'); 
let equalsBtn = document.querySelector('[data-result]'); 
let clearAllBtn = document.getElementById("clearAll");
let displayField = document.getElementById('currentTypeField'); 
let equationField = document.getElementById("equation");
let clickSound = document.getElementById('clickSound');
let button = document.getElementsByTagName('button');


function playSound(){
    clickSound.play();
}

for(let i = 0; i < button.length; i++){
    button[i].addEventListener('click', function(){
        playSound();
    })
}


let expressionArray = [];
let expressionArrayToPrint = [];
let operand = "";
let operator = "";
let result = "";
displayField.innerText = "0";

// #region Get expression to calculate

// Function getOperand adds up the clicked numbers on the calculator to get an operand. It also solves the problem of repeating the decimal. It is called with the dataset values of the number buttons of the calculator, which correspond with the displayed numbers on the buttons. It doesn't allow for entering an operand longer than 15 digits.
function getOperand(number){
    if(number === "." && operand.includes(".")){
        return
    }
    else{
        if(operand.length >= 15){
            return;
        }
        console.log(operand);

        operand += number
        console.log(operand);

    }
}

// Function getOperator is used to get the operator in order to push it in an array which contains all the operators and operands and (this array) is later used as an argument in the calculating functions. This function doesn't allow entering an operation if operand === "", unless it's operation square root, to allow for the square root op to be used in the correct order (e.g. √6, instead of 6√). Also, once an operation is chosen it doesn't allow for the operation to be changed (maybe I could add this functionality in the future), unless the operation was %, after which you can enter any operation again, since the percentage is calculated right away after entering an operand + percentage op (e.g. 8% is calculated right away as an operation with the highest precedence, ex: 9% + 3 = 0.09 + 3, but if no operation is chosen after the percent operator, multiplication operator is automatically added, ex: 9% 3 = 0.09 * 3).
function getOperator(op){
    if(operand === ""){
        
        if(op !== "√" && op !== "-"){
            return;
        }
        else {
            if(op === "√" && operator.includes("√")){
                return;
            }
            if(op === "%" && operator.includes("%")){
                return;
            }
            if(op === "-"){
                if(operator.includes("-")){
                    return;
                }
                else{
                    operand = op;
                    operator = op;
                    expressionArray.push(operator);
                    expressionArrayToPrint.push(operator);
                }
            }
            else{
                operator = op;
                expressionArray.push(operator);
                expressionArrayToPrint.push(operator);

            }
        }
    }
    else{
        operator = op;
        expressionArray.push(operand);
        expressionArrayToPrint.push(operand);
        expressionArray.push(operator); 
        expressionArrayToPrint.push(operator);
    }
}

//#endregion


//#region All operations functions

// Function which adds multiplication operator where needed (in case there are two consequential number elements in the array which is used as the expression to be calculated)
function addMultiplication(expression){
    for(let i = 0; i < expression.length; i++){
        if(!isNaN(expression[i]) && !isNaN(expression[i + 1])){
            expression.splice(i + 1, 0, "*");
            i++;
        }
    }
    return expression;
}



function getPercent(expression){
    let opResult = "";
    for(let i = 0; i < expression.length; i++){
        if(expression[i] === "%"){
            opResult = (parseFloat(expression[i - 1]) * 0.01);
            if(opResult > Number.MAX_SAFE_INTEGER){
                return "Number too large";
            }
            if(opResult % 1 != 0){
                opResult = opResult.toFixed(2);
            }
            expression.splice(i - 1 , 2, opResult.toString());
            i = 0;
        }     
    }    
    return expression;    
}

function getSquareRoot(expression){

    let opResult = "";

    for(let i = 0; i < expression.length; i++){

        if(expression[i] === "√"){ 
        opResult = Math.sqrt(parseFloat(expression[i + 1]));
            if(opResult > Number.MAX_SAFE_INTEGER){
                return "Number too large";
            }
            if(opResult % 1 != 0){
                opResult = opResult.toFixed(2);
            }
            expression.splice(i, 2, opResult.toString());
            i = 0;
        }  
    }   
    
    return expression;    
}

function getPower(expression){

    let opResult = "";

    for(i = 0; i < expression.length; i++){
        if(expression[i] === "^"){
            opResult = Math.pow(parseFloat(expression[i - 1]), parseFloat(expression[i + 1]));
            if(opResult > Number.MAX_SAFE_INTEGER){
                return "Number too large";
            }
            if(opResult % 1 != 0){
                opResult = opResult.toFixed(2);
            }
            expression.splice(i - 1, 3, opResult.toString());
            i = 0;
        }
    }
    addMultiplication(expression);
    return expression; 
}

function multiplyAndDivide(expression){
    let opResult = "";
    for(let i = 0; i < expression.length; i++){
        switch(expression[i]){
            case "*":
                opResult = (parseFloat(expression[i - 1]) * parseFloat(expression[i + 1]));
                if(opResult > Number.MAX_SAFE_INTEGER){
                    return "Number too large";
                }
                if(opResult % 1 != 0){
                    opResult = opResult.toFixed(2);
                }
                expression.splice(i - 1, 3, opResult.toString());
                i = 0;
                break;

            case "/":
                if(expression[i + 1] == "0"){
                    return "Can't divide by zero";
                }
                opResult =(parseFloat(expression[i - 1]) / parseFloat(expression[i + 1]));
                if(opResult > Number.MAX_SAFE_INTEGER){
                    return "Number too large";

                }
                if(opResult % 1 != 0){
                    opResult = opResult.toFixed(2);
                }
                expression.splice(i - 1, 3, opResult.toString());
                i = 0;
                break;
        }
    }
    return expression;
}

function addAndSubtract(expression){
    let opResult = "";
    for(let i = 0; i < expression.length; i++){
        switch(expression[i]){
            case "+":
                opResult = (parseFloat(expression[i - 1]) + parseFloat(expression[i + 1]));
                if(opResult > Number.MAX_SAFE_INTEGER){
                    return "Number too large";
                }
                if(opResult % 1 != 0){
                    opResult = opResult.toFixed(2);
                }
                expression.splice(i - 1, 3, opResult.toString());
                i = 0;
                break;

            case "-":
                if(i === 0){
                    opResult = (0 - parseFloat(expression[i + 1]));
                    if(opResult % 1 != 0){
                        opResult = opResult.toFixed(2);
                    }
                    expression.splice(i, 2, opResult.toString());
                    i = 0;
                }
                
                else {
                    opResult = (parseFloat(expression[i - 1]) - parseFloat(expression[i + 1]));
                    if(opResult % 1 != 0){
                        opResult = opResult.toFixed(2);
                    };
                    expression.splice(i - 1, 3, opResult.toString());
                    i = 0;
                }

                if(opResult.l > Number.MAX_SAFE_INTEGER){
                    return "Number too large";
                }
                
                break;
               
        }
    }
    return expression;
}

//#endregion



function updateDisplayField(){ 
    
    if(operand === ""){
        return;
    }
        displayField.innerText = operand;
    
}

function printEquationAndResult(){

    let equation = "";
    for (const element of expressionArrayToPrint) {
        equation += `${element} `
    }

    if(result === "Number too large"){
        displayField.innerText = "Number too large";
        equationField.innerText = "Error";
        result = "";

    }

    else if(result === "Can't divide by zero"){
        displayField.innerText = "Can't divide by zero";
        equationField.innerText = "Error";
        result = "";
    }

    else if (isNaN(result)){
        displayField.innerText = "Invalid operation";
        equationField.innerText = "Error";
        result = "";
    }

    else if(equation.length > 30){
        let equationSliced = equation.slice(-30);
        equationField.innerText = `...${equationSliced}`;
    }
    
    else{
        equationField.innerText = equation;
        displayField.innerText = result;
    }
}

function clearAll(){
    expressionArray = [];
    expressionArrayToPrint = [];
    operand = "";
    operator = "";
    displayField.innerText = '0';
    equationField.innerText = "";
}


function calculate(){

    expressionArray = getPercent(expressionArray);
    expressionArray = getSquareRoot(expressionArray);
    expressionArray = getPower(expressionArray);
    expressionArray = multiplyAndDivide(expressionArray);
    expressionArray = addAndSubtract(expressionArray);
    result = expressionArray;
    expressionArrayToPrint.push(result);
    printEquationAndResult();

}


for(let i = 0; i < numBtns.length; i++){
    numBtns[i].addEventListener('click', function(){
        printEquationAndResult();
        console.log(operand);
        getOperand(numBtns[i].dataset.num);
        updateDisplayField();

       
    })   
}

for(let i = 0; i < opsBtns.length; i++){
    opsBtns[i].addEventListener('click', function(){
        
        getOperator(opsBtns[i].dataset.ops);
        updateDisplayField();
        printEquationAndResult();
        operand = "";
    
    })   
}

clearAllBtn.addEventListener("click", function(){
    console.log("Clear all works")
    clearAll()
    displayField.innerText = "0";
})


equalsBtn.addEventListener("click", function(){
    
    if (operand != ""){
        expressionArray.push(operand);
        expressionArrayToPrint.push(operand);
    } 
    expressionArrayToPrint.push(equalsBtn.dataset.result);

    calculate();
    
    console.log(operand);
    console.log(expressionArray);
    expressionArray = [];
    expressionArrayToPrint = [];
    operand = result;
    result = '';

    operator = "";
    
})

