import { assertEquals } from "../../deps.ts";
import { tourneyAt } from "./online_tourney.ts";

Deno.test("tourneyAt", () => {
  const FAKE_DATE_1 = new Date(2023, 11, 1, 0, 0, 0, 0);
  assertEquals(tourneyAt(FAKE_DATE_1).name, "Smash");

  assertEquals(tourneyAt(FAKE_DATE_1, 1).name, "1-on-1");

  const FAKE_DATE_2 = new Date(2023, 11, 2, 0, 0, 0, 0);
  assertEquals(tourneyAt(FAKE_DATE_2).name, "1-on-1");
});
