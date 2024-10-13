import Image from "next/image";
import {
  TournamentList,
  TokenAnimation,
  ButtonTournamentsMenu,
} from "@/components/index";
import { cn } from "@/utils/utils";

/**
 * Main component rendering the home page layout with tournaments information and animations.
 *
 * @returns {JSX.Element} The rendered component containing the tournament information, image, and menu button.
 */
export default function Home(): JSX.Element {
  const InfoClass = "justify-self-end text-xs font-archivoBold sm:mr-2";

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <main className="mb-16 mt-11 flex-1 overflow-y-auto p-4" id="home">
        <div className="mx-auto w-full max-w-screen-sm bg-background">
          <TokenAnimation />
          <div className="relative h-40 w-full">
            <Image
              src="/assets/tournois.jpg"
              alt="tournois"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="rounded-2xl object-cover"
              priority
            />
          </div>
          <div className="mt-3 space-y-3">
            <div className="grid grid-cols-6 rounded-lg bg-white px-2 py-1 font-archivoBold text-textColor sm:grid-cols-7">
              <div className="font-archivoBold text-xs">Début</div>
              <div className="pl-4 font-archivoBold text-xs sm:col-span-2">
                Nom
              </div>
              <div className={cn(InfoClass)}>Jeu</div>
              <div className={cn(InfoClass)}>Jrs.</div>
              <div className={cn(InfoClass)}>Buy-in</div>
              <div className={cn(InfoClass)}>Dotation</div>
            </div>
            <TournamentList />
          </div>
          <ButtonTournamentsMenu />
        </div>
      </main>
    </div>
  );
}
