function calculate(expr) {
  if (!expr) return 0;

  const stack = [];

  let num = 0;
  let sign = '+';
  startIdx = 0;

  for (let i = 0; i < expr.length; i++) {
    let currChar = expr.charAt(i);
    
    if (!isNaN(parseFloat(expr.slice(startIdx, i + 1))) || currChar === '.') {
      num = parseFloat(expr.slice(startIdx, i + 1));
    } else if (currChar === '(') {
      
      if (startIdx > 0 && expr[startIdx - 1] === ')') throw new Error('Invalid expression'); // Invalid expression if brackets come after numbers directly with no sign

      let brackets = 1;
      let j;
      for (j = i + 1; j < expr.length; j++) {
        if (expr.charAt(j) === '(') brackets++;
        if (expr.charAt(j) === ')') brackets--;
        if (brackets === 0) break;
      }

      num = calculate(expr.slice(i + 1, j));  //recursively calculate expression inside brackets
      i = j;
      startIdx = i + 1;
    }

    if (currChar == '+' || currChar == '-' || currChar == '*' || currChar == '/' || i === expr.length - 1) {
      switch (sign) {
        case '+':
          stack.push(num);
          break;
        case '-':
          stack.push(-num);
          break;
        case '*':
          stack.push(stack.pop() * num);
          break;
        case '/':
          stack.push(stack.pop() / num);
          break;
      }
      num = 0;
      sign = currChar;
      startIdx = i + 1; 
    }
  }

  let result = 0;
  while (stack.length > 0) result += stack.pop();
  return result;
}


function validateBrackets(expr) {
  let brackets = 0;
  for (let i = 0; i < expr.length; i++) {
    let currChar = expr.charAt(i);
    if (currChar === '(') brackets++;
    if (currChar === ')') brackets--;
    if (brackets < 0) return false;
  }
  return brackets === 0;
}

function calculator(expr) {
  if (!validateBrackets(expr)) throw new Error('Invalid expression');
  return calculate(expr);
}

module.exports = calculator;
