import './App.css';
import AssignmentsMarks from './components/AssignmentMarks/AssignmentsMarks';
import NavBar from './components/NavBar/NavBar';
import Pricing from './components/Pricing/Pricing';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Pricing></Pricing>
      <AssignmentsMarks></AssignmentsMarks>
    </div>
  );
}

export default App;
