const inp_tit = document.querySelector('#title');
const inp_cont = document.querySelector('#content');
const btn_add = document.querySelector('#add');
const btn_del = document.querySelector('#del');
const btn_update = document.querySelector('#update');
const a = document.querySelector('#a');

const token = localStorage.getItem('token');

btn_add.addEventListener('click', addTodo);

async function getTodoList() {
  const response = await fetch('http://localhost:8080/todos', {
    method: 'GET',
    headers: {
      'Authorization': token
    },
  })
  console.log(response);
  const json = await response.json();
  console.log(json);
  console.log(json.data);
  const ul = document.createElement('ul');
  a.appendChild(ul);
  json.data.forEach(e => {
    const li = document.createElement('li');
    const h2 = document.createElement('h2');
    h2.innerText = e.title;
    h2.id = e.id;
    const strong = document.createElement('strong');
    strong.innerText = e.content;
    li.appendChild(h2);
    li.appendChild(strong);
    ul.appendChild(li);
  });
}

async function addTodo() {
  const data = {
    title: inp_tit.value,
    content: inp_cont.value
  }
  const response = await fetch('http://localhost:8080/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(data)
  })
  console.log(response);
  const json = await response.json();
  console.log(json);
  inp_tit.value = '';
  inp_cont.value = '';
}
async function delTodo(id) {
  const response = await fetch(`http://localhost:8080/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': token
    }
  })
  console.log(response);
  const json = await response.json();
  console.log(json);
}
async function updateTodo(id) {
  const data = {
    
  }
  const response = await fetch(`http://localhost:8080/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(data)
  })
}

getTodoList();