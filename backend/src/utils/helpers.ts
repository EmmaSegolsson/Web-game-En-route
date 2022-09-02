import { Route } from "@typeDef/types";
import cities from "../game/cities";

//Fisher-Yates shuffle algorithm
export const shuffleArray = (array: any[]): any[] => {
  let shuffledArray: any[] = Array.from(array);
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
};

export const firstCap = (word: any): string => {
  try {
    if (typeof word !== "string" || word.length === 0) {
      throw new Error("Not a word");
    }
    return word
      .split("_")
      .map((str: string) => str.charAt(0).toUpperCase() + str.slice(1))
      .join(" ");
  } catch (error) {
    console.error(error);
    return "";
  }
};

export const routeToCities = (route: Route) => {
  const citiesIds = route
    .split("_")
    .map((cityId) => (cityId === "leha" ? "le_ha" : cityId));
  return cities
    .filter(
      (city) => city.startsWith(citiesIds[0]) || city.startsWith(citiesIds[1]),
    )
    .map((city) => firstCap(city));
};
