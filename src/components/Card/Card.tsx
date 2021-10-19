import "./Card.scss";
import { useEffect, useState } from "react";
import { Quote } from "../../types/types";
import { quotes } from "../../quotes/quotes";
import createQuotes from "../../utils/createQuoteFile";
import { generateColors } from "../../utils/generateColors";

let color = 1;
const colors: string[] = generateColors();

function Card(): JSX.Element {
  const quotesList: Quote[] = createQuotes(quotes);

  const root: HTMLElement = document.documentElement;

  function randomNumber(quotes: Quote[]): number {
    return Math.floor(Math.random() * quotes.length);
  }

  const [quote, setQuote] = useState<Quote>(
    quotesList[randomNumber(quotesList)]
  );
  const [animate, setAnimate] = useState<string>("");

  function getNewQuote(): void {
    setTimeout(function (): void {
      setQuote(quotesList[randomNumber(quotesList)]);
    }, 400);
  }

  function transition(): void {
    setAnimate("fade-out");
    root.style.setProperty("--primary-color", colors[color]);
    if (color === colors.length - 1) {
      color = 0;
    } else {
      color += 1;
      console.log(colors, color);
    }
  }

  useEffect(
    function (): void {
      setAnimate("");
    },
    [quote]
  );

  return (
    <div className={`Card ${animate}`}>
      <h1>"{quote.quote}"</h1>
      <h4>- {quote.quoter}</h4>
      <div className="buttons-grid">
        <button
          className="new-quote"
          onClick={function () {
            getNewQuote();
            transition();
          }}
        >
          New Quote
        </button>
      </div>
    </div>
  );
}

export default Card;
