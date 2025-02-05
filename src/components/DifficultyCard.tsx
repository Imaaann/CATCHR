function getColor(difficulity: number) {
  if (difficulity <= 4) {
    return "#B8FF47";
  } else if (difficulity <= 8) {
    return "#FFDB25";
  } else if (difficulity <= 12) {
    return "#EA245C";
  } else {
    return "#CF0DFF";
  }
}

function DifficultyCard({ text }: { text: string }) {
  const difficulity: number = parseInt(text.split(" ")[1]) || 0;
  const color: string = getColor(difficulity);

  return (
    <div
      className="flex flex-col items-center bg-white bg-opacity-0 hover:bg-opacity-5 justify-center rounded-full border py-2 px-4 cursor-pointer "
      style={{ borderColor: color, color: color }}
    >
      {text}
    </div>
  );
}

export default DifficultyCard;
