class PerformanceCalculator {
  constructor(aPerformance, play) {
    this.performance = aPerformance;
    this.play = play;
  }

  get amount() {
    throw new Error("subclass responsibility");
  }

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }

  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}

function createPerformanceCalculator(aPerformance, play) {
  switch (play.type) {
    case "tragedy":
      return new TragedyCalculator(aPerformance, play);
    case "comedy":
      return new ComedyCalculator(aPerformance, play);
    default:
      throw new Error(`unknown type: ${play.type}`);
  }
}

export function createStatementData(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount();
  statementData.totalVolumeCredits = totalVolumeCredits();
  return statementData;

  function enrichPerformance(aPerf) {
    const calculator = createPerformanceCalculator(aPerf, playFor(aPerf));
    const result = { ...aPerf };
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function totalAmount() {
    return statementData.performances.reduce((total, p) => total + p.amount, 0);
  }

  function totalVolumeCredits() {
    return statementData.performances.reduce((t, p) => t + p.volumeCredits, 0);
  }
}
