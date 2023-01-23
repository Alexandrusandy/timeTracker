const formatTime = (elapsedTime: number) => {
  const seconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  return `${hours}:${minutes % 60}:${seconds % 60}`;
};

export default formatTime;
