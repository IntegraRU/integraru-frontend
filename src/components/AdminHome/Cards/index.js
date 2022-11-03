import React from "react";
import { Container } from "./style";

function Cards({svg, text}) {
  return (
    <Container>
      <img src={svg} alt="Your SVG" width={46} height={46}/>
      <p>{text}</p>
    </Container>
  );
}

export default Cards;
