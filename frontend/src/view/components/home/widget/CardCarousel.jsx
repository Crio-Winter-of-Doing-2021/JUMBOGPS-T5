import React from "react";
import "./styles.scss";
import { Card, Button } from "react-bootstrap";

const CardCarousel = () => {
  const range = (lowEnd, end) => {
    let result = [];
    for (let i = lowEnd; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  const itemCount = 18;
  const itemsPerSection = 4;
  const sectionCount = Math.ceil(itemCount / itemsPerSection);
  console.log(sectionCount);
  const calcRange = (sid) =>
    range(
      sid * itemsPerSection,
      Math.min((sid + 1) * itemsPerSection, itemCount)
    );
  return (
    <div className="wrapper">
      {range(0, sectionCount).map((sid) => (
        <section id={sid}>
          <a href={`#${sid - 1}`} className="arrow__btn">
            {sid > 0 ? "‹" : null}
          </a>
          {calcRange(sid).map((id) => (
            <div className="item" key={id}>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
              <h1>{id}</h1>
            </div>
          ))}
          <a href={`#${sid + 1}`} className="arrow__btn">
            {sid < sectionCount - 1 ? "›" : null}
          </a>
        </section>
      ))}
    </div>
  );
};

export default CardCarousel;
