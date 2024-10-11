import { Tournament } from "@/types/Tournaments";

const ONE_HOUR_IN_MS = 60 * 60 * 1000;

export function filterTournaments(
  baseTournaments: Tournament[],
  firstSelectedTT: Tournament | null,
  secondSelectedTT: Tournament | null,
  minBudget: number,
  maxBudget: number
) {
  const tournamentSortedByDate = baseTournaments.sort((a, b) => {
    const dateDiff = new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    return dateDiff !== 0 ? dateDiff : a.buyIn - b.buyIn;
  });

  const validTournaments = [];
  console.log("0");
  console.log("firstSelectedTT = ", firstSelectedTT ? firstSelectedTT : null);

  if (!firstSelectedTT && !secondSelectedTT) {
    for (let i = 0; i < tournamentSortedByDate.length; i++) {
      const tournament = tournamentSortedByDate[i];

      if (tournament.buyIn < maxBudget) {
        validTournaments.push(tournament);
      }
    }
  } else if (firstSelectedTT && !secondSelectedTT) {
    for (let i = 0; i < tournamentSortedByDate.length; i++) {
      const t = tournamentSortedByDate[i];
      console.log("2");
      if (t.tournamentId === firstSelectedTT.tournamentId) validTournaments.push(t);
      const dateDiff = Math.abs(
        new Date(t.startDate).getTime() - new Date(firstSelectedTT.startDate).getTime()
      );
      console.log(firstSelectedTT.startDate);
      console.log("hello");

      if (dateDiff >= ONE_HOUR_IN_MS && t.buyIn <= maxBudget) {
        validTournaments.push(t);
      }
    }
  } else if (firstSelectedTT && secondSelectedTT) {
    for (let i = 0; i < tournamentSortedByDate.length; i++) {
      const t = tournamentSortedByDate[i];
      if (
        t.tournamentId === firstSelectedTT.tournamentId ||
        t.tournamentId === secondSelectedTT.tournamentId
      )
        validTournaments.push(t);

      const dateDiff = Math.abs(
        new Date(t.startDate).getTime() - new Date(secondSelectedTT.startDate).getTime()
      );
      const totalBuyIn = firstSelectedTT.buyIn + secondSelectedTT.buyIn + t.buyIn;
      if (dateDiff >= ONE_HOUR_IN_MS && totalBuyIn <= maxBudget && totalBuyIn >= minBudget) {
        validTournaments.push(t);
      }
    }
  }

  return validTournaments;
}
