export default function Error() {
  const error = false;

  return (
    <div
      className={`text-center bg-red-600 p-5 font-bold text-white rounded-xl my-10 shadow-lg shadow-red-500 text-xl cursor-pointer ${
        !error ? "hidden" : ""
      }`}
      onClick={(e) => console.log(e)}
    >
      Hello World
    </div>
  );
}
