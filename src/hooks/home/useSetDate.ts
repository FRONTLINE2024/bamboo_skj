const useSetDate = () => {
  const time = new Date();

  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();

  const times = time.toLocaleString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const createdAt = `${year}-${month}-${date} ${times}`;

  return createdAt;
};

export default useSetDate;
