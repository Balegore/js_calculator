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
    if(x === 0){
        return "DIV/0!"
    }
    else{
        return x / y;
    }    
}

function operate(){     //calls other functions
    let x = Number(calculation.x)
    let y = Number(calculation.y)
    
    if(typeof(x) == 'number' && typeof(y) == 'number'){
        switch(calculation.operator){
            case 'divide': 
                calculation.answer = divide(x,y);
                break;
            case 'multiply': 
                calculation.answer = multiply(x,y);
                break;
            case 'add':
                calculation.answer = add(x,y);
                break;
            case 'subtract':
                calculation.answer = subtract(x,y);
                break;            
        }       
        calculation.x = calculation.answer.toString();
        calculation.y = '';
    }
    return;

}


function clear(){
    calculation.x = '';
    calculation.y = '';
    calculation.operator = ''; 
    calculation.firstNumber = true;
    calculation.secondNumber = false;
    calculation.answer = '';  
}

function addNumber(number){
    if(calculation.firstNumber){
        calculation.x = number + calculation.x
    }
    else{
    calculation.secondNumber = true;     
    calculation.y = number + calculation.y;
    } 
}

function addOperator(operator){
    if(calculation.secondNumber)
        {
        operate();
        calculation.operator = operator;
        }
    else{
    calculation.operator = operator;
    calculation.firstNumber = false;
    }
}

function buttonPress(){
  
    switch(this.id){
        case '0':
        case '1': case '2': case '3': 
        case '4': case '5': case '6': 
        case '7': case '8': case '9':
            addNumber(this.id);
            break;
        case 'subtract': 
        case 'add': 
        case 'multiply':
        case 'divide':
            addOperator(this.id);
            break;        
        case 'clear':
            clear();
            break;
        case 'equals':
            operate();
    };    
    console.table(calculation);    
}

let calculation = { x: '', 
                    y: '', 
                    operator: '', 
                    firstNumber: true,
                    secondNumber: false,
                    answer: ''};

const buttons = document.querySelectorAll("button");
const displayScreen = document.querySelector("display");
const formulaScreen = document.querySelector("formula");

buttons.forEach(buttons => buttons.addEventListener('click', buttonPress));

