class Calculator {

    constructor(operandoAnterior, operandoAtual) {
        this.operandoAnterior = operandoAnterior;
        this.operandoAtual = operandoAtual;
        this.clear();
    }

    clear() {
        this.operando_anterior = '';
        this.operando_atual = '';
        this.operation = undefined;
    }

    addNumber(number) {
        this.operando_atual = this.operando_atual.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.operando_atual === '') return false
        if (this.operando_anterior !== '') {
            this.compute();
        }
        this.operation = operation;
        this.operando_anterior = this.operando_atual;
        this.operando_atual = '';
    }


    compute() {
        let computation
        const prev = parseFloat(this.operando_anterior);
        const curr = parseFloat(this.operando_atual);

        if (isNaN(prev) || isNaN(curr)) return

        switch (this.operation) {
            case '+':
                computation = prev + curr;
                break;

            case '-':
                computation = prev - curr;
                break;

            case '%':
                computation = prev / curr;
                break;
            case '*':
                computation = prev * curr;
                break;

            default:
                break;
        }
        this.operando_atual = computation;
        this.operation = undefined;
        this.operando_anterior = '';
    }

    updateDisplay() {
        this.operandoAtual.innerText = this.operando_atual;
        if (this.operation != null) {
            this.operandoAnterior.innerText = `${this.operando_anterior} ${this.operation}`;
        }
        else {
            this.operandoAnterior.innerText = '';
        }
    }

    delete() {
        this.operando_atual = this.operando_atual.toString().slice(0, -1);
    }


}

const numberButton = document.querySelectorAll('#number');
const operationButton = document.querySelectorAll('#operation');
const equalButton = document.querySelector('#equal');
const deleteButton = document.querySelector('#delete');
const allClearButton = document.querySelector('#allClear');
const beforeOperator = document.querySelector('#before');
const presentOperator = document.querySelector('#present');


const calculator = new Calculator(beforeOperator, presentOperator);


numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})


deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})