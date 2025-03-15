function sumArray(numbers) {
    return numbers.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
  }
  
  //test case
  console.log(sumArray([1, 2, 3, 4, 5])); //output: 15