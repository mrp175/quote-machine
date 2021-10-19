function createQuotes(quotes: string) {
  const regex = /.*\n.*\n.*\n\n/g;
  const quotesList = quotes.match(regex) as string[];
  const quotesArray: { quote: string; quoter: string }[] = [];
  for (let quote of quotesList) {
    const split = quote.split(/\n/g);
    quotesArray.push({ quote: split[0], quoter: split[1] });
  }
  return quotesArray;
}

export default createQuotes;
