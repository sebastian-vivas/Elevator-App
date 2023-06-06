import React from "react";
import "./styles.css";

const Debugger: React.FC<{
  isElevatorOpen: boolean;
  currentFloor: number;
  nextFloor: number;
  isAscending: boolean;
  requestUpQueue: number[];
  selectUpQueue: number[];
  isDescending: boolean;
  requestDownQueue: number[];
  selectDownQueue: number[];
}> = (props) => {
  const {
    isElevatorOpen,
    currentFloor,
    nextFloor,
    requestDownQueue,
    requestUpQueue,
    selectUpQueue,
    selectDownQueue,
    isAscending,
    isDescending,
  } = props;
  return (
    <ul className="item debugger">
      <li>
        Current Floor:{" "}
        <span className="accessibilityColor">{currentFloor}</span>
      </li>
      <li>
        Next Floor: <span className="accessibilityColor">{nextFloor}</span>
      </li>
      <li>
        Elevator is Open:{" "}
        <span className="accessibilityColor">{!isElevatorOpen && "false"}</span>
        <span className="accessibilityColor">{isElevatorOpen && "true"}</span>
      </li>
      <br />
      <li>
        Elevator is ascending:{" "}
        <span className="accessibilityColor">{!isAscending && "false"}</span>
        <span className="accessibilityColor">{isAscending && "true"}</span>
      </li>
      <li>
        Requested Floor Queue (+):{" "}
        <span className="accessibilityColor">{requestUpQueue.join(", ")}</span>
      </li>
      <li>
        Selected Floor Queue (+):{" "}
        <span className="accessibilityColor">{selectUpQueue.join(", ")}</span>
      </li>
      <br />
      <li>
        Elevator is descending:{" "}
        <span className="accessibilityColor">{!isDescending && "false"}</span>
        <span className="accessibilityColor">{isDescending && "true"}</span>
      </li>
      <li>
        Requested Floor Queue (-):{" "}
        <span className="accessibilityColor">
          {requestDownQueue.join(", ")}
        </span>
      </li>
      <li>
        Selected Floor Queue (-):{" "}
        <span className="accessibilityColor">{selectDownQueue.join(", ")}</span>
      </li>
    </ul>
  );
};

export default Debugger;
