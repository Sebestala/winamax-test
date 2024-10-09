"use client";

import { TournamentCard } from "./TournamentCard";
import { memo, useEffect, useRef, useState } from "react";
import tournaments from "@/data/sample-poker.json";
import { useAnimation } from "@/context/AnimationContext";

const MAX_SELECTION = 3;

export const TournamentList = memo(function TournamentList() {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [tournamentsList, setTournamentsList] = useState(tournaments.slice(0, 20));
  const [hasMore, setHasMore] = useState(true);
  const { toggleAnimation } = useAnimation();
  const observerTarget = useRef(null);

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
      const start = tournamentsList.length;
      const newTournaments = tournaments.slice(start, start + 20);
      if (newTournaments.length === 0) {
        setHasMore(false);
      } else {
        setTournamentsList([...tournamentsList, ...newTournaments]);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreTournaments();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, tournamentsList]);

  return (
    <>
      {tournamentsList.map((tournament, index) => {
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

      {hasMore && (
        <div
          className="flex justify-center items-center mt-4"
          ref={observerTarget}
        >
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
    </>
  );
});
