import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';
import './App.css';
import PnLCalendar from './components/PnLCalendar/PnLCalendar';
function App() {
  return (
    <div className="App">
     <PnLCalendar/>
    <ReactTooltip id="foo" place="top" type="success" />

    </div>
  );
}

export default App;
