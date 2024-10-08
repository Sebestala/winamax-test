"use client";

import { TournamentCard } from "./TournamentCard";
import { Tournament } from "@/types/Tournaments";
import { memo, useState } from "react";

const MAX_SELECTION = 3;
interface TournamentListProps {
  tournaments: Tournament[];
}

export const TournamentList = memo(function TournamentList({ tournaments }: TournamentListProps) {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  const toggleTournamentSelection = (index: number) => {
    setSelectedIndexes((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index);
      } else if (prevSelected.length < MAX_SELECTION) {
        return [...prevSelected, index];
      }
      return prevSelected;
    });
  };

  return (
    <>
      {tournaments.map((tournament, index) => {
        const isSelected = selectedIndexes.includes(index);
        return (
          <TournamentCard
            key={tournament.tournamentId}
            tournament={tournament}
            isSelected={isSelected}
            toggleTournamentSelection={() => toggleTournamentSelection(index)}
          />
        );
      })}
    </>
  );
});
