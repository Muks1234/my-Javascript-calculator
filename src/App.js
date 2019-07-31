import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)
    this.calculator = this.calculator.bind(this)
    this.calculate = this.calculate.bind(this)
  }

componentDidMount(){
    const keys = document.querySelector('.calculator');
    keys.addEventListener('click', this.calculator)
}
componentWillUnmount() {
  document.removeEventListener("click", this.calculator)
}

calculate = (n1, operator, n2) => {
  let result = ''
  if (operator === 'add') {
    result = parseFloat(n1) + parseFloat(n2)
  } else if (operator === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2)
  } else if (operator === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2)
  } else if (operator === 'divide') {
      if(n2==='0' && n1 !== '0'){
        result = 'infinity'
      }
      else{
        result = parseFloat(n1) / parseFloat(n2)
      }
  }

  return result
}


calculator=(e)=>{
  const display = document.querySelector('.calculator__display')
  const calculator = document.querySelector('.calculator')

    if(e.target.matches('button')){
        const key = e.target;
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType

        Array.from(key.parentNode.children)
        .forEach(k => k.classList.remove('is-depressed'))

        if(!action){
          if(displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate'
          ){ 
            if(previousKeyType === 'calculate'){
              calculator.dataset.firstValue = ''
              calculator.dataset.modValue = ''
              calculator.dataset.operator = ''
              calculator.dataset.previousKeyType = ''
          }
            display.textContent = keyContent;
          }else{
            display.textContent = displayedNum + keyContent
          }
          calculator.dataset.previousKeyType = 'number'
        }

        if(
          action === 'add' ||
          action === 'subtract'||
          action==='multiply' ||
          action === 'divide'){

            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            // Note: It's sufficient to check for firstValue and operator because secondValue always exists
            if (firstValue &&
               operator && 
               previousKeyType !== 'operator' &&
               previousKeyType !== 'calculate'
               ) {
              const calcValue = this.calculate(firstValue, operator, secondValue)
              display.textContent = calcValue

              // Update calculated value as firstValue
              calculator.dataset.firstValue = calcValue
            } else{
              // If there are no calculations, set displayedNum as the firstValue
              calculator.dataset.firstValue = displayedNum
            }

             // Adding custom attribute
            key.classList.add('is-depressed')
            calculator.dataset.operator = action
            calculator.dataset.previousKeyType = 'operator'
        }

        if(action ==='decimal'){
          if(!displayedNum.includes('.')){
            display.textContent = displayedNum + '.'
          }else if(previousKeyType === 'operator' ||
                  previousKeyType === 'calculate'
          ){
            display.textContent = '0.'
          }
          calculator.dataset.previousKeyType = 'decimal'
        }

        if(action === 'clear'){
          if (key.textContent === 'AC') {
            calculator.dataset.firstValue = ''
            calculator.dataset.modValue = ''
            calculator.dataset.operator = ''
            calculator.dataset.previousKeyType = ''
          } else {
            key.textContent = 'AC'
          }
        
          display.textContent = 0
          calculator.dataset.previousKeyType = 'clear'
        }

        if (action !== 'clear') {
          const clearButton = calculator.querySelector('[data-action=clear]')
          clearButton.textContent = 'CE'
        }

        if(action === 'calculate'){
          let firstValue = calculator.dataset.firstValue
          const operator = calculator.dataset.operator
          let secondValue = displayedNum

        if(firstValue){

          if (previousKeyType === 'calculate') {
            firstValue = displayedNum
            secondValue = calculator.dataset.modValue
          }
      
          let Ans = this.calculate(firstValue, operator, secondValue)
          display.textContent = Ans
        }
            // Set modValue attribute
          calculator.dataset.modValue = secondValue
          calculator.dataset.previousKeyType = 'calculate'
    }   
  }
}

  render(){
    return (
      <div id="outer-container">
        <div id="calculator" className="calculator">
          <div id="display" className="calculator__display">0</div>
          <button id="clear" data-action="clear">AC</button>
          <button id="zero" className="numbers">0</button>
          <button id="one" className="numbers">1</button>
          <button id="two" className="numbers">2</button>
          <button id="three" className="numbers">3</button>
          <button id="four" className="numbers">4</button>
          <button id="five" className="numbers">5</button>
          <button id="six" className="numbers">6</button>
          <button id="seven" className="numbers">7</button>
          <button id="eight" className="numbers">8</button>
          <button id="nine" className="numbers">9</button>
          <button id="decimal" className="numbers" data-action="decimal">.</button>
          <button id="add" className="operators" data-action="add">+</button>
          <button id="subtract" className="operators" data-action="subtract">-</button>
          <button id="multiply" className="operators" data-action="multiply">&times;</button>
          <button id="divide" className="operators" data-action="divide">&divide;</button>
          <button id="equals" data-action="calculate">=</button>
        </div>
      </div>
    );
  }
}

export default App;
