export interface Tourney {
  name: "1-on-1" | "Smash";
  startDate: Date;
}

/**
 * tourneyAt calculates the tourney at the given date.
 *
 * Reference:
 * - https://www.ssbwiki.com/Online_Tourney
 */
export function tourneyAt(date: Date, offset = 0): Tourney {
  // TODO: Calculate the date the tourney starts.
  return ORIGINAL_TOURNEY;
}

const ORIGINAL_TOURNEY: Tourney = {
  name: "1-on-1",
  startDate: new Date(2019, 6, 31),
};

const TOURNEY_DURATION = 2 * 24 * 60 * 60 * 1_000;
