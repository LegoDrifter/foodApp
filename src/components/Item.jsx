export default function Item({ id, image, name, price, desc, addFn }) {
  return (
    <li
      key={id}
      className="bg-stone-800 pb-3 mb-5 text-center w-56 rounded-lg "
    >
      <img
        src={`http://localhost:3000/${image}`}
        alt="image"
        className="w-56 h-56"
      />
      <p className="text-stone-300 font-bold">{name}</p>
      <p className=" text-yellow-600">${price}</p>
      <p className="text-stone-300">{desc}</p>
      <button
        onClick={() => addFn(id)}
        className="bg-yellow-600 text-stone-900 rounded-lg px-2 py-2 mt-2"
      >
        Add to cart
      </button>
    </li>
  );
}
