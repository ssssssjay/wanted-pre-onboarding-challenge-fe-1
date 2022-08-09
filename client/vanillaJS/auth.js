const input_id = document.querySelector('#id');
const input_pw = document.querySelector('#pw');
const btn_login = document.querySelector('#login');
const btn_join = document.querySelector('#join');

const token = localStorage.getItem('token');
// localStorage.removeItem('token');
console.log(token);

btn_join.addEventListener('click', joinSubmit);
btn_login.addEventListener('click', loginSubmit);

async function joinSubmit() {
  console.log(input_id.value);
  console.log(input_pw.value);
  const user = {
    email: input_id.value,
    password: input_pw.value
  }
  const response = await fetch ('http://localhost:8080/users/create', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user)
  });
  console.log(response);
  const json = await response.json();
  console.log(json);
};

async function loginSubmit() {
  const user = {
    email: input_id.value,
    password: input_pw.value
  }
  const response = await fetch ('http://localhost:8080/users/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user)
  });
  console.log(response);
  const json = await response.json();
  console.log(json);
  console.log(json.message);
  console.log(json.token);
  localStorage.setItem('token', json.token);
};