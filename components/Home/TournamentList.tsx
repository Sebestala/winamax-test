"use client";

import { TournamentCard } from "./TournamentCard";
import { memo, useEffect, useRef, useState } from "react";
import tournaments from "@/data/sample-poker.json";
import { useAnimation } from "@/context/AnimationContext";
import { useBudget } from "@/context/BudgetContext";
import { Tournament } from "@/types/Tournaments";
import { filterTournaments } from "@/app/filterTournamentsAlgorithm";

const MAX_SELECTION = 99;
const MAX_SELECTION_TRIPLE_TOURNAMENT = 3;

export const TournamentList = memo(function TournamentList() {
  const [selectedIDs, setSelectedIDs] = useState<number[]>([]);
  const [maxNbTournamentsSelected, setMaxNbTournamentsSelected] =
    useState<number>(MAX_SELECTION);
  const [tournamentsList, setTournamentsList] = useState<Tournament[]>(
    tournaments.slice(0, 20),
  );
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { toggleAnimation } = useAnimation();
  const observerTarget = useRef(null);
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
      } else if (prevSelected.length < maxNbTournamentsSelected) {
        return [...prevSelected, tournamentId];
      }
      return prevSelected;
    });

    if (
      !selectedIDs.includes(tournamentId) &&
      selectedIDs.length < maxNbTournamentsSelected
    ) {
      if (isTripleTournaments) {
        const index = tripleTournamentsList.findIndex(
          (t) => t.tournamentId === tournamentId,
        );
        toggleAnimation(tripleTournamentsList[index].prizepool);
      } else {
        const index = tournaments.findIndex(
          (t) => t.tournamentId === tournamentId,
        );
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

    const loadMoreTripleTournaments = () => {
      const start = tripleTournamentsDisplayed.length;
      const newTournaments = tripleTournamentsList.slice(start, start + 20);
      if (newTournaments.length === 0) {
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
          if (isTripleTournaments) {
            loadMoreTripleTournaments();
          } else {
            loadMoreTournaments();
          }
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
  }, [observerTarget, tournamentsList, tripleTournamentsDisplayed]);

  useEffect(() => {
    if (isTripleTournaments) {
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
      setHasMore(selectedIDs.length !== 3);
    }
  }, [selectedIDs.length]);

  useEffect(() => {
    if (isTripleTournaments) {
      setMaxNbTournamentsSelected(MAX_SELECTION_TRIPLE_TOURNAMENT);
      setSelectedIDs([]);
      const newTripleTournamentsList = filterTournaments(
        dataTripleTournaments,
        minBudget,
        maxBudget,
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
            if (selectedIDs.length === 3 && !isSelected) {
              return <></>;
            }

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
          className="mt-4 flex items-center justify-center"
          ref={observerTarget}
        >
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
        </div>
      )}
    </>
  );
});
