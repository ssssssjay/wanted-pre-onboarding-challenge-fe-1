import React, {useState, useEffect, Fragment, useRef} from "react";


function Auth() {
  const inpId = useRef(null);
  const inpPw = useRef(null);
  
  const handleJoin = async (e) => {
    const user = {
      email: inpId.current.value,
      password: inpPw.current.value
    }
    const response = await fetch ('http://localhost:8080/users/create', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    });
    console.log(response);
    const json = await response.json();
    console.log(json);
  }

  const handleLogin = async (e) => {
    const user = {
      email: inpId.current.value,
      password: inpPw.current.value
    }
    const response = await fetch ('http://localhost:8080/users/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    });
    console.log(response);
    const json = await response.json();
    console.log(json);
    localStorage.setItem('token', json.token);
  }

  return (
    <div className="main">
      <h1 style={{color: 'tomato'}}>Auth.jsx</h1>
      <form>
        <label htmlFor="id">ID</label>
        <input type="text" id="id" ref={inpId} />
        <label htmlFor="pw">PASSWORD</label>
        <input type="password" id="pw" ref={inpPw} />
        <button type="button" onClick={handleJoin}>join</button>
        <button type="button" onClick={handleLogin}>login</button>
      </form>
    </div>
  );
}

export default Auth;