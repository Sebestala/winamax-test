import { Tournament } from "@/types/Tournaments";

export function filterTournaments(
  tournaments: Tournament[],
  minBudget: number,
  maxBudget: number,
  selectedTournament: Tournament | null = null,
  secondSelectedTournament: Tournament | null = null,
) {
  // Helper function to check if two tournaments are compatible (at least 1 hour apart)
  function areCompatible(t1: Tournament, t2: Tournament) {
    const date1 = new Date(t1.startDate);
    const date2 = new Date(t2.startDate);
    return Math.abs(date2.getTime() - date1.getTime()) >= 60 * 60 * 1000; // 1 hour in milliseconds
  }

  let validTournaments: Tournament[] = [];

  if (!selectedTournament && !secondSelectedTournament) {
    // Simply filter out tournaments that are too expensive

    validTournaments = tournaments.filter((t) => t.buyIn <= maxBudget);
  } else if (selectedTournament && !secondSelectedTournament) {
    // Find compatible tournaments within budget
    validTournaments = tournaments.filter(
      (t) =>
        t.tournamentId === selectedTournament.tournamentId ||
        (areCompatible(selectedTournament, t) &&
          selectedTournament.buyIn + t.buyIn <= maxBudget),
    );
  } else if (selectedTournament && secondSelectedTournament) {
    // Find compatible tournaments to complete the triplet
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

  // Sort by buy-in (ascending)
  validTournaments.sort((a, b) => a.buyIn - b.buyIn);

  return validTournaments;
}
