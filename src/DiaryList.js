import { useContext } from "react";
import DiaryItem from "./DiaryItem";

import { DiaryStateContext } from "./App";

const DiaryList = () => {
  const data = useContext(DiaryStateContext);
  console.log(data);

  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{data.datainfo.length}개의 일기가 있습니다.</h4>
      <div>
        {data.datainfo.map((it) => (
          <DiaryItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  data: [],
};

export default DiaryList;
