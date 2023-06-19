import './App.css';
import AssignmentsMarks from './components/AssignmentMarks/AssignmentsMarks';
import NavBar from './components/NavBar/NavBar';
import PhoneBar from './components/PhoneBar/PhoneBar';
import Pricing from './components/Pricing/Pricing';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Pricing></Pricing>
      <AssignmentsMarks></AssignmentsMarks>
      <PhoneBar></PhoneBar>
    </div>
  );
}

export default App;
