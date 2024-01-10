// 对局部变量再赋值

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

/** print details */
function printDetails(invoice, outstanding) {
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
  console.log(`due: ${invoice.dueDate.toLocalDateString()}`);
}

/** recordDueDate */
function recordDueDate(invoice) {
  // Clock.today = Clock Wrapper 封装系统时钟调用的对象。
  const today = Clock.today;
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
}

/** calculate outstanding */
function calculateOutstanding(invoice) {
  let res = 0;
  for (const o of invoice.orders) {
    res += o.amount;
  }

  return res;
}

function printOwing(invoice) {
  printBanner();
  const outstanding = calculateOutstanding(invoice);
  recordDueDate(invoice);
  printDetails(invoice, outstanding);
}



















































































