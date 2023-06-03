import React from 'react';
// import InsideElevator from './InsideElevator'
import Floor from './Floor'

function App() {
  return (
    <div className="App">
      <Floor totalNumberFloors={10}/>
      {/* <InsideElevator totalFloors={10}/> */}
    </div>
  );
}

export default App;
