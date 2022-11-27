import { useMemo } from 'react';

import { differenceInYears, differenceInMonths, isValid } from 'date-fns';

import capitalize from 'lodash/capitalize';

const useAnimalAge = (animalBirthday: string, deathDate?: string): string => {
  const currentDate = useMemo(() => (deathDate ? new Date(deathDate) : new Date()), [deathDate]);

  const birthDate = useMemo(() => new Date(animalBirthday), [animalBirthday]);

  const yearsDiff = useMemo(
    () => differenceInYears(currentDate, birthDate),
    [currentDate, birthDate],
  );

  const monthsDiff = useMemo(
    () => differenceInMonths(currentDate, birthDate) - yearsDiff * 12,
    [currentDate, yearsDiff, birthDate],
  );

  const age = useMemo(() => {
    const yearsRes = yearsDiff && (yearsDiff === 1 ? '1 year' : `${yearsDiff} years`);
    const monthsRes = monthsDiff && (monthsDiff === 1 ? '1 month' : `${monthsDiff} month`);

    if (yearsRes) {
      if (monthsRes) return `${yearsRes} and ${monthsRes}`;

      return yearsRes;
    }

    if (monthsRes) return monthsRes;

    return 'less than 1 month';
  }, [monthsDiff, yearsDiff]);

  if (animalBirthday && isValid(birthDate)) return capitalize(`${age} old`);

  return '';
};

export default useAnimalAge;
