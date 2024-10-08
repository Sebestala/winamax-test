import Image from "next/image";
import { TournamentList } from "@/components/index";
import { cn } from "@/lib/utils";

const InfoClass = "justify-self-end text-xs font-archivoBold mr-2";

export default function Component() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <main className="flex-1 overflow-y-auto mt-11 mb-16 p-4">
        <div className="w-full max-w-screen-md mx-auto bg-background">
          <div className="relative w-full h-40">
            <Image
              src="/assets/tournois.jpg"
              alt="tournois"
              fill
              className="rounded-2xl object-cover"
            />
          </div>
          <div className="space-y-3 mt-3">
            <div className="grid grid-cols-7 font-archivoBold text-textColor px-2 py-1 rounded-lg bg-white">
              <div className="text-xs font-archivoBold">Début</div>
              <div className="col-span-2 text-xs font-archivoBold pl-4">Nom</div>
              <div className={cn(InfoClass)}>Jeu</div>
              <div className={cn(InfoClass)}>Jrs.</div>
              <div className={cn(InfoClass)}>Buy-in</div>
              <div className={cn(InfoClass)}>Dotation</div>
            </div>
            <TournamentList />
          </div>
        </div>
      </main>
    </div>
  );
}
