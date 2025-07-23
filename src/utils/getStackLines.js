const getStackLines = (stack) => {
  console.log('getStackLines stack===', stack);
  console.log('getStackLines split===', stack.split('\n'));
  console.log('getStackLines slice===', stack.split('\n').slice(1));

  return stack
    .split('\n')
    .slice(1)
    .map((item) => item.replace(/^\s+at\s+/g, ''))
    .join('^');
};

export default getStackLines;
