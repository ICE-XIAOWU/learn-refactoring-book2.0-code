function statement(invoice, plays) {
  let result = `Statement for ${invoice.customer}\n`;

  function usd(aNumber) {
    // Intl.NumberFormat 用於格式化數字，將其轉換為貨幣格式-可以設置為各個國家的貨幣格式
    return new Intl.NumberFormat("en-US",{ 
      style: "currency", 
      currency: "USD",
      minimumFractionDigits: 2 
    }).format(aNumber / 100);
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID]
  }

  function amountFor(aPerformance) {
    let result = 0;
    switch (playFor(aPerformance).type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience -30);
        }
        break;
      case "comedy": 
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience -20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    } 
  
    return result;
  }
  
  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience -30, 0);
    if ("comedy" === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5);
    return result;
  }

  function totalVolumeCredits() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }

  function totalAmount() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += amountFor(perf);
    }
    return result;
  }

  for (let perf of invoice.performances) {
    // print line for this order
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${usd(totalAmount())}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;
}

const invoices = require('./json/invoices.json');
const plays = require('./json/plays.json');

console.log(statement(invoices[0], plays))