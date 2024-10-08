"use client";

import { TournamentCard } from "./TournamentCard";
import { Tournament } from "@/types/Tournaments";
import { memo, useState } from "react";

const MAX_SELECTION = 3;

function useTournamentSelection() {
  const [selectedTournaments, setSelectedTournaments] = useState<string[]>([]);

  const toggleTournamentSelection = (tournamentId: string) => {
    setSelectedTournaments((prevSelected) => {
      if (prevSelected.includes(tournamentId)) {
        return prevSelected.filter((id) => id !== tournamentId);
      } else if (prevSelected.length < MAX_SELECTION) {
        return [...prevSelected, tournamentId];
      }
      return prevSelected;
    });
  };

  return { selectedTournaments, toggleTournamentSelection };
}

interface TournamentListProps {
  tournaments: Tournament[];
}

export const TournamentList = memo(function TournamentList({ tournaments }: TournamentListProps) {
  const { selectedTournaments, toggleTournamentSelection } = useTournamentSelection();

  return (
    <>
      {tournaments.map((tournament) => (
        <TournamentCard
          key={tournament.tournamentId}
          tournament={tournament}
          isSelected={selectedTournaments.includes(tournament.tournamentId.toString())}
          toggleTournamentSelection={toggleTournamentSelection}
        />
      ))}
    </>
  );
});
