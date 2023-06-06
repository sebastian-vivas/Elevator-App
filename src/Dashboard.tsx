import React, { useState, useEffect } from "react";
import Debugger from "./Debugger";
import Elevator from "./Elevator";
import ElevatorButtons from "./ElevatorButtons";
import "./styles.css";

const Dashboard: React.FC<{ totalNumberFloors: number }> = (props) => {
  type FloorObj = { key: string; number: number };
  const floors: FloorObj[] = [];
  const requestUpArr: number[] = [];
  const requestDownArr: number[] = [];
  const selectUpArr: number[] = [];
  const selectDownArr: number[] = [];
  const { totalNumberFloors } = props;
  const [currentFloor, setFloor] = useState(1);
  const [isCounterActive, setIsCounterActive] = useState(false);
  const [nextFloor, setNextFloor] = useState(0);
  const [isElevatorOpen, setIsElevatorOpen] = useState(false);
  const [selectUpQueue, setSelectUpQueue] = useState(selectUpArr);
  const [selectDownQueue, setSelectDownQueue] = useState(selectDownArr);
  const [requestUpQueue, setRequestUpQueue] = useState(requestUpArr);
  const [requestDownQueue, setRequestDownQueue] = useState(requestDownArr);
  const [isQueueActive, setIsQueueActive] = useState(false);
  const [isAscending, setIsAscending] = useState(false);
  const [isDescending, setIsDescending] = useState(false);
  const [arePeopleExiting, setArePeopleExiting] = useState(false);

  /*
   * Loop through `totalNumberFloors` and push corresponding key/value pairs to the `floors` object.
   * This will populate the total number of floors dynamically through passed down props.
   */
  for (let i = totalNumberFloors; i >= 1; i--) {
    const floorNumber: number = i;
    const floorKey: string = `Floor ${floorNumber}`;
    floors.push({ key: floorKey, number: floorNumber });
  }

  /*
   * These are all of the methods for the up/down buttons and select floor buttons.
   */
  const requestElevatorDown = (floorNumber: number) => {
    if (!isAscending && !isDescending) setIsDescending(true);
    setIsQueueActive(true);
    requestDownQueue.push(floorNumber);
    if (
      !isCounterActive ||
      (requestDownQueue.length >= 1 && selectDownQueue[0] < selectUpQueue[0])
    )
      setNextFloor(floorNumber);
    setIsCounterActive(true);
  };

  const requestElevatorUp = (floorNumber: number) => {
    if (!isAscending && !isDescending) setIsAscending(true);
    setIsQueueActive(true);
    requestUpQueue.push(floorNumber);
    if (
      !isCounterActive ||
      (requestUpQueue.length >= 1 && selectDownQueue[0] > selectUpQueue[0])
    )
      setNextFloor(floorNumber);
    setIsCounterActive(true);
  };

  const selectFloor = (floorNumber: number) => {
    setIsElevatorOpen(false);
    setIsQueueActive(true);
    if (isAscending) selectUpQueue.push(floorNumber);
    if (isDescending) selectDownQueue.push(floorNumber);
    setIsCounterActive(true);
  };

  /*
   * Check to see if the current floor strict equals the first indexed item in any of the queue arrays.
   * Turn off the counter to stop the elevator from moving and open the elevator doors.
   * Remove the first item in the queue array if it matches the current floor.
   * Go to the next floor in the request queue array.
   */
  const stopAndGoToNextFloor = (selArr: number[], reqArr: number[]) => {
    if (currentFloor === reqArr[0]) {
      setIsCounterActive(false);
      setIsElevatorOpen(true);
      if (currentFloor === reqArr[0]) {
        reqArr.shift();
      }
      if (!isElevatorOpen && reqArr.length >= 1) {
        setNextFloor(reqArr[0]);
      }
    }
  };

  /*
   * Show an icon of a person exiting.
   * Remove the person icon.
   * Set the next floor as the next item in the the elevator request array.
   * Remove selected floor item from the queue array.
   */
  const makePeopleExit = (selArr: number[], reqArr: number[]) => {
    setIsElevatorOpen(false);
    setArePeopleExiting(true);
    setTimeout(() => {
      setArePeopleExiting(false);
    }, 1000);
    setNextFloor(reqArr[0]);
    selArr.shift();
  };

  /*
   * Check to see if someone selected a floor that is in between the requested floors.
   * If so, remove that item from the selected floor queue array.
   * Show an icon of a person exiting.
   * Set the next floor as the next item in the the elevator request array.
   * Remove the person icon.
   */
  const checkInBetweenFloors = (selArr: number[], reqArr: number[]) => {
    if (selArr[0] < reqArr[0] && isAscending) {
      setNextFloor(selArr[0]);
      if (currentFloor === selArr[0]) {
        makePeopleExit(selArr, reqArr);
      }
    }
    if (selArr[0] > reqArr[0] && isDescending) {
      setNextFloor(selArr[0]);
      if (currentFloor === selArr[0]) {
        makePeopleExit(selArr, reqArr);
      }
    }
    /*
     * Lmao I forgot we changed these during the interview and now I forget what I did to make it work.
     */
    // if (reqArr[0] > reqArr.reverse()[0] && isDescending) {
    //   setRequestUpQueue(removeDuplicatesandSort(requestDownQueue).reverse());
    //   setNextFloor(reqArr[0]);
    // }
    // if (selArr[0] < reqArr[0] && isDescending) {
    //   setRequestDownQueue(removeDuplicatesandSort(requestDownQueue).reverse());
    //   setNextFloor(reqArr[0]);
    // }
  };

  /*
   * This checks to see if there are no more requests for the elevator in the queue.
   * Go to the remaining floors in the selected floors queue.
   * Remove the items from the queue as we reach each destination.
   */
  const completeSelectedFloorQueue = (selArr: number[], reqArr: number[]) => {
    if (reqArr.length === 0 && selArr.length >= 1) {
      setNextFloor(selArr[0]);
      if (currentFloor === selArr[0]) {
        makePeopleExit(selArr, reqArr);
        if (isDescending && selArr.length === 0) setIsDescending(false);
        if (isAscending && selArr.length === 0) setIsAscending(false);
      }
    }
  };

  /*
   * You guessed it! Remove duplicates and sort an array. :D
   */
  const removeDuplicatesandSort = (arr: number[]) => {
    return arr
      .filter((item, index) => arr.indexOf(item) === index)
      .sort((a, b) => a - b);
  };

  useEffect(() => {
    /*
     * This timer runs a check to see if we want to increment the elevator up or down by adding or substracting 1 from `currentFloor`.
     * The timer uses setInterval so we can see the incremenet one by one, like an elevator moving up or down a building.
     */
    const timer = setInterval(() => {
      /*
       * `isQueueActive` checks to see if we want to update either queue array from on of the buttons
       * methods and set it in the queueArr state.
       */
      if (isQueueActive) {
        setRequestUpQueue(removeDuplicatesandSort(requestUpQueue));
        setSelectUpQueue(removeDuplicatesandSort(selectUpQueue));
        setRequestDownQueue(removeDuplicatesandSort(requestDownQueue));
        setSelectDownQueue(removeDuplicatesandSort(selectDownQueue).reverse());
        setIsQueueActive(false);
      }
      if (isCounterActive) {
        if (nextFloor > currentFloor)
          setFloor((currentFloor) => currentFloor + 1);
        if (nextFloor < currentFloor)
          setFloor((currentFloor) => currentFloor - 1);
      }
    }, 1000);

    if (isAscending) {
      stopAndGoToNextFloor(selectUpQueue, requestUpQueue);
      completeSelectedFloorQueue(selectUpQueue, requestUpQueue);
      checkInBetweenFloors(selectUpQueue, requestUpQueue);
    }

    if (isDescending) {
      stopAndGoToNextFloor(selectDownQueue, requestDownQueue);
      completeSelectedFloorQueue(selectDownQueue, requestDownQueue);
      checkInBetweenFloors(selectDownQueue, requestDownQueue);
    }

    /*
     * These will start the next queue if an up/down cycle has completed and a request has been made in the queue.
     */
    if (!isAscending && requestDownQueue.length >= 1) {
      setIsDescending(true);
      setNextFloor(requestDownQueue[0]);
    }

    if (!isDescending && requestUpQueue.length >= 1) {
      setIsAscending(true);
      setNextFloor(requestUpQueue[0]);
    }

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <section className="container">
      <Debugger
        isElevatorOpen={isElevatorOpen}
        currentFloor={currentFloor}
        nextFloor={nextFloor}
        requestUpQueue={requestUpQueue}
        isAscending={isAscending}
        selectUpQueue={selectUpQueue}
        requestDownQueue={requestDownQueue}
        isDescending={isDescending}
        selectDownQueue={selectDownQueue}
      />
      <Elevator
        arePeopleExiting={arePeopleExiting}
        currentFloor={currentFloor}
        totalNumberFloors={10}
      />
      <ElevatorButtons
        floors={floors}
        isElevatorOpen={isElevatorOpen}
        totalNumberFloors={totalNumberFloors}
        requestUpElevator={requestElevatorUp}
        requestDownElevator={requestElevatorDown}
        selectFloor={selectFloor}
      />
    </section>
  );
};

export default Dashboard;
