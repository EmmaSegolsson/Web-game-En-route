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
