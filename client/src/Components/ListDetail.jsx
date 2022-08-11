import { useState, useEffect, Fragment, useRef } from "react";
import { Link, useHref, useLocation } from 'react-router-dom';

function ListDetail({ detail, token, setDetail }) {
  // console.log(detail);
  // console.log(Object.keys(detail).length);
  const inpTitle = useRef(null);
  const inpCont = useRef(null);

  const [isUpdate, setIsupdate] = useState(false);

  // let location = useLocation();
  // console.log(location);

  // const [title, setTitle] = useState(detail.title);
  // const [content, setContent] = useState(detail.content);
  
  const handleUpdate = async (e) => {
    // console.log(detail.id);
    // console.log(isUpdate);
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
  useEffect(() => {
    const test = async () => {
    
    }
    test();
  }, [detail])

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
            <h1 style={{color: 'tomato'}}>ListDetail.jsx</h1>
            <h1>{detail.title}</h1>
            <h2>{detail.content}</h2>
            {/* <Link to={`/update/${id}`}> */}
              <button onClick={handleUpdate}>수정</button>
            {/* </Link> */}
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

export default ListDetail;