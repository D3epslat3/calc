'use client'
import React from 'react';

export default function Home() {
  const [operation, setOperation] = React.useState('');
  const [result, setResult] = React.useState('0');
  const [waitingForOperand, setWaitingForOperand] = React.useState(true);
  const [memory, setMemory] = React.useState<string[]>([]);

  const handleAddResultInOperation = () => {
    setOperation(result);
  };

  const clearAll = () => {
    setOperation('');
    setResult('0');
    setWaitingForOperand(true);
    setMemory([]);
  };

  const clearEntry = () => {
    if (result.length > 1) {
      setResult(result.slice(0, -1));
    } else {
      setResult('0');
      setWaitingForOperand(true);
    }
  };

  const handleNumber = (number: string) => {
    if (waitingForOperand) {
      setResult(number);
      setWaitingForOperand(false);
    } else {
      setResult(result === '0' ? number : result + number);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setResult('0.');
      setWaitingForOperand(false);
    } else if (result.indexOf('.') === -1) {
      setResult(result + '.');
    }
  };

  const handleOperator = (operator: string) => {
    if (operator === '%') {
      const value = parseFloat(result) / 100;
      setResult(String(value));
      setWaitingForOperand(true);
      return;
    }

    const newMemory = [...memory, result];
    setMemory(newMemory);

    const newOperation = operation + result + ' ' + operator + ' ';
    setOperation(newOperation);
    setResult('0');
    setWaitingForOperand(true);
  };

  const toggleSign = () => {
    const value = parseFloat(result) * -1;
    setResult(String(value));
  };

  const calculate = () => {
    try {
      const newMemory = [...memory, result];
      setMemory(newMemory);

      const expression = operation + result;
      const cleanExpression = expression.replace(/[+\-*/%]\s*$/, '');

      const calculatedResult = new Function('return ' + cleanExpression)();

      setOperation(expression + ' =');
      setResult('0');
      setWaitingForOperand(true);

      setResult(String(calculatedResult));
    } catch (error) {
      console.error('Calculation error:', error);
      setResult('Error');
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="bg-neutral-900 flex justify-center items-center w-screen h-screen">
      <div className="bg-neutral-700 rounded-xl p-8 shadow-md" style={{ transform: 'scale(1.5)' }}>
        <div className="bg-slate-500 w-full rounded-lg mb-3 p-2 flex flex-col">
          <span className="text-white">{operation}</span>
          <div className="flex items-center">
            <span className="text-gray-500">=</span>
            <span 
              className="text-white ml-1 cursor-pointer"
              onClick={() => handleAddResultInOperation()} 
              title={result}
            >
              {result}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-4 grid-rows-5 gap-2"> 
          <button onClick={() => clearEntry()} className="bg-slate-700 hover:bg-slate-600 rounded-lg p-2 text-white transition-colors">CE</button>
          <button onClick={() => clearAll()} className="bg-slate-700 hover:bg-slate-600 rounded-lg p-2 text-white transition-colors">C</button>
          <button onClick={() => handleOperator('%')} className="bg-slate-700 hover:bg-slate-600 rounded-lg p-2 text-white transition-colors">%</button>
          <button onClick={() => handleOperator('/')} className="bg-purple-500 hover:bg-purple-400 rounded-lg p-2 text-white transition-colors">/</button>

          <button onClick={() => handleNumber('7')} className="bg-slate-700 hover:bg-slate-600 rounded-lg p-2 text-white transition-colors">7</button>
          <button onClick={() => handleNumber('8')} className="bg-slate-700 hover:bg-slate-600 rounded-lg p-2 text-white transition-colors">8</button>
          <button onClick={() => handleNumber('9')} className="bg-slate-700 hover:bg-slate-600 rounded-lg p-2 text-white transition-colors">9</button>
          <button onClick={() => handleOperator('*')} className="bg-purple-500 hover:bg-purple-400 rounded-lg p-2 text-white transition-colors">*</button>

          <button onClick={() => handleNumber('4')} className="bg-slate-700 hover:bg-slate-600 rounded-lg p-2 text-white transition-colors">4</button>
          <button onClick={() => handleNumber('5')} className="bg-slate-700 hover:bg-slate-600 rounded-lg p-2 text-white transition-colors">5</button>
          <button onClick={() => handleNumber('6')} className="bg-slate-700 hover:bg-slate-600 rounded-lg p-2 text-white transition-colors">6</button>
          <button onClick={() => handleOperator('-')} className="bg-purple-500 hover:bg-purple-400 rounded-lg p-2 text-white transition-colors">-</button>

          <button onClick={() => handleNumber('1')} className="bg-slate-700 hover:bg-slate-600 rounded-lg p-2 text-white transition-colors">1</button>
          <button onClick={() => handleNumber('2')} className="bg-slate-700 hover:bg-slate-600 rounded-lg p-2 text-white transition-colors">2</button>
          <button onClick={() => handleNumber('3')} className="bg-slate-700 hover:bg-slate-600 rounded-lg p-2 text-white transition-colors">3</button>
          <button onClick={() => handleOperator('+')} className="bg-purple-500 hover:bg-purple-400 rounded-lg p-2 text-white transition-colors">+</button>

          <button onClick={() => toggleSign()} className="bg-slate-700 hover:bg-slate-600 rounded-lg p-2 text-white transition-colors">+/-</button>
          <button onClick={() => handleNumber('0')} className="bg-slate-700 hover:bg-slate-600 rounded-lg p-2 text-white transition-colors">0</button>
          <button onClick={() => handleDecimal()} className="bg-slate-700 hover:bg-slate-600 rounded-lg p-2 text-white transition-colors">.</button>
          <button onClick={() => calculate()} className="bg-purple-500 hover:bg-purple-400 rounded-lg p-2 text-white transition-colors">=</button>
        </div>
      </div>
    </div>
  );
}
