import { expect, test, describe } from "vitest";
import { htmlStatement, statement } from "./statement.mjs";

const invoice = {
  customer: "BigCo",
  performances: [
    {
      playID: "asYouLikeIt",
      audience: 35,
    },
    {
      playID: "othello",
      audience: 40,
    },
    {
      playID: "hamlet",
      audience: 55,
    },
  ],
};

const plays = {
  asYouLikeIt: { name: "As You Like It", type: "comedy" },
  hamlet: { name: "Hamlet", type: "tragedy" },
  othello: { name: "Othello", type: "tragedy" },
};

describe("statement", () => {
  test("generates a statement based on performance data", () => {
    expect(statement(invoice, plays)).toMatchInlineSnapshot(`
      "Statement for BigCo
        As You Like It: $580.00 (35 seats)
        Othello: $500.00 (40 seats)
        Hamlet: $650.00 (55 seats)
      Amount owed is $1,730.00
      You earned 47 credits
      "
    `);
  });

  test("generates an HTML statement based on performance data", () => {
    expect(htmlStatement(invoice, plays)).toMatchInlineSnapshot(`
      "<h1>Statement for BigCo</h1>
      <table>
      <tr><th>play</th><th>seats</th><th>cost</th></tr>  <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>
        <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>
        <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>
      </table>
      <p>Amount owed is <em>$1,730.00</em></p>
      <p>You earned <em>47</em> credits</p>
      "
    `);
  });
});
