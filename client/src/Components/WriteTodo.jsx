import { useRef } from 'react';

function WriteTodo({ token }) {
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

export default WriteTodo;