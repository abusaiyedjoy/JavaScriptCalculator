class Calculator {
    constructor() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = null;
        this.waitingForNewOperand = false;
        this.memory = 0;
        this.currentExpression = '';
        this.isScientificMode = false;
        this.parenthesesStack = [];
        
        this.initializeElements();
        this.bindEvents();
        this.updateDisplay();
    }
    
    initializeElements() {
        // Display elements
        this.mainDisplay = document.getElementById('mainDisplay');
        this.expressionDisplay = document.getElementById('expressionDisplay');
        this.memoryIndicator = document.getElementById('memoryIndicator');
        this.memoryValue = document.getElementById('memoryValue');
        
        // Tab elements
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.tabContents = document.querySelectorAll('.tab-content');
        
        // Button elements
        this.numberButtons = document.querySelectorAll('[data-number]');
        this.operatorButtons = document.querySelectorAll('[data-operation]');
        this.functionButtons = document.querySelectorAll('[data-function]');
        this.actionButtons = document.querySelectorAll('[data-action]');
    }
    
    bindEvents() {
        // Tab switching
        this.tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });
        
        // Number buttons
        this.numberButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.inputNumber(e.target.dataset.number);
                this.animateButton(e.target);
            });
        });
        
        // Operator buttons
        this.operatorButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.inputOperator(e.target.dataset.operation);
                this.animateButton(e.target);
            });
        });
        
        // Function buttons
        this.functionButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.inputFunction(e.target.dataset.function);
                this.animateButton(e.target);
            });
        });
        
        // Action buttons
        this.actionButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.performAction(e.target.dataset.action);
                this.animateButton(e.target);
            });
        });
        

        
        // Keyboard support
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Prevent context menu on buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('contextmenu', (e) => e.preventDefault());
        });
    }
    
    switchTab(tabName) {
        // Update tab buttons
        this.tabButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });
        
        // Update tab contents
        this.tabContents.forEach(content => {
            content.classList.toggle('active', content.id === tabName + 'Tab');
        });
        
        this.isScientificMode = tabName === 'scientific';
        this.clear(); // Clear calculator when switching modes
    }
    
    animateButton(button) {
        button.classList.add('btn-pressed');
        setTimeout(() => button.classList.remove('btn-pressed'), 150);
    }
    
    inputNumber(num) {
        if (this.waitingForNewOperand) {
            this.currentInput = num;
            this.waitingForNewOperand = false;
        } else {
            this.currentInput = this.currentInput === '0' ? num : this.currentInput + num;
        }
        this.updateDisplay();
    }
    
    inputOperator(nextOperator) {
        const inputValue = parseFloat(this.currentInput);
        
        if (this.previousInput === '') {
            this.previousInput = inputValue;
        } else if (this.operator) {
            const currentValue = this.previousInput || 0;
            const newValue = this.calculate(currentValue, inputValue, this.operator);
            
            this.currentInput = String(newValue);
            this.previousInput = newValue;
        }
        
        this.waitingForNewOperand = true;
        this.operator = nextOperator;
        this.updateExpression();
        this.updateDisplay();
    }
    
    inputFunction(func) {
        const inputValue = parseFloat(this.currentInput);
        let result;
        
        try {
            switch (func) {
                case 'sin':
                    result = Math.sin(this.toRadians(inputValue));
                    break;
                case 'cos':
                    result = Math.cos(this.toRadians(inputValue));
                    break;
                case 'tan':
                    result = Math.tan(this.toRadians(inputValue));
                    break;
                case 'log':
                    if (inputValue <= 0) throw new Error('Invalid input for log');
                    result = Math.log10(inputValue);
                    break;
                case 'ln':
                    if (inputValue <= 0) throw new Error('Invalid input for ln');
                    result = Math.log(inputValue);
                    break;
                case 'sqrt':
                    if (inputValue < 0) throw new Error('Invalid input for sqrt');
                    result = Math.sqrt(inputValue);
                    break;
                case 'square':
                    result = Math.pow(inputValue, 2);
                    break;
                case 'factorial':
                    if (inputValue < 0 || !Number.isInteger(inputValue)) {
                        throw new Error('Invalid input for factorial');
                    }
                    result = this.factorial(inputValue);
                    break;
                case 'inverse':
                    if (inputValue === 0) throw new Error('Division by zero');
                    result = 1 / inputValue;
                    break;
                case 'percent':
                    result = inputValue / 100;
                    break;
                case 'negate':
                    result = -inputValue;
                    break;
                case 'abs':
                    result = Math.abs(inputValue);
                    break;
                case 'pi':
                    result = Math.PI;
                    break;
                case 'e':
                    result = Math.E;
                    break;
                case 'power':
                    this.inputOperator('**');
                    return;
                default:
                    return;
            }
            
            this.currentInput = this.formatResult(result);
            this.waitingForNewOperand = true;
            this.updateDisplay();
        } catch (error) {
            this.showError(error.message);
        }
    }
    
    performAction(action) {
        switch (action) {
            case 'clear':
                this.clear();
                break;
            case 'all-clear':
                this.allClear();
                break;
            case 'backspace':
                this.backspace();
                break;
            case 'decimal':
                this.inputDecimal();
                break;
            case 'equals':
                this.equals();
                break;
            case 'mc':
                this.memoryClear();
                break;
            case 'mr':
                this.memoryRecall();
                break;
            case 'm-plus':
                this.memoryAdd();
                break;
            case 'm-minus':
                this.memorySubtract();
                break;
            case 'open-paren':
                this.inputOpenParenthesis();
                break;
            case 'close-paren':
                this.inputCloseParenthesis();
                break;
        }
    }
    
    calculate(firstOperand, secondOperand, operator) {
        switch (operator) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '*':
                return firstOperand * secondOperand;
            case '/':
                if (secondOperand === 0) throw new Error('Division by zero');
                return firstOperand / secondOperand;
            case '**':
                return Math.pow(firstOperand, secondOperand);
            default:
                return secondOperand;
        }
    }
    
    equals() {
        const inputValue = parseFloat(this.currentInput);
        
        if (this.previousInput !== '' && this.operator) {
            const expression = `${this.previousInput} ${this.operator} ${inputValue}`;
            try {
                const newValue = this.calculate(this.previousInput, inputValue, this.operator);
                this.currentInput = this.formatResult(newValue);
                this.previousInput = '';
                this.operator = null;
                this.waitingForNewOperand = true;
                this.currentExpression = '';
            } catch (error) {
                this.showError(error.message);
            }
        }
        this.updateDisplay();
    }
    
    clear() {
        this.currentInput = '0';
        this.updateDisplay();
    }
    
    allClear() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = null;
        this.waitingForNewOperand = false;
        this.currentExpression = '';
        this.parenthesesStack = [];
        this.updateDisplay();
    }
    
    backspace() {
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
        this.updateDisplay();
    }
    
    inputDecimal() {
        if (this.waitingForNewOperand) {
            this.currentInput = '0.';
            this.waitingForNewOperand = false;
        } else if (this.currentInput.indexOf('.') === -1) {
            this.currentInput += '.';
        }
        this.updateDisplay();
    }
    
    inputOpenParenthesis() {
        if (this.waitingForNewOperand || this.currentInput === '0') {
            this.currentInput = '(';
            this.waitingForNewOperand = false;
        } else {
            this.currentInput += '*(';
        }
        this.parenthesesStack.push('(');
        this.updateDisplay();
    }
    
    inputCloseParenthesis() {
        if (this.parenthesesStack.length > 0) {
            this.currentInput += ')';
            this.parenthesesStack.pop();
            this.updateDisplay();
        }
    }
    
    // Memory functions
    memoryClear() {
        this.memory = 0;
        this.updateMemoryDisplay();
    }
    
    memoryRecall() {
        this.currentInput = String(this.memory);
        this.waitingForNewOperand = true;
        this.updateDisplay();
    }
    
    memoryAdd() {
        this.memory += parseFloat(this.currentInput);
        this.updateMemoryDisplay();
    }
    
    memorySubtract() {
        this.memory -= parseFloat(this.currentInput);
        this.updateMemoryDisplay();
    }
    
    updateMemoryDisplay() {
        if (this.memory !== 0) {
            this.memoryIndicator.style.display = 'flex';
            this.memoryValue.textContent = this.formatResult(this.memory);
        } else {
            this.memoryIndicator.style.display = 'none';
        }
    }
    
    // Utility functions
    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
    
    factorial(n) {
        if (n > 170) throw new Error('Number too large for factorial');
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
    
    formatResult(value) {
        if (isNaN(value) || !isFinite(value)) {
            return 'Error';
        }
        
        // Handle very small numbers
        if (Math.abs(value) < 1e-10 && value !== 0) {
            return value.toExponential(6);
        }
        
        // Handle very large numbers
        if (Math.abs(value) > 1e12) {
            return value.toExponential(6);
        }
        
        // Round to avoid floating point precision issues
        const rounded = Math.round(value * 1e12) / 1e12;
        
        // Format the number
        if (Number.isInteger(rounded)) {
            return rounded.toString();
        } else {
            return rounded.toString();
        }
    }
    
    showError(message) {
        this.currentInput = 'Error';
        this.mainDisplay.classList.add('error');
        this.expressionDisplay.textContent = message;
        
        setTimeout(() => {
            this.allClear();
            this.mainDisplay.classList.remove('error');
            this.expressionDisplay.textContent = '';
        }, 2000);
    }
    
    updateExpression() {
        if (this.operator && this.previousInput !== '') {
            this.currentExpression = `${this.previousInput} ${this.operator} `;
        }
    }
    
    updateDisplay() {
        this.mainDisplay.textContent = this.currentInput;
        this.expressionDisplay.textContent = this.currentExpression;
        
        // Auto-resize font if number is too long
        if (this.currentInput.length > 12) {
            this.mainDisplay.style.fontSize = '1.8em';
        } else if (this.currentInput.length > 8) {
            this.mainDisplay.style.fontSize = '2.2em';
        } else {
            this.mainDisplay.style.fontSize = '2.5em';
        }
    }

    
    // Keyboard support
    handleKeyboard(event) {
        const key = event.key;
        
        // Prevent default for calculator keys
        if (/[0-9+\-*/.=]/.test(key) || ['Backspace', 'Delete', 'Enter', 'Escape'].includes(key)) {
            event.preventDefault();
        }
        
        // Numbers
        if (/[0-9]/.test(key)) {
            this.inputNumber(key);
        }
        
        // Operators
        else if (key === '+') {
            this.inputOperator('+');
        } else if (key === '-') {
            this.inputOperator('-');
        } else if (key === '*') {
            this.inputOperator('*');
        } else if (key === '/') {
            this.inputOperator('/');
        }
        
        // Actions
        else if (key === '.' || key === ',') {
            this.inputDecimal();
        } else if (key === '=' || key === 'Enter') {
            this.equals();
        } else if (key === 'Backspace') {
            this.backspace();
        } else if (key === 'Delete' || key === 'Escape') {
            this.allClear();
        } else if (key === 'c' || key === 'C') {
            this.clear();
        }
        
        // Parentheses
        else if (key === '(') {
            this.inputOpenParenthesis();
        } else if (key === ')') {
            this.inputCloseParenthesis();
        }
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.calculator = new Calculator();
});

// Handle window resize for responsive design
window.addEventListener('resize', () => {
    // Force recalculation of display font size
    if (window.calculator) {
        window.calculator.updateDisplay();
    }
});

// Prevent zoom on double tap for mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);
