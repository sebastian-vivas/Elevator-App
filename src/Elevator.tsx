import React from "react";
import "./styles.css";

const Elevator: React.FC<{
  requestedFloor: number;
  totalNumberFloors: number;
}> = (props) => {
  const { requestedFloor, totalNumberFloors } = props;
  const elevators = [];

  for (let i = totalNumberFloors; i >= 1; i--) {
    const elevatorNumber: number = i;
    const elevatorKey: string = `Floor ${elevatorNumber}`;
    elevators.push({ key: elevatorKey, number: elevatorNumber });
  }

  return (
    <div className="item">
      {elevators.map((elevator) => (
        <>
          {requestedFloor !== elevator.number && (
            <h3 className="elevator">{elevator.key}</h3>
          )}
          {requestedFloor === elevator.number && (
            <h3 className="elevator red">{elevator.key}</h3>
          )}
          {requestedFloor === elevator.number && (
            <img
              src={process.env.PUBLIC_URL + "/assets/elevator.png"}
              alt="Elevator icon"
            />
          )}
        </>
      ))}
    </div>
  );
};

export default Elevator;
