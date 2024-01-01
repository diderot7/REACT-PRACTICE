import { useRef, useState } from "react";

import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {
  // const dummyList = [
  //   {
  //     id: 1,
  //     author: "이정환",
  //     content: "하이1",
  //     emotion: 5,
  //     created_date: new Date().getTime(),
  //   },
  //   {
  //     id: 2,
  //     author: "이정환",
  //     content: "하이2",
  //     emotion: 5,
  //     created_date: new Date().getTime(),
  //   },
  //   {
  //     id: 3,
  //     author: "이정환",
  //     content: "하이3",
  //     emotion: 5,
  //     created_date: new Date().getTime(),
  //   },
  // ];

  const [data, setData] = useState([]);

  const dataId = useRef(0);
  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };
  const onDelete = (id) => {
    let filterDiary = data.filter((it) => it.id !== id);
    setData(filterDiary);
  };
  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onDelete={onDelete} />
    </div>
  );
}

export default App;
