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
    return x / y;
   
}

function operate(){     //calls other functions to do math with current numbers
    if(calculation.firstNumber === '' || calculation.secondNumber === ''){ //break function if first number doesn't exist 
    return;
    }
    else{
        let x = Number(calculation.firstNumber)
        let y = Number(calculation.secondNumber) 
        
            switch(calculation.operator){
                case 'divide':
                    calculation.lastOperation = x + '÷' + y;
                        if(y === 0){                            
                            clear();
                            displayFormula("Error"); 
                            displayNumber('DIV !0');                                                
                            return;
                        }
                        else{ 
                        calculation.answer = divide(x,y);
                        }
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
                
                

                calculation.firstNumber = calculation.answer.toString(); //set first number to answer
                calculation.onFirstNumber = true; 
                
                if(checkLength(calculation.answer.toString())){
                    displayNumber(calculation.answer.toExponential(2));
                }
                else{              
                    displayNumber(calculation.answer);
                }
                displayFormula(calculation.lastOperation);
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

function checkLength(number){           //check length of current number to not overflow screen needs a string        
   
    number = number.replace('.' , '');
    number = number.replace('-', '');

    console.log(number, typeof number)

    return (number.length >= maxLength);
}

function addNumber(number){ //adds to current number on screen
    if(calculation.onFirstNumber){  //add to first number if they haven't added an operator 
        calculation.firstNumber = calculation.firstNumber + number;
        displayNumber(calculation.firstNumber);
    }
    else{ //add to second number should only function if operator has been selected already 
        calculation.secondNumber = calculation.secondNumber + number;
        displayNumber(calculation.secondNumber);
    }
}

function removeNumber(){ //backspace

    if(calculation.onFirstNumber){  //add to first number if they haven't added an operator 
              
        calculation.firstNumber = calculation.firstNumber.slice(0, -1);
        displayNumber(calculation.firstNumber);
    }
    else{ //add to second number should only function if operator has been selected already 
        calculation.secondNumber = calculation.secondNumber.slice(0, -1);
        displayNumber(calculation.secondNumber);
    }
}

function addDecimal(){ //adds decimal to current number

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

function numberSign(){ //sets negative or positive of number

    let x = Number(calculation.firstNumber)
    let y = Number(calculation.secondNumber) 
       
    console.log(x,y)


    if( x > 0 || y > 0){
        if(calculation.onFirstNumber){  
            calculation.firstNumber = "-" + calculation.firstNumber;
            displayNumber(calculation.firstNumber);
        }
        else{ 
            calculation.secondNumber = '-' + calculation.secondNumber;
            displayNumber(calculation.secondNumber);
        }       
    }
    else{
        if(calculation.onFirstNumber){  
            calculation.firstNumber = calculation.firstNumber.slice(1);
            displayNumber(calculation.firstNumber);
        }
        else{ 
            calculation.secondNumber = calculation.secondNumber.slice(1);
            displayNumber(calculation.secondNumber);
        }         
    }

}

function addOperator(operator){     //handles adding operator and decision if first number is new or answer from previous equation
    
    if(calculation.firstNumber === ''){
        return;
    }    
    else if(calculation.onFirstNumber === false){
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
            let numberCheck = (calculation.onFirstNumber)? calculation.firstNumber: 
                                                           calculation.secondNumber;  
            if(checkLength(numberCheck)){
                break;
            }
            else{
                addNumber(pressButton);
            }
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
        case 'numbersign':
            numberSign();
            break;        
        case 'clear':
            clear();
            break;
        case 'delete':
            removeNumber();
            break;
        case 'equals': 
            operate();
            break;
        default:   //do nothing 
            break;
    };
    console.table(calculation);    
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
            case '=': case 'Enter': 
                document.getElementById('equals').click(); 
                break;
            case 'Backspace':
                document.getElementById('delete').click();  
                break;  
            default:   //do nothing return out of function
            console.log(keyPressed);
            return;       
    }
console.log(keyPressed);
}

let maxLength = 7; //set max length for screen does not count decimal or negative sign

let calculation = { firstNumber: '', 
                    secondNumber: '', 
                    operator: '', 
                    onFirstNumber: true,
                    decimal: false,
                    lastOperation: '',
                    answer: ''};

const buttons = document.querySelector("#buttonGrid");
const displayScreen = document.getElementById("#display");
const formulaScreen = document.getElementById("#formula");

console.log(buttons);

buttons.addEventListener('click', button => {
    if(button.target.className === 'number' || 'number zero'){
        buttonPress(button.target.id)
    }
});

window.addEventListener('keydown', e => keyInput(e.key));

