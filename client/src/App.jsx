import Auth from './Components/Auth';
import Todo from './Components/Todo';

function App() {
  const token = localStorage.getItem('token');
  // console.log(token);
  if (token) {
    return (
      <div style={{ border: '1px solid black' }} className="App">
        <h1 style={{color: 'tomato'}}>App.jsx</h1>
        <Todo />
      </div>
    );
  }
  return (
    <div className='App'>
      <h1 style={{color: 'tomato'}}>App.jsx</h1>
      <Auth />
    </div>
  )
}

export default App;