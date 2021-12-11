import './App.css';
import {useSelector, useEffect, useDispatch} from 'react-redux';
import {Memory} from './Memory';
import {fetchDay} from './actions';

function App() {
  const memories = useSelector(state => state.memories);
  const dispatch = useDispatch();

  useEffect(() => {
    const today = new Date();
    dispatch(fetchDay(today.getMonth() + 1, today.getDate()));
  }, [dispatch]);

  return (
    <div className="App">
      <div className="memories">
        {memories.map(memory =>
          <Memory key={memory.id} memory={memory} />
        )}
      </div>
    </div>
  );
}

export default App;
