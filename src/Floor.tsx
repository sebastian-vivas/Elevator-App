import React, { useState, useEffect } from "react";
import Elevator from "./Elevator";
import "./styles.css";

const Floor: React.FC<{ totalNumberFloors: number }> = (props) => {
  const floors = [];
  const { totalNumberFloors } = props;
  const [currentFloor, setFloor] = useState(1);
  const [isCounterActive, setIsCounterActive] = useState(false);
  const [requestedFloor, setRequestedFloor] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isCounterActive) {
        if (requestedFloor > currentFloor)
          setFloor((currentFloor) => currentFloor + 1);
        if (requestedFloor < currentFloor)
          setFloor((currentFloor) => currentFloor - 1);
      }
      if (currentFloor === requestedFloor) setIsCounterActive(false);
    }, 250);
    return () => {
      clearInterval(timer);
    };
  });

  for (let i = totalNumberFloors; i >= 1; i--) {
    const floorNumber: number = i;
    const floorKey: string = `Floor ${floorNumber}`;
    floors.push({ key: floorKey, number: floorNumber });
  }

  const handleClick = (floorNumber: number) => {
    setIsCounterActive(true);
    setRequestedFloor(floorNumber);
  };

  return (
    <div className="container">
      <div className="item floor">
        {floors.map((floor) => (
          <>
            <h3 className="floorFont">{floor.key}</h3>
            {floor.number !== totalNumberFloors && (
              <button
                onClick={() => handleClick(floor.number)}
                className="button"
              >
                <div className="up-triangle"></div>
              </button>
            )}
            {floor.number !== 1 && (
              <button
                onClick={() => handleClick(floor.number)}
                className="button"
              >
                <div className="down-triangle"></div>
              </button>
            )}
          </>
        ))}
      </div>
      <Elevator requestedFloor={currentFloor} totalNumberFloors={10} />
    </div>
  );
};

export default Floor;
