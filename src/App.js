import { useRef, useState } from "react";

import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import Lifecycle from "./Lifecycle";

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

  const dataId = useRef(1);
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
  const onDelete = (targetId) => {
    let filterDiary = data.filter((it) => it.id !== targetId);
    setData(filterDiary);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  return (
    <div className="App">
      <Lifecycle />
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
}

export default App;
