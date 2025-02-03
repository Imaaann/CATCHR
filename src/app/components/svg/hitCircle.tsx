function hitCircle({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="35" cy="35" r="34" stroke="white" strokeWidth="2" />
    </svg>
  );
}

export default hitCircle;
