import React from "react";
import "./styles.css";

const ElevatorButtons: React.FC<{
  floors: { key: string; number: number }[];
  isElevatorOpen: boolean;
  totalNumberFloors: number;
  requestUpElevator: (floorNumber: number) => void;
  requestDownElevator: (floorNumber: number) => void;
  selectFloor: (floorNumber: number) => void;
}> = (props) => {
  const {
    floors,
    isElevatorOpen,
    totalNumberFloors,
    requestUpElevator,
    requestDownElevator,
    selectFloor,
  } = props;
  const buttonStyle = isElevatorOpen ? "buttonStyle" : "";
  return (
    <section className="item">
      {isElevatorOpen && (
        <h3 className="floorFont selectFloorHeader">Select Floor:</h3>
      )}
      {/*
       * This will populate the total number of buttons dynamically by mapping each key/value to a button.
       */}
      {floors.map((floor) => (
        <div key={floor.key} className={buttonStyle}>
          {!isElevatorOpen && (
            <h3 key={floor.key} className="floorFont">
              {floor.key}
            </h3>
          )}
          {/*
           * Up elevator request button.
           * Checks that the top floor never has an up elevator request button.
           */}
          {floor.number !== totalNumberFloors && !isElevatorOpen && (
            <button
              onClick={() => requestUpElevator(floor.number)}
              className="requestElevatorButton"
            >
              <div className="up-triangle"></div>
            </button>
          )}
          {/*
           * Down elevator request button.
           * Checks that the first floor won't have a down elevator request button.
           */}
          {floor.number !== 1 && !isElevatorOpen && (
            <button
              onClick={() => requestDownElevator(floor.number)}
              className="requestElevatorButton"
            >
              <div className="down-triangle"></div>
            </button>
          )}
          {/* Select floor buttons. */}
          {isElevatorOpen && (
            <button
              onClick={() => selectFloor(floor.number)}
              className="floorSelectButtons"
            >
              {floor.number}
            </button>
          )}
        </div>
      ))}
    </section>
  );
};

export default ElevatorButtons;
