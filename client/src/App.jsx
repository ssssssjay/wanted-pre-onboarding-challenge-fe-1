import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Auth from './Components/Auth';
import Main from './Components/Main';

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Link to='/auth'>Auth</Link>
      <br />
      <Link to='/'>Main</Link>
      <Routes>
        <Route path={"/"} element={<Main token={token} />} />
        <Route path={"/:id"} element={<Main token={token} />} />
        <Route path={"/update/:id"} element={<Main token={token} />} />
        <Route path={"/auth"} element={<Auth />} />
      </Routes>
    </BrowserRouter>
  )

  // if (token) {
  //   return (
  //     <div style={{ border: '1px solid black' }} className="App">
  //       <h1 style={{color: 'tomato'}}>App.jsx</h1>
  //       <Main token={token} />
  //     </div>
  //   );
  // }
  // return (
  //   <div className='App'>
  //     <h1 style={{color: 'tomato'}}>App.jsx</h1>
  //     <Auth />
  //   </div>
  // )
}

export default App;