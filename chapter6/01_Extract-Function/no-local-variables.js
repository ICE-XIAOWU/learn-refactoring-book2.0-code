// 无局部变量

/** 源函数 */
function printOwing(invoice) {
  let outstanding = 0;

  console.log('*****************************');
  console.log('******* Customer Owes *******');
  console.log('*****************************');

  // calculate outstanding
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  // record due data
  // Clock.today = Clock Wrapper 封装系统时钟调用的对象。
  const today = Clock.today;
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

  // print details 
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
  console.log(`due: ${invoice.dueDate.toLocalDateString()}`);
}

/** 提炼函数开始 */

/** 打印banner */
function printBanner() {
  console.log('*****************************');
  console.log('******* Customer Owes *******');
  console.log('*****************************');
}

function printOwing(invoice) {
  let outstanding = 0;

  printBanner();

  // calculate outstanding
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  // record due data
  // Clock.today = Clock Wrapper 封装系统时钟调用的对象。
  const today = Clock.today;
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

  printDetails();
  // print details 
  function printDetails() {
    console.log(`name: ${invoice.customer}`);
    console.log(`amount: ${outstanding}`);
    console.log(`due: ${invoice.dueDate.toLocalDateString()}`);
  }
}