const DiaryItem = ({
  author,
  content,
  emotion,
  created_date,
  onDelete,
  id,
}) => {
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정 : {emotion}
        </span>
        <button
          onClick={() => {
            onDelete(id);
          }}
        >
          삭제하기
        </button>
        <br />
        <span className="date">
          작성시간 : {new Date(created_date).toLocaleString()}
        </span>
      </div>
      <div className="content"> 일기 : {content}</div>
    </div>
  );
};

export default DiaryItem;
