import { memo } from "react";
import Image from "next/image";
import { Tournament } from "@/types/Tournaments";
import { formatDateSimulated } from "@/utils/date";
import { cn } from "@/utils/utils";

const InfoClass = "justify-self-end text-xs font-archivo sm:mr-2";

interface TournamentCardProps {
  tournament: Tournament;
  isSelected: boolean;
  toggleTournamentSelection: (tournamentId: number) => void;
}

export const TournamentCard = memo(
  function TournamentCard({
    tournament,
    isSelected,
    toggleTournamentSelection,
  }: TournamentCardProps) {
    return (
      <div className="w-full max-w-screen-sm mx-auto relative">
        {tournament.highlighted && <HighlightCard />}
        <div
          className={cn(
            "bg-foreground rounded-2xl h-16 relative top-0 left-0 right-0 cursor-pointer",
            isSelected ? "outline outline-2 outline-selected" : ""
          )}
          style={{
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.15)",
          }}
          onClick={() => toggleTournamentSelection(tournament.tournamentId)}
        >
          <div className="flex flex-col justify-between h-full">
            <FlagAndNameAndSelectedIcon
              flag={tournament.flag}
              name={tournament.name}
              isSelected={isSelected}
            />
            <TournamentInfo tournament={tournament} />
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.isSelected === nextProps.isSelected &&
      prevProps.tournament.tournamentId === nextProps.tournament.tournamentId
    );
  }
);

function HighlightCard() {
  return (
    <div className="mt-8">
      <div className="bg-secondary px-4 rounded-2xl h-16 absolute -top-5 left-0 right-0">
        <h3 className="text-textColor font-archivoBold text-sm">TOP TOURNOI</h3>
      </div>
    </div>
  );
}

function FlagAndNameAndSelectedIcon({
  flag,
  name,
  isSelected,
}: {
  flag: string;
  name: string;
  isSelected: boolean;
}) {
  return (
    <div className="relative ">
      <div className="absolute w-full max-w-screen-md mx-auto top-1 -left-2 flex items-center gap-3">
        <div
          className="bg-backgroundDarker rounded-full px-2.5 py-0.5"
          style={{
            boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Image
            src={`/assets/flags/${flag}.png`}
            width={20}
            height={20}
            alt={`${flag} flag`}
            className="rounded-md"
          />
        </div>
        <h2 className="flex-1 font-archivoBold text-lg">{name}</h2>
        {isSelected && (
          <div className="flex items-center gap-1.5 bg-selected rounded-xl pl-0.5 pr-2 py-0.5">
            <Image
              src={`/assets/tick.svg`}
              width={16}
              height={16}
              alt="tick"
            />
            <span className="font-archivoBold text-selected-foreground leading-none">IN</span>
          </div>
        )}
      </div>
    </div>
  );
}

function TournamentInfo({ tournament }: { tournament: Tournament }) {
  return (
    <div className="grid grid-cols-6 sm:grid-cols-7 font-archivoBold text-textColor px-2 py-2 rounded-xl bg-white items-center justify-center">
      <span className="flex items-center font-archivoSemiBold text-xs whitespace-nowrap">
        {formatDateSimulated(new Date(tournament.startDate))}
      </span>
      <div className="sm:col-span-2 text-xs pl-4 flex items-center gap-0.5">
        {tournament.icons.map((icon) => (
          <Image
            key={icon}
            src={`/assets/icons/${icon}.png`}
            width={12}
            height={12}
            alt={`${icon} icon`}
            className="rounded-sm"
          />
        ))}
      </div>
      <span className={cn(InfoClass)}>{tournament.limit}</span>
      <span className={cn(InfoClass)}>{tournament.nbPlayers}</span>
      <span className={cn(InfoClass)}>{tournament.buyIn} €</span>
      <span
        className={cn(
          InfoClass,
          "font-archivoSemiBold text-primary bg-backgroundDarker rounded-lg px-1 mr-0"
        )}
      >
        {tournament.prizepool.toLocaleString("fr-FR")} €
      </span>
    </div>
  );
}
