// actual calculator object and methods for calculation

const calculator = {
    displayContent: "", 
    firstnum: null,
    operatorTrue: false,
    operator: null,
    isEquals: false,
    isDecimal: false,

    add(a,b) {
        return (a+b);
    },

    subtract(a,b){
        return (a-b);
    }, 

    multiply(a,b){
        return (a*b);
    },

    divide(a,b){
        if (b===0){
            return "Your Mom";
        }
        return(a/b);
    },

    calculate(){
        if (!this.operator){
            return;
        }

        if (this.operator === "/"){
            this.displayContent = String(this.divide(this.firstnum, parseFloat(this.displayContent)));

        }

        if (this.operator === "x"){
            this.displayContent = String(this.multiply(this.firstnum, parseFloat(this.displayContent)));
        }

        if (this.operator === "+"){
            this.displayContent = String(this.add(this.firstnum, parseFloat(this.displayContent)));
        }

        if (this.operator === "-"){
            this.displayContent = String(this.subtract(this.firstnum, parseFloat(this.displayContent)));
        }

        this.operatorTrue = false;
        this.operator = null;
        this.isEquals = true;
        this.isDecimal = false;
    },

    clear() {
        
        this.displayContent = "";
        this.firstnum = null;
        this.secondnum = null;
        this.operatorTrue = false;
        this.isEquals = false;
        this.isDecomal = false;


    },

    backspace(){

        this.displayContent = this.displayContent.slice(0, -1);
    },

    inputOperator(operator){
        if (this.displayContent === "") return;

        if (this.operator !== null){
            this.calculate();
        }

        this.firstnum = parseFloat(this.displayContent);
        this.operator = operator;
        this.operatorTrue = true;
        this.isEquals = false;
    },

    inputNumber(number){
       if (this.operatorTrue){
           this.displayContent = number;
           this.operatorTrue = false;
        } 
       else {
            this.displayContent += number; 
        }
    }, 

    }





// dom manipulation and visual changes

const display = document.querySelector("#display");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector("#equals");
const period = document.querySelector("#period");
const clear = document.querySelector("#clear");
const back = document.querySelector("#back");
const numbers = document.querySelectorAll(".number");

numbers.forEach(button => {
  button.addEventListener("click", () => {
    if (calculator.isEquals){
        calculator.clear();
        calculator.isEquals = false;
        }
        calculator.inputNumber(button.textContent);
        display.textContent = calculator.displayContent;
    
  });
});

operators.forEach(button => {
  button.addEventListener("click", () => {
    if (calculator.displayContent === "") return;
    calculator.inputOperator(button.textContent);
    display.textContent = calculator.displayContent;
  });
});


document.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9){
        if (calculator.isEquals){
            calculator.clear();
        }
        calculator.inputNumber(e.key);
    }

    else if (e.key === '+' || e.key === '-' || e.key === 'x' || e.key === '*'){
        if (calculator.displayContent === "") return;
        calculator.inputOperator(e.key);
    }

    else if (e.key === 'Enter'){
        calculator.calculate();
    }

    else if (e.key === 'Backspace'){
        calculator.backspace();
    }

    else if (e.key === 'Tab'){
        calculator.clear();
    }

    else if (e.key === '.'){
        if(calculator.isDecimal === false){
        calculator.inputNumber(e.key);
        calculator.isDecimal=true;
        }
    }

    display.textContent = calculator.displayContent;
});


equals.addEventListener("click", () =>{
    calculator.calculate();
    display.textContent = calculator.displayContent; 

})

period.addEventListener("click", ()=>{
    if(calculator.isDecimal === false){
    calculator.inputNumber(period.textContent);
    display.textContent = calculator.displayContent;
    calculator.isDecimal=true;
    }

})

clear.addEventListener("click", ()=>{
    calculator.clear();
    display.textContent = calculator.displayContent;
})

back.addEventListener("click", ()=>{
    calculator.backspace();
    display.textContent = calculator.displayContent;

})

