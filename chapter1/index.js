import invoices from './json/invoices.json' assert { type: 'json' };
import plays from './json/plays.json' assert { type: 'json' };
import createStatementData from './createStatementData.js';

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    // print line for this order
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
}

function usd(aNumber) {
  // Intl.NumberFormat 用於格式化數字，將其轉換為貨幣格式-可以設置為各個國家的貨幣格式
  return new Intl.NumberFormat("en-US",{ 
    style: "currency", 
    currency: "USD",
    minimumFractionDigits: 2, 
  }).format(aNumber / 100);
}

// HTML版本账单
function htmlStatement(invoices, plays) {
  return renderHtml(createStatementData(invoices, plays));
}

function renderHtml(data) {
  let result = `<h1>Statement for ${data.customer}</h1>\n`;

  result += `<table>\n`;
  result += '<tr><th>play</th><th>seats</th><th>cost</th></tr>';
  for (let perf of data.performances) {
    result += `<td>${perf.play.name}</td><td>${perf.audience}</td>`;
    result += `<td>${usd(perf.amount)}</td></tr>\n`;
  }
  result += "</table>\n";
  result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
  return result;
}

console.log(htmlStatement(invoices[0], plays));
