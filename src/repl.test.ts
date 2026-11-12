import { cleanInput } from "./repl.js";
import { describe, expect, test } from "vitest";

describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "CHARMANDER is better than bulbasaur.",
    expected: ["charmander", "is", "better", "than", "bulbasaur."],
  },
  {
    input: "Pikachu is kinda mean to ash.",
    expected: ["pikachu", "is", "kinda", "mean", "to", "ash."],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);

    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});