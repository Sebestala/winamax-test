import { format, isToday, isTomorrow } from "date-fns";
import { fr } from "date-fns/locale";
import sinon from "sinon";

let clock: sinon.SinonFakeTimers | null = null;

function simulateDate() {
  const targetDate: Date = new Date(2023, 9, 24);
  if (clock) {
    clock.restore();
  }
  clock = sinon.useFakeTimers(targetDate.getTime());
}

function restoreDate() {
  if (clock) {
    clock.restore();
    clock = null;
  }
}

function formatDate(date: Date): string {
  const timeFormat = format(date, "HH:mm", { locale: fr });
  const oneWeekLater = new Date();
  oneWeekLater.setDate(oneWeekLater.getDate() + 7);

  if (date > oneWeekLater) {
    return format(date, "dd/MM/yyyy", { locale: fr });
  } else if (isToday(date)) {
    return `Auj. ${timeFormat}`;
  } else if (isTomorrow(date)) {
    return `Dem. ${timeFormat}`;
  } else {
    const formattedDate = format(date, "EEE HH:mm", { locale: fr });
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
}

export function formatDateSimulated(date: Date): string {
  simulateDate();
  const formattedDate = formatDate(date);
  restoreDate();
  return formattedDate;
}
