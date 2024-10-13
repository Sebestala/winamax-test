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
      <div className="relative mx-auto w-full max-w-screen-sm">
        {tournament.highlighted && <HighlightCard />}
        <div
          className={cn(
            "relative left-0 right-0 top-0 h-16 cursor-pointer rounded-2xl bg-foreground",
            isSelected ? "outline outline-2 outline-selected" : "",
          )}
          style={{
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.15)",
          }}
          onClick={() => toggleTournamentSelection(tournament.tournamentId)}
        >
          <div className="flex h-full flex-col justify-between">
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
  },
);

function HighlightCard() {
  return (
    <div className="mt-8">
      <div className="absolute -top-5 left-0 right-0 h-16 rounded-2xl bg-secondary px-4">
        <h3 className="font-archivoBold text-sm text-textColor">TOP TOURNOI</h3>
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
    <div className="relative">
      <div className="absolute -left-2 top-1 mx-auto flex w-full max-w-screen-md items-center gap-3">
        <div
          className="rounded-full bg-backgroundDarker px-2.5 py-0.5"
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
          <div className="flex items-center gap-1.5 rounded-xl bg-selected py-0.5 pl-0.5 pr-2">
            <Image src={`/assets/tick.svg`} width={16} height={16} alt="tick" />
            <span className="font-archivoBold leading-none text-selected-foreground">
              IN
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function TournamentInfo({ tournament }: { tournament: Tournament }) {
  return (
    <div className="grid grid-cols-6 items-center justify-center rounded-xl bg-white px-2 py-2 font-archivoBold text-textColor sm:grid-cols-7">
      <span className="flex items-center whitespace-nowrap font-archivoSemiBold text-xs">
        {formatDateSimulated(new Date(tournament.startDate))}
      </span>
      <div className="flex items-center gap-0.5 pl-4 text-xs sm:col-span-2">
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
          "mr-0 rounded-lg bg-backgroundDarker px-1 font-archivoSemiBold text-primary",
        )}
      >
        {tournament.prizepool.toLocaleString("fr-FR")} €
      </span>
    </div>
  );
}
