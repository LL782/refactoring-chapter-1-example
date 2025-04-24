import { expect, test, describe } from "vitest";
import { statement } from "./statement.mjs";

describe("statement", () => {
  test("generates a statement based on performance data", () => {
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
});
