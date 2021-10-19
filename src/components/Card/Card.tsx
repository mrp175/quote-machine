import "./Card.scss";
import { useEffect, useRef, useState } from "react";
import GetNewQuote from "../../utils/getQuote";

const colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
];

let color = 0;

const root = document.documentElement;

function Card(): JSX.Element {
  const [quote, getQuote] = GetNewQuote();
  const [opacity, setOpacity] = useState("");

  useEffect(function () {
    getQuote();
  }, []);

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
      <h1>{quote.quote}</h1>
      <h4>- {quote.quoter}</h4>
      <div className="buttons-grid">
        <button>twitter</button>
        <button>tumblr</button>
        <button
          className="new-quote"
          onClick={function () {
            getQuote();
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
