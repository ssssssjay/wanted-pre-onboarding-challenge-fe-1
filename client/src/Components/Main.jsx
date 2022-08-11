import React, { useState, useEffect, Fragment, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import WriteTodo from "./WriteTodo";
import ListDetail from "./ListDetail";

function Main({ token }) {
  const [error, setError] = useState(null); // 투두리스트 불러올 때 에러가 날라올 때
  const [isLoaded, setIsLoaded] = useState(false); // 로딩중일때
  const [lists, setLists] = useState([]); // 투두리스트
  const [detail, setDetail] = useState({}); // 상세보기
  const { id } = useParams(); // 파라미터에따라 디테일 겟 요청
  
  // 처음 한번 투두리스트 긁어오기
  useEffect(() => {
    const getTodoList = async () => {
      try {
        const res = await fetch('http://localhost:8080/todos', {
          method: 'GET',
          headers: {
            'Authorization': token
          },
        })
        const result = await res.json()
        // console.log(res)
        // console.log(res.ok)
        // console.log(result)
        setLists(result)
        setIsLoaded(true)
      } catch (error) {
        setIsLoaded(true)
        setError(error)
      }
    }
    getTodoList()
  }, [])

  // 파라미터를 와칭하면서 디테일 겟요청 보내기
  useEffect(() => { 
    // console.log('useParams가 변하나?', id)
    if (id === undefined) {
      // console.log('id undefined')
      setDetail({}); // 이러면 아예 렌더링이 안됨!! 빈태그가 없다는 뜻임
    } else {
      // console.log('id 있음!!!!')
      const getDetail = async () => {
        try {
          const res = await fetch(`http://localhost:8080/todos/${id}`, {
            method: 'GET',
            headers: {
              'Authorization': token
            }
          })
          const detail = await res.json()
          setDetail(detail.data)
        } catch (error) {
          setError(error)
        }
      }
      getDetail();
    }
  }, [id]) // id를 감시하고 있도록
  
  // 이제는 안쓰는 함수, 나중에 기록을 위해 살려둠
  const handleClickList = (e) => {
    // 원래는 li태그에 걸어둔 이벤트. 이건 데이터를 불러오는게 아니라, 가지고있는 상태에서 find하는것임
    const id = e.target.dataset.id === undefined ? e.target.parentElement.dataset.id : e.target.dataset.id;
    setDetail(lists.data.find(list =>  list.id === id ));
  }

  // 에러가 나면 에러메세지를, 로딩중일때는 로딩중을, 아니면 리스트를
  if (error) {
    return <div>애러입니다! {error.message}</div>
  } else if (!isLoaded) {
    return <div>로딩중!</div>
  } else {
    return (
      <div className="Main">
        <h1 style={{ color: 'tomato' }}>Todo.jsx</h1>
        <WriteTodo token={token} />
        <hr/>
        <ul>
          {lists.data.map(list =>
            <Link to={`/${list.id}`} key={list.id}>
              <li key={list.id} data-id={list.id}>
                <h2>{list.title}</h2>
              </li>
            </Link>
          )}
        </ul>
        <hr/>
        <ListDetail detail={detail} token={token} setDetail={setDetail} />
      </div>
    );
  }

  // 분기처리를 해주지 않으면, 맨 처음 초기값인 빈 배열에 접근을 하기 때문에 아래의 리턴문에서는 에러가 발생한다(언디파인드혹은널값에서 맵을 돌릴수없다고)
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

export default Main;