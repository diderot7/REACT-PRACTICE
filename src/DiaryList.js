import DiaryItem from "./DiaryItem";

const DiaryList = ({ data, onDelete, onEdit }) => {
  console.log(data);
  return (
    <div className="DiaryList">
      <h2>다이어리 리스트 영역입니다</h2>
      {/* <h4>{data.length}개의 일기가 있습니다.</h4> */}
      <div>
        {data.map((it) => (
          <DiaryItem key={it.id} {...it} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
