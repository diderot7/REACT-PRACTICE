import { useContext } from "react";
import DiaryItem from "./DiaryItem";

import { DiaryStateContext } from "./App";

const DiaryList = () => {
  const data = useContext(DiaryStateContext);
  // datainfo 객체 추출
  const datainfos = data;
  const dataed = Array.isArray(datainfos.datainfo) ? datainfos.datainfo : [];
  console.log(dataed, data);

  // contents 배열 추출
  const contentsArray = dataed.map((item) => item.contents) || [];
  const RealData = contentsArray[0] || [];
  console.log(data, RealData);

  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      {/* <h4>{data.datainfo.length}개의 일기가 있습니다.</h4> */}
      <div>
        {RealData.map((it) => (
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
