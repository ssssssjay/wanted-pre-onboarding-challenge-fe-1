import React, {useState, useEffect, Fragment, useRef} from "react";

const token = localStorage.getItem('token');
// console.log(token)

function Todo() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lists, setLists] = useState([]);
  const [detail, setDetail] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
          const res = await fetch('http://localhost:8080/todos', {
            method: 'GET',
            headers: {
              'Authorization': token
            },
          })
          const result = await res.json()
        setLists(result)
        setIsLoaded(true)
      } catch (error) {
        setIsLoaded(true)
        setError(error)
      }
    }
    getData()
  }, [])

  // console.log(lists);
  
  const handleClickList = (e) => {
    const id = e.target.dataset.id === undefined ? e.target.parentElement.dataset.id : e.target.dataset.id;
    // console.log(id);
    // console.log(lists)
    setDetail(lists.data.find(list =>  list.id === id ));
    // const arr = lists.data.find(list => list.id == id);
    // console.log(arr);
  }

  if (error) {
    return <div>애러입니다! {error.message}</div>
  } else if (!isLoaded) {
    return <div>로딩중!</div>
  } else {
    return (
      <div className="Main">
        <h1 style={{ color: 'tomato' }}>Todo.jsx</h1>
        <WriteTodo />
        <hr/>
        <ul>
          {lists.data.map(list =>
            <li key={list.id} data-id={list.id} onClick={handleClickList}>
              <h2>할일제목 : {list.title}</h2>
            </li>)}
        </ul>
        <hr/>
        <List detail={detail} />
      </div>
    );
  }

  // return (
  //   <div className="Main">
  //     <h1>Main</h1>
  //     <ul>
  //       {lists.data.map(list => 
  //         <li key={list.id}>
  //           <h2>{list.title}</h2>
  //           <h3>{list.content}</h3>
  //         </li>)}
  //     </ul>
  //   </div>
  // );
}

function List({ detail }) {
  console.log(detail);
  // console.log(Object.keys(detail).length);
  const inpTitle = useRef(null);
  const inpCont = useRef(null);

  const [isUpdate, setIsupdate] = useState(false);
  // const [title, setTitle] = useState(detail.title);
  // const [content, setContent] = useState(detail.content);
  
  const handleUpdate = async (e) => {
    console.log(detail.id);
    console.log(isUpdate);
    if (isUpdate === false) {
      setIsupdate(true);
    } else {
      const data = {
        title: inpTitle.current.value,
        content: inpCont.current.value
      }
      const response = await fetch(`http://localhost:8080/todos/${detail.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(data)
      })
      console.log(response);
      const json = await response.json();
      console.log(json);
      // console.log(response.data); // undefined
      setIsupdate(false);
    }
    // 부모에 있던 버튼을 자식으로 내려줌
    // e.stopPropagation();
  }
  const handleDelete = async (e) => {
    const response = await fetch(`http://localhost:8080/todos/${detail.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    console.log(response);
    const json = await response.json();
    console.log(json);
  }

  // 목록을 클릭하면 프롭스가 넘어오는 구조에서, 프롭스가 없다면 렌더링이 아예 안되도록 구현
  if (!(Object.keys(detail).length === 0)) {
    if (!isUpdate) {
      return (
        <>
          <div>
            <h1 style={{color: 'tomato'}}>List.jsx</h1>
            <h1>{detail.title}</h1>
            <h2>{detail.content}</h2>
            <button onClick={handleUpdate}>수정</button>
            <button onClick={handleDelete}>삭제</button>
          </div>
        </>
      )
    } else if (isUpdate) {
      return (
        <>
          <div>
            <h1 style={{ color: 'tomato' }}>List.jsx</h1>
            <input type="text" defaultValue={detail.title} ref={inpTitle} />
            <br />
            <input type="text" defaultValue={detail.content} ref={inpCont} />
            <br />
            <button onClick={handleUpdate}>수정</button>
          </div>
        </>
      )
    }
  }
  return null
}

function WriteTodo() {
  const inpTitle = useRef(null);
  const inpCont = useRef(null);
  // console.log(inpTitle);

  // const [titleValue, setTitleValue] = useState("");
  // const [contValue, setContValue] = useState("");

  const handleAddBtn = async (e) => {
    // console.log(inpTitle);
    // console.log(inpTitle.current);
    // setTitleValue(inpTitle.current.value);
    // setContValue(inpCont.current.value);
    // console.log('inpTitle.current.value : ', inpTitle.current.value);
    // console.log('titleValue : ', titleValue);

    const data = {
      title: inpTitle.current.value,
      content: inpCont.current.value
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
    inpTitle.current.value = '';
    inpCont.current.value = '';
  }
  return (
    <>
      <h1 style={{ color: 'tomato' }}>WriteTodo.jsx</h1>
      <label htmlFor="title">title</label>
      <input type="text" id="title" ref={inpTitle} />
      {/* <div>{ titleValue }</div> */}
      <br />
      <label htmlFor="content">content</label>
      <input type="text" id="content" ref={inpCont} />
      {/* <div>{ contValue }</div> */}
      <br />
      <button type="button" id="add" onClick={handleAddBtn}>추가</button>
    </>
  )
}

export default Todo;