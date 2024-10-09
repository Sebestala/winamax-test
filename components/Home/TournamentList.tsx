"use client";

import { TournamentCard } from "./TournamentCard";
import { Tournament } from "@/types/Tournaments";
import { memo, useEffect, useState } from "react";
import tournaments from "@/data/sample-poker.json";
import { useAnimation } from "@/context/AnimationContext";

const MAX_SELECTION = 3;

export const TournamentList = memo(function TournamentList() {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [remainingTournaments, setRemainingTournaments] = useState<Tournament[]>([]);
  const initialTournaments = tournaments.slice(0, 20);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toggleAnimation } = useAnimation();

  const toggleTournamentSelection = (index: number) => {
    setSelectedIndexes((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index);
      } else if (prevSelected.length < MAX_SELECTION) {
        toggleAnimation();
        return [...prevSelected, index];
      }
      return prevSelected;
    });
  };

  useEffect(() => {
    const loadMoreTournaments = () => {
      setIsLoading(true);
      setRemainingTournaments((prevTournaments) => {
        const newTournaments = tournaments.slice(
          prevTournaments.length + 20,
          prevTournaments.length + 170
        );
        setIsLoading(newTournaments.length > 0);
        return [...prevTournaments, ...newTournaments];
      });
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
      {isLoading && (
        <div className="flex justify-center items-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
    </>
  );
});
