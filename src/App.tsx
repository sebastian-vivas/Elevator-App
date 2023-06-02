import React from 'react';
import Elevator from './Elevator'
import InsideElevator from './InsideElevator'
import Floor from './Floor'

function App() {
  return (
    <div className="App">
      <h1>Ellevator</h1>
      <Floor />
      <InsideElevator totalFloors={10} />
      <Elevator />
    </div>
  );
}

export default App;
