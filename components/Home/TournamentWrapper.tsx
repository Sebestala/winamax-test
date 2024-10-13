"use client";

import { useBudget } from "@/context/BudgetContext";
import { TripleTournamentList } from "./TripleTournamentList";
import { TournamentList } from "./TournamentList";

/**
 * TournamentWrapper component conditionally renders either the TripleTournamentList
 * or the TournamentList based on the `isTripleTournaments` flag from the BudgetContext.
 *
 * @returns {JSX.Element} The rendered TournamentWrapper component.
 *
 * Features:
 * - Switches between two different tournament list views (triple or regular tournaments).
 */
export const TournamentWrapper = function TournamentWrapper(): JSX.Element {
  const { isTripleTournaments } = useBudget();

  return (
    <>{isTripleTournaments ? <TripleTournamentList /> : <TournamentList />}</>
  );
};
