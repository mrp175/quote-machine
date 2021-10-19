import "./Card.scss";
import { useEffect, useState } from "react";
import { Quote } from "../../types/types";
import { quotes } from "../../quotes/quotes";
import createQuotes from "../../utils/createQuoteFile";

const quotesList: Quote[] = createQuotes(quotes);

const colors = [
  "#735091",
  "#5a5fa8",
  "#3d7692",
  "#518a6e",
  "#797460",
  "#ac5959",
];

let color = 1;

const root = document.documentElement;

function randomNumber(quotes: Quote[]): number {
  return Math.floor(Math.random() * quotes.length);
}

function Card(): JSX.Element {
  const [quote, setQuote] = useState(quotesList[randomNumber(quotesList)]);
  const [opacity, setOpacity] = useState("");

  function getNewQuote() {
    setTimeout(function () {
      setQuote(quotesList[randomNumber(quotesList)]);
    }, 400);
  }

  function transition() {
    setOpacity("fade-out");
    root.style.setProperty("--primary-color", colors[color]);
    if (color === colors.length - 1) {
      color = 0;
    } else {
      color += 1;
    }
  }

  useEffect(
    function () {
      setOpacity("");
    },
    [quote]
  );

  return (
    <div className={`Card ${opacity}`}>
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
