export interface Tournament {
  tournamentId: number;
  name: string;
  limit: string;
  startDate: string;
  buyIn: number;
  prizepool: number;
  nbPlayers: number;
  flag: string;
  icons: string[];
  highlighted?: boolean;
}
