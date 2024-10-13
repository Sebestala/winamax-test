/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { TournamentCard } from "./TournamentCard";
import { memo, useEffect, useRef, useState } from "react";
import tournaments from "@/data/sample-poker.json";
import { useAnimation } from "@/context/AnimationContext";
import { useBudget } from "@/context/BudgetContext";
import { Tournament } from "@/types/Tournaments";
import { filterTournaments } from "@/app/filterTournamentsAlgorithm";

const MAX_SELECTION_TRIPLE_TOURNAMENT = 3;

/**
 * TripleTournamentList component renders a list of triplet poker tournaments with infinite
 * scrolling and allows the user to select up to three tournaments for triple tournaments.
 *
 * @returns {JSX.Element} The rendered TripleTournamentList component.
 *
 * Features:
 * - Allows selection of up to three tournaments, triggering animations on selection.
 * - Filters the tournaments dynamically based on budget and selections.
 * - Automatically resets the tournament list when budget or tournament type changes.
 */
export const TripleTournamentList = memo(function TripleTournamentList() {
  const [selectedIDs, setSelectedIDs] = useState<number[]>([]);
  const { toggleAnimation } = useAnimation();
  const observerTarget = useRef(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  // Triple Tournament
  const { isTripleTournaments, minBudget, maxBudget, isChangeBudget } =
    useBudget();
  const dataTripleTournaments: Tournament[] = tournaments.slice(0, 350);
  const [tripleTournamentsList, setTripleTournamentsList] = useState<
    Tournament[]
  >([]);
  const [tripleTournamentsDisplayed, setTripleTournamentsDisplayed] = useState<
    Tournament[]
  >([]);

  const toggleTournamentSelection = (tournamentId: number) => {
    setSelectedIDs((prevSelected) => {
      if (prevSelected.includes(tournamentId)) {
        return prevSelected.filter((i) => i !== tournamentId);
      } else if (prevSelected.length < MAX_SELECTION_TRIPLE_TOURNAMENT) {
        return [...prevSelected, tournamentId];
      }
      return prevSelected;
    });

    if (
      !selectedIDs.includes(tournamentId) &&
      selectedIDs.length < MAX_SELECTION_TRIPLE_TOURNAMENT
    ) {
      const index = tripleTournamentsList.findIndex(
        (t) => t.tournamentId === tournamentId,
      );
      toggleAnimation(tripleTournamentsList[index].prizepool);
    }
  };

  useEffect(() => {
    const loadMoreTripleTournaments = () => {
      const start = tripleTournamentsDisplayed.length;

      const newTournaments = tripleTournamentsList.slice(start, start + 20);
      if (
        newTournaments.length === 0 &&
        tripleTournamentsDisplayed.length > 20
      ) {
        setHasMore(false);
      } else {
        setTripleTournamentsDisplayed([
          ...tripleTournamentsDisplayed,
          ...newTournaments,
        ]);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreTripleTournaments();
        }
      },
      { threshold: 1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, tripleTournamentsDisplayed]);

  useEffect(() => {
    if (selectedIDs.length === 3) {
      setHasMore(false);
      return;
    }

    let firstSelectedTT: Tournament | null = null;
    if (selectedIDs.length > 0) {
      firstSelectedTT =
        tripleTournamentsDisplayed.find(
          (t) => t.tournamentId === selectedIDs[0],
        ) || null;
    }
    let secondSelectedTT: Tournament | null = null;
    if (selectedIDs.length > 1) {
      secondSelectedTT =
        tripleTournamentsDisplayed.find(
          (t) => t.tournamentId === selectedIDs[1],
        ) || null;
    }

    const newTripleTournamentsList = filterTournaments(
      dataTripleTournaments,
      minBudget,
      maxBudget,
      firstSelectedTT,
      secondSelectedTT,
    );

    setTripleTournamentsList(newTripleTournamentsList);
    setTripleTournamentsDisplayed(newTripleTournamentsList.slice(0, 20));
    setHasMore(true);
  }, [selectedIDs.length]);

  useEffect(() => {
    setSelectedIDs([]);
    const newTripleTournamentsList = filterTournaments(
      dataTripleTournaments,
      minBudget,
      maxBudget,
    );

    setTripleTournamentsList(newTripleTournamentsList);
    setTripleTournamentsDisplayed(newTripleTournamentsList.slice(0, 20));
  }, [isTripleTournaments, isChangeBudget]);

  return (
    <>
      {selectedIDs.length === 3
        ? dataTripleTournaments
            .filter((t) => selectedIDs.includes(t.tournamentId))
            .map((t) => (
              <TournamentCard
                key={t.tournamentId}
                tournament={t}
                isSelected={true}
                toggleTournamentSelection={toggleTournamentSelection}
              />
            ))
        : tripleTournamentsDisplayed.map((t) => {
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
