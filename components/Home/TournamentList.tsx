"use client";

import { TournamentCard } from "./TournamentCard";
import { memo, useEffect, useRef, useState } from "react";
import tournaments from "@/data/sample-poker.json";
import { useAnimation } from "@/context/AnimationContext";
import { Tournament } from "@/types/Tournaments";

const MAX_SELECTION = 99;

/**
 * TournamentList component renders a list of poker tournaments with infinite scrolling,
 * allowing users to select multiple tournaments.
 *
 * @returns {JSX.Element} The rendered TournamentList component.
 *
 * Features:
 * - Triggers animations based on the prize pool of the selected tournament.
 */
export const TournamentList = memo(function TournamentList() {
  const [selectedIDs, setSelectedIDs] = useState<number[]>([]);
  const [tournamentsList, setTournamentsList] = useState<Tournament[]>(
    tournaments.slice(0, 20),
  );
  const { toggleAnimation } = useAnimation();
  const observerTarget = useRef(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const toggleTournamentSelection = (tournamentId: number) => {
    setSelectedIDs((prevSelected) => {
      if (prevSelected.includes(tournamentId)) {
        return prevSelected.filter((i) => i !== tournamentId);
      } else if (prevSelected.length < MAX_SELECTION) {
        return [...prevSelected, tournamentId];
      }
      return prevSelected;
    });

    if (
      !selectedIDs.includes(tournamentId) &&
      selectedIDs.length < MAX_SELECTION
    ) {
      const index = tournaments.findIndex(
        (t) => t.tournamentId === tournamentId,
      );
      toggleAnimation(tournaments[index].prizepool);
    }
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
      { threshold: 1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, tournamentsList]);

  return (
    <>
      {tournamentsList.map((t) => {
        const isSelected = selectedIDs.includes(t.tournamentId);
        return (
          <TournamentCard
            key={t.tournamentId}
            tournament={t}
            isSelected={isSelected}
            toggleTournamentSelection={toggleTournamentSelection}
          />
        );
      })}

      {hasMore && (
        <div
          className="mt-4 flex items-center justify-center"
          ref={observerTarget}
        >
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
        </div>
      )}
    </>
  );
});
