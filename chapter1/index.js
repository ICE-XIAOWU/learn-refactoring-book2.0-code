import invoices from './json/invoices.json' assert { type: 'json' };
import plays from './json/plays.json' assert { type: 'json' };
import createStatementData from './createStatementData.js';

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;

  function usd(aNumber) {
    // Intl.NumberFormat 用於格式化數字，將其轉換為貨幣格式-可以設置為各個國家的貨幣格式
    return new Intl.NumberFormat("en-US",{ 
      style: "currency", 
      currency: "USD",
      minimumFractionDigits: 2, 
    }).format(aNumber / 100);
  }

  for (let perf of data.performances) {
    // print line for this order
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
}

console.log(statement(invoices[0], plays))