import "./Card.scss";
import { useEffect, useState } from "react";
import { Quote } from "../../types/types";
import { quotes } from "../../quotes/quotes";
import createQuotes from "../../utils/createQuoteFile";
import { generateColors } from "../../utils/generateColors";
import playIcon from "../../svgs/play-icon.svg";
import pauseIcon from "../../svgs/pause-icon.svg";

let color = 1;
const colors: string[] = generateColors();

function Card(): JSX.Element {
  const quotesList: Quote[] = createQuotes(quotes);
  const root: HTMLElement = document.documentElement;
  let timer: NodeJS.Timeout;
  function randomNumber(quotes: Quote[]): number {
    return Math.floor(Math.random() * quotes.length);
  }

  const [quote, setQuote] = useState<Quote>(
    quotesList[randomNumber(quotesList)]
  );
  const [animate, setAnimate] = useState<string>("");
  const [icon, setIcon] = useState<string>("pause");

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
    }
  }

  function playPause(): void {
    if (icon === "pause") {
      setIcon("play");
    } else {
      setIcon("pause");
      setTimeout(function () {
        getNewQuote();
        transition();
      }, 2000);
    }
  }

  useEffect(
    function (): void {
      setAnimate("");
    },
    [quote]
  );

  useEffect(
    function (): () => void {
      if (icon === "pause") {
        timer = setInterval(function () {
          getNewQuote();
          transition();
        }, 10000);
      }
      return function (): void {
        clearInterval(timer);
      };
    },
    [icon]
  );

  return (
    <div className={`Card ${animate}`}>
      <h1>"{quote.quote}"</h1>
      <h4>- {quote.quoter}</h4>
      <div className="buttons-grid">
        <button className="play-pause" onClick={playPause}>
          <img
            className="icon"
            src={icon === "play" ? playIcon : pauseIcon}
          ></img>
        </button>
        <button
          className="new-quote"
          onClick={function () {
            getNewQuote();
            transition();
            setIcon("play");
          }}
        >
          New Quote
        </button>
      </div>
    </div>
  );
}

export default Card;
