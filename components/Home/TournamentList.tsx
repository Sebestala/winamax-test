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
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
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

  const toggleTournamentSelection = (index: number) => {
    setSelectedIndexes((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index);
      } else if (prevSelected.length < maxNbTournamentsSelected) {
        return [...prevSelected, index];
      }
      return prevSelected;
    });

    if (!selectedIndexes.includes(index) && selectedIndexes.length < maxNbTournamentsSelected) {
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
          if (isTripleTournaments) {
            const firstSelectedTT = tripleTournamentsList[selectedIndexes?.[0]] || null;
            const secondSelectedTT = tripleTournamentsList[selectedIndexes?.[1]] || null;
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
      setMaxNbTournamentsSelected(MAX_SELECTION_TRIPLE_TOURNAMENT);
      setSelectedIndexes([]);

      const newTripleTournamentsList = filterTournaments(
        dataTripleTournaments,
        null,
        null,
        minBudget,
        maxBudget
      );
      setTripleTournamentsList(newTripleTournamentsList);
      setTripleTournamentsDisplayed(newTripleTournamentsList.slice(0, 20));
      console.log("je suis là");
    } else {
      setMaxNbTournamentsSelected(MAX_SELECTION);
      setSelectedIndexes([]);
    }
  }, [isTripleTournaments, isChangeBudget]);

  return (
    <>
      {isTripleTournaments
        ? tripleTournamentsDisplayed.map((tournament, index) => {
            const isSelected = selectedIndexes.includes(index);
            return (
              <TournamentCard
                key={tournament.tournamentId}
                tournament={tournament}
                isSelected={isSelected}
                toggleTournamentSelection={() => toggleTournamentSelection(index)}
              />
            );
          })
        : tournamentsList.map((tournament, index) => {
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
