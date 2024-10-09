"use client";

import { TournamentCard } from "./TournamentCard";
import { Tournament } from "@/types/Tournaments";
import { memo, useEffect, useState } from "react";
import tournaments from "@/data/sample-poker.json";

const MAX_SELECTION = 3;

export const TournamentList = memo(function TournamentList() {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [remainingTournaments, setRemainingTournaments] = useState<Tournament[]>([]);
  const initialTournaments = tournaments.slice(0, 20);

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

  useEffect(() => {
    const loadMoreTournaments = () => {
      setRemainingTournaments((prevTournaments) => [
        ...prevTournaments,
        ...tournaments.slice(prevTournaments.length + 20, prevTournaments.length + 17),
      ]);
    };

    const interval = setInterval(loadMoreTournaments, 3000);

    return () => clearInterval(interval);
  }, []);

  const allTournaments = [...initialTournaments, ...remainingTournaments];

  return (
    <>
      {allTournaments.map((tournament, index) => {
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
