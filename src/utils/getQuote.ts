import { useState } from "react";
import { QuoteResponse } from "../types/types";

function GetNewQuote() {
  const [quote, setQuote] = useState<QuoteResponse>({
    quote: "",
    quoter: "",
    quoter_key: "",
  });
  async function getQuote(): Promise<void> {
    const response: Response = await fetch(
      "https://game-of-thronesQquotes.p.rapidapi.com/api/quote/random",
      {
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-key":
            "27e74749a3msh080c9003fbc231fp1dc15bjsn7dd9dd2c0902",
          "x-rapidapi-host": "game-of-thrones-quotes.p.rapidapi.com",
        },
      }
    );
    const body: QuoteResponse = await response.json();
    setQuote(body);
  }
  return [quote, getQuote] as const;
}

export default GetNewQuote;
