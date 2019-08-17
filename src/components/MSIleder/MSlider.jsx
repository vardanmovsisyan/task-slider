import React, { useState } from "react";

import classes from "./MSlider.module.scss";

function MSlider(props) {
  const [activeElement, SetActiveElement] = useState(0);
  const [previous, SetPreviousElement] = useState(0);
  const [duration, SetDurationElement] = useState(0);
  const [lastClick, SetLastClickTime] = useState(0);
  const [elements] = useState(props.elements);
  const [animationDuration] = useState(props.duration);

  function multipleClicksCheckPrevent(){
      if (+new Date() - 1000 * 0.65 * animationDuration < lastClick){
          return false;
      }
      return true;
  }
  function handleSlideChange(activeElement,_activeElement) {
      SetPreviousElement(activeElement);
      SetActiveElement(_activeElement);
      SetLastClickTime(+new Date());
      if (typeof props.callback === "function"){
          props.callback(elements.length, _activeElement + 1);
      }
  }
  function slideLeft() {
    if(!multipleClicksCheckPrevent()){
        return false;
    }
    let _activeElement = activeElement;
    if (--_activeElement === -1) {
      _activeElement = elements.length - 1;
    }
    SetDurationElement(0);
    handleSlideChange(activeElement,_activeElement);
  }
  function slideRight() {
    if(!multipleClicksCheckPrevent()){
        return false;
    }
    let _activeElement = activeElement;
    if (++_activeElement === elements.length) {
      _activeElement = 0;
    }
    SetDurationElement(1);
    handleSlideChange(activeElement,_activeElement);
  }

  let activeClassName=duration===0?classes.activeFromLeft:classes.activeFromRight;
  let previousClassName=duration===0?classes.previousLeft:classes.previousRight;

  return (
    <ul className={classes.MSlider}>
      <li onClick={slideLeft} className={classes.slideLeft} data-testid="slideLeftButton">
        {" "}
        {"<"}{" "}
      </li>
      {elements.map((elem, index) => {
        return (
          <li
            style={{ animationDuration: animationDuration + "s" }}
            className={
              classes.elements +
              " " +
              (index === activeElement
                ? activeClassName
                : index === previous
                  ? previousClassName
                  : classes.passive)
            }
            key={index}
            data-testid={(index===activeElement)?'activeElement':'passiveElement-'+index}
          >
            <div className={classes.MImageContainer}>
              <img src={elem} alt="" />
            </div>
          </li>
        );
      })}

      <li onClick={slideRight} className={classes.slideRight} data-testid="slideRightButton">
        {" "}
        {">"}{" "}
      </li>
    </ul>
  );
}

export default MSlider;
