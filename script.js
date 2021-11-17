function add(x, y){
    return x + y;
}

function subtract(x, y){
    return x - y;
}

function multiply(x, y){
    return x * y;
}

function divide(x, y){
    if(y === 0){
        return "DIV/0!";
    }
    else{
        return x / y;
    }    
}

//equal sign doesn't work properly if only one number is inputted need to fix

function operate(){     //calls other functions to do math with current numbers
    let x = Number(calculation.firstNumber)
    let y = Number(calculation.secondNumber) 
    
    if(typeof(x) == 'number' && typeof(y) == 'number'){
        switch(calculation.operator){
            case 'divide': 
                calculation.answer = divide(x,y);
                calculation.lastOperation = x + '÷' + y;
                break;
            case 'multiply': 
                calculation.answer = multiply(x,y);
                calculation.lastOperation = x + '×' + y; 
                break;
            case 'add':
                calculation.answer = add(x,y);
                calculation.lastOperation = x + '+' + y; 
                break;
            case 'subtract':
                calculation.answer = subtract(x,y);
                calculation.lastOperation = x + '−' + y; 
                break;                        
                
            }
            calculation.answer = Math.round((calculation.answer + Number.EPSILON) * 100) / 100; //round to 2 decimal places
    
            calculation.firstNumber = calculation.answer; //set first number to answer
            calculation.onFirstNumber = true; 
            
            displayFormula(calculation.lastOperation);
            displayNumber(calculation.answer);
    }
        return; 
}

function displayNumber(string){ //displays input or answer to calculator
    document.getElementById('display').innerText = string;      
}

function displayFormula(string){ //displays formula to calculator
    document.getElementById('formula').innerText= string;
}

function clear(){   //clears everything to default
    calculation.firstNumber = '';
    calculation.secondNumber = '';
    calculation.operator = '';
    calculation.lastOperation = ''; 
    calculation.onFirstNumber = true;
    calculation.answer = '';
    document.getElementById('display').innerHTML = "&nbsp";
    document.getElementById('formula').innerHTML = "&nbsp";  
}

function addNumber(number){
    if(calculation.onFirstNumber){  //add to first number if they haven't added an operator 
        calculation.firstNumber = calculation.firstNumber + number;
        displayNumber(calculation.firstNumber);
    }
    else{ //add to second number should only function if operator has been selected already 
        calculation.secondNumber = calculation.secondNumber + number;
        displayNumber(calculation.secondNumber);
    }
}

function addDecimal(){

    let x = Number(calculation.firstNumber)
    let y = Number(calculation.secondNumber)

    if(calculation.onFirstNumber){
        if(x%1 != 0){
            return;
        }
        else{            
            calculation.firstNumber = calculation.firstNumber + ".";
            calculation.onFirstNumber = true;
            displayNumber(calculation.firstNumber);
        }
    }
    else{
        if(y%1 != 0){
            return;
        }
        else{
            calculation.secondNumber = calculation.secondNumber + ".";
            displayNumber(calculation.secondNumber); 
        }   
    }     
}

function addOperator(operator){     //handles adding operator and decision if first number is new or answer from previous equation
    
    
    if(calculation.onFirstNumber === false){
        operate();
    }   
    
    calculation.onFirstNumber = false;
    calculation.secondNumber = '';
    calculation.operator = operator;

}
function buttonPress(pressButton){

    switch(pressButton){
        case '0':
        case '1': case '2': case '3': 
        case '4': case '5': case '6': 
        case '7': case '8': case '9':
            addNumber(pressButton);
            break;
        case 'decimal':
            addDecimal();            
            break;
        case 'subtract': 
        case 'add': 
        case 'multiply':
        case 'divide':
            addOperator(pressButton);
            break;        
        case 'clear':
            clear();
            break;
        case 'equals': 
            operate();
            break;
        default:   //do nothing 
            break;
    };    
}

function keyInput(keyPressed){

    switch(keyPressed){       
            case '0':
            case '1': case '2': case '3': 
            case '4': case '5': case '6': 
            case '7': case '8': case '9':
                document.getElementById(keyPressed).click();
                break;
            case '.':
                document.getElementById('decimal').click();          
                break;
            case '-': 
                document.getElementById('subtract').click(); 
                break;
            case '+': 
            document.getElementById('add').click();
                break; 
            case '*': case 'x':
                document.getElementById('multiply').click(); 
                break;
            case '/':
                document.getElementById('divide').click(); 
                break;        
            case 'c':
                document.getElementById('clear').click();               
                break;
            case '=': 
                document.getElementById('equals').click(); 
                break;
            default:   //do nothing return out of function
            return;       
    }
}

let calculation = { firstNumber: '', 
                    secondNumber: '', 
                    operator: '', 
                    onFirstNumber: true,
                    decimal: false,
                    lastOperation: '',
                    answer: ''};

const buttons = document.querySelector("#allButtons");
const displayScreen = document.getElementById("#display");
const formulaScreen = document.getElementById("#formula");

console.log(buttons);

buttons.addEventListener('click', button => {
    if(button.target.className === 'number' || 'number zero'){
        buttonPress(button.target.id)
    }
});

window.addEventListener('keydown', e => keyInput(e.key));