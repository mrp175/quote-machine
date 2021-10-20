import "./Card.scss";
import { useEffect, useState } from "react";
import { Quote } from "../../types/types";
import { quotes } from "../../quotes/quotes";
import createQuotes from "../../utils/createQuoteFile";
import { generateColors } from "../../utils/generateColors";
import playIcon from "../../svgs/play-icon.svg";
import pauseIcon from "../../svgs/pause-icon.svg";

let color: number = 1;
const colors: string[] = generateColors();
let transitionTime: number = 1000;
let quoteInterval: number = 10000;
const timeoutTime: number = 2000;
let timer: NodeJS.Timeout;
let timeout: NodeJS.Timeout;

function Card(): JSX.Element {
  const quotesList: Quote[] = createQuotes(quotes);
  const root: HTMLElement = document.documentElement;

  const [quote, setQuote] = useState<Quote>(
    quotesList[randomNumber(quotesList)]
  );
  const [animate, setAnimate] = useState<string>("");
  const [icon, setIcon] = useState<string>("pause");
  const [hidden, setHidden] = useState<string>("hidden");

  function randomNumber(quotes: Quote[]): number {
    return Math.floor(Math.random() * quotes.length);
  }

  function getNewQuote(): void {
    setTimeout(function (): void {
      setQuote(quotesList[randomNumber(quotesList)]);
    }, transitionTime);
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

  function handlePlayPause(): void {
    if (icon === "pause") {
      setIcon("play");
      clearTimeout(timeout);
    } else {
      setIcon("pause");
      timeout = setTimeout(function () {
        root.style.setProperty("--transition-time", "1s");
        getNewQuote();
        transition();
      }, timeoutTime);
    }
  }

  function handleClick(): void {
    clearInterval(timer);
    clearTimeout(timeout);
    transitionTime = 350;
    root.style.setProperty("--transition-time", transitionTime / 1000 + "s");
    getNewQuote();
    transition();
    setIcon("play");
  }

  useEffect(
    function (): void {
      setAnimate("");
      const quoteLength: number = quote.quote.length;
      if (quoteLength < 120) {
        quoteInterval = 10000;
      } else {
        quoteInterval = 10000 + quoteLength * 25;
      }
    },
    [quote]
  );

  useEffect(
    function (): () => void {
      if (icon === "pause") {
        clearInterval(timer);
        transitionTime = 1000;
        timer = setTimeout(function () {
          getNewQuote();
          transition();
        }, quoteInterval);
      }
      return function (): void {
        clearInterval(timer);
      };
    },
    [animate, icon]
  );

  useEffect(function () {
    setHidden("");
  }, []);

  return (
    <div className={`Card ${animate} ${hidden}`}>
      <h1>"{quote.quote}"</h1>
      <h4>- {quote.quoter}</h4>
      <div className="buttons-grid">
        <button className="play-pause" onClick={handlePlayPause}>
          <img
            className="icon"
            src={icon === "play" ? playIcon : pauseIcon}
          ></img>
        </button>
        <button className="new-quote" onClick={handleClick}>
          New Quote
        </button>
      </div>
    </div>
  );
}

export default Card;
