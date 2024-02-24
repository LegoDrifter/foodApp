export default function Button({ children, clickFunction }) {
  const styleButton = "bg-yellow-600 rounded-full px-2 font-bold";

  return (
    <button className={styleButton} onClick={clickFunction}>
      {children}
    </button>
  );
}
