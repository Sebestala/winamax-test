import Image from "next/image";
import tournaments from "./data/sample-poker.json";
import { TournamentCard } from "@/components/index";

export default function Component() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <main className="flex-1 overflow-y-auto mt-12 mb-16 p-4">
        <div className="w-full max-w-screen-md mx-auto bg-background">
          <Image
            src="/assets/tournois.jpg"
            alt="tournois"
            layout="responsive"
            height={100}
            width={100}
            className="rounded-3xl"
          />
          <div className="space-y-3 mt-3">
            <div className="grid grid-cols-7 font-archivoBold text-textColor px-2 py-1 rounded-lg bg-white">
              <div className="text-xs">Début</div>
              <div className="col-span-2 text-xs pl-4">Nom</div>
              <div className="justify-self-end text-xs">Jeu</div>
              <div className="justify-self-end text-xs">Jrs.</div>
              <div className="justify-self-end text-xs">Buy-in</div>
              <div className="justify-self-end text-xs">Dotation</div>
            </div>
            <TournamentList />
          </div>
        </div>
      </main>
    </div>
  );
}

function TournamentList() {
  return (
    <>
      {tournaments.slice(0, 15).map((tournament) => (
        <TournamentCard
          key={tournament.tournamentId}
          tournament={tournament}
          isSelected={true}
        />
      ))}
    </>
  );
}
