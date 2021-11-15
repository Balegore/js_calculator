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

function operate(operator, x, y){     //calls other functions
    operator(x,y);        
}

