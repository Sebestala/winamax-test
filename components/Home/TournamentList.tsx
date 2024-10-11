"use client";

import { TournamentCard } from "./TournamentCard";
import { memo, useEffect, useRef, useState } from "react";
import tournaments from "@/data/sample-poker.json";
import { useAnimation } from "@/context/AnimationContext";
import { useBudget } from "@/context/BudgetContext";
import { Tournament } from "@/types/Tournaments";
import { filterTournaments } from "@/app/filter-tournaments-algorithm";

const MAX_SELECTION = 99;
const MAX_SELECTION_TRIPLE_TOURNAMENT = 3;

export const TournamentList = memo(function TournamentList() {
  const [selectedIDs, setSelectedIDs] = useState<number[]>([]);
  const [maxNbTournamentsSelected, setMaxNbTournamentsSelected] = useState<number>(MAX_SELECTION);
  const [tournamentsList, setTournamentsList] = useState<Tournament[]>(tournaments.slice(0, 20));
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { toggleAnimation } = useAnimation();
  const observerTarget = useRef(null);
  // Triple Tournament
  const { isTripleTournaments, minBudget, maxBudget, isChangeBudget } = useBudget();
  const dataTripleTournaments: Tournament[] = tournaments.slice(0, 350);
  const [tripleTournamentsList, setTripleTournamentsList] = useState<Tournament[]>([]);
  const [tripleTournamentsDisplayed, setTripleTournamentsDisplayed] = useState<Tournament[]>([]);

  const toggleTournamentSelection = (tournamentId: number) => {
    setSelectedIDs((prevSelected) => {
      if (prevSelected.includes(tournamentId)) {
        return prevSelected.filter((i) => i !== tournamentId);
      } else if (prevSelected.length < maxNbTournamentsSelected) {
        return [...prevSelected, tournamentId];
      }
      return prevSelected;
    });
    console.log(selectedIDs);

    if (!selectedIDs.includes(tournamentId) && selectedIDs.length < maxNbTournamentsSelected) {
      if (isTripleTournaments) {
        const index = tripleTournamentsList.findIndex((t) => t.tournamentId === tournamentId);
        toggleAnimation(tripleTournamentsList[index].prizepool);
      } else {
        const index = tournaments.findIndex((t) => t.tournamentId === tournamentId);
        toggleAnimation(tournaments[index].prizepool);
      }
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
          if (isTripleTournaments) {
            const firstSelectedTT = tripleTournamentsList[selectedIDs?.[0]] || null;
            const secondSelectedTT = tripleTournamentsList[selectedIDs?.[1]] || null;
            const newTripleTournamentsList = filterTournaments(
              dataTripleTournaments,
              firstSelectedTT,
              secondSelectedTT,
              minBudget,
              maxBudget
            );
            setTripleTournamentsDisplayed((prev) => [
              ...prev,
              ...newTripleTournamentsList.slice(prev.length, prev.length + 20),
            ]);
          } else {
            loadMoreTournaments();
          }
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

  useEffect(() => {
    if (isTripleTournaments) {
      const firstSelectedTT = tripleTournamentsDisplayed[selectedIDs?.[0]] || null;
      const secondSelectedTT = tripleTournamentsDisplayed[selectedIDs?.[1]] || null;
      const newTripleTournamentsList = filterTournaments(
        dataTripleTournaments,
        firstSelectedTT,
        secondSelectedTT,
        minBudget,
        maxBudget
      );
      setTripleTournamentsList(newTripleTournamentsList);
      setTripleTournamentsDisplayed(newTripleTournamentsList.slice(0, 20));
    }
  }, [selectedIDs.length]);

  useEffect(() => {
    if (isTripleTournaments) {
      setMaxNbTournamentsSelected(MAX_SELECTION_TRIPLE_TOURNAMENT);
      setSelectedIDs([]);
      const newTripleTournamentsList = filterTournaments(
        dataTripleTournaments,
        null,
        null,
        minBudget,
        maxBudget
      );
      setTripleTournamentsList(newTripleTournamentsList);
      setTripleTournamentsDisplayed(newTripleTournamentsList.slice(0, 20));
    } else {
      setMaxNbTournamentsSelected(MAX_SELECTION);
      setSelectedIDs([]);
    }
  }, [isTripleTournaments, isChangeBudget]);

  return (
    <>
      {isTripleTournaments
        ? tripleTournamentsDisplayed.map((t) => {
            const isSelected = selectedIDs.includes(t.tournamentId);
            return (
              <TournamentCard
                key={t.tournamentId}
                tournament={t}
                isSelected={isSelected}
                toggleTournamentSelection={toggleTournamentSelection}
              />
            );
          })
        : tournamentsList.map((t) => {
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
          className="flex justify-center items-center mt-4"
          ref={observerTarget}
        >
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
    </>
  );
});
