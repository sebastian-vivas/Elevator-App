import React from "react";
import "./styles.css";

const Elevator: React.FC<{
  arePeopleExiting: boolean;
  currentFloor: number;
  totalNumberFloors: number;
}> = (props) => {
  const { arePeopleExiting, currentFloor, totalNumberFloors } = props;
  const elevators = [];

  /*
   * Loop through `totalNumberFloors` and push corresponding key/value pairs to the `elevators` object.
   * This will populate the total number of buttons dynamically.
   */
  for (let i = totalNumberFloors; i >= 1; i--) {
    const elevatorNumber: number = i;
    const elevatorKey: string = `Floor ${elevatorNumber}`;
    elevators.push({ key: elevatorKey, number: elevatorNumber });
  }

  return (
    <section className="item">
      {/*
       * This will populate the total number of floors dynamically by mapping each key/value to a section.
       */}
      {elevators.map((elevator) => (
        <section key={elevator.key}>
          {currentFloor !== elevator.number && (
            <h3 className="floorFont margin">{elevator.key}</h3>
          )}
          {currentFloor === elevator.number && (
            <h3 className="elevatorHeader">{elevator.key}</h3>
          )}
          {currentFloor === elevator.number && (
            <img
              src={process.env.PUBLIC_URL + "/assets/elevator.png"}
              alt="An Elevator"
            />
          )}
          {currentFloor === elevator.number && arePeopleExiting && (
            <img
              src={process.env.PUBLIC_URL + "/assets/running.png"}
              className="person"
              alt="A person walking out of an elevator"
            />
          )}
        </section>
      ))}
    </section>
  );
};

export default Elevator;
