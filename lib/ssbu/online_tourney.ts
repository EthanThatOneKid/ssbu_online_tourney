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
  // Calculate the date the tourney starts.
  const tourneyNumber = Math.floor(
    (date.getTime() - ORIGINAL_TOURNEY.startDate.getTime()) /
      TOURNEY_DURATION,
  ) + offset;
  const startDate = new Date(
    ORIGINAL_TOURNEY.startDate.getTime() + tourneyNumber * TOURNEY_DURATION,
  );
  return {
    startDate,
    name: tourneyNumber % 2 === 0 ? "1-on-1" : "Smash",
  };
}

const ORIGINAL_TOURNEY: Tourney = {
  name: "1-on-1",
  startDate: new Date(2019, 6, 31, 6, 0, 0, 0),
};

const TOURNEY_DURATION = 2 * 24 * 60 * 60 * 1_000;
