import { Tournament } from "@/types/Tournaments";

const ONE_HOUR = 60 * 60 * 1000;

/**
 * Filters a list of tournaments based on budget and compatibility criteria.
 *
 * @param {Tournament[]} tournaments - An array of tournaments to filter.
 * @param {number} minBudget - The minimum budget for the selected tournaments.
 * @param {number} maxBudget - The maximum budget for the selected tournaments.
 * @param {Tournament | null} [selectedTournament=null] - The first selected tournament, if any.
 * @param {Tournament | null} [secondSelectedTournament=null] - The second selected tournament, if any.
 * @returns {Tournament[]} An array of valid tournaments that meet the criteria.
 *
 * Features:
 * - Filters tournaments by ensuring their buy-in amounts are within the specified budget.
 * - Ensures selected tournaments are compatible (i.e., their start dates are at least one hour apart).
 * - Allows for filtering based on one or two selected tournaments, accommodating various selection scenarios.
 * - Sorts the resulting tournaments by their buy-in amounts in ascending order.
 */
export function filterTournaments(
  tournaments: Tournament[],
  minBudget: number,
  maxBudget: number,
  selectedTournament: Tournament | null = null,
  secondSelectedTournament: Tournament | null = null,
) {
  function areCompatible(t1: Tournament, t2: Tournament) {
    const date1 = new Date(t1.startDate);
    const date2 = new Date(t2.startDate);
    return Math.abs(date2.getTime() - date1.getTime()) >= ONE_HOUR;
  }

  let validTournaments: Tournament[] = [];

  if (!selectedTournament && !secondSelectedTournament) {
    validTournaments = tournaments.filter((t) => t.buyIn <= maxBudget);
  } else if (selectedTournament && !secondSelectedTournament) {
    validTournaments = tournaments.filter(
      (t) =>
        t.tournamentId === selectedTournament.tournamentId ||
        (areCompatible(selectedTournament, t) &&
          selectedTournament.buyIn + t.buyIn <= maxBudget),
    );
  } else if (selectedTournament && secondSelectedTournament) {
    const currentTotal =
      selectedTournament.buyIn + secondSelectedTournament.buyIn;
    validTournaments = tournaments.filter(
      (t) =>
        t.tournamentId === selectedTournament.tournamentId ||
        t.tournamentId === secondSelectedTournament.tournamentId ||
        (areCompatible(selectedTournament, t) &&
          areCompatible(secondSelectedTournament, t) &&
          currentTotal + t.buyIn >= minBudget &&
          currentTotal + t.buyIn <= maxBudget),
    );
  }

  validTournaments.sort((a, b) => a.buyIn - b.buyIn);

  return validTournaments;
}
