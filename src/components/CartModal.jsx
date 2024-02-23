import { useEffect, useRef, useState } from "react";

export default function ResultModal({ open, modalFn, cartItems, buttonFn }) {
  const dialog = useRef();

  const [checkOut, setCheckout] = useState(0);

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  useEffect(() => {
    function totalCheckout() {
      let totalPrice = 0;
      cartItems.forEach((order) => {
        totalPrice += order.quantity * order.item.price;
      });
      setCheckout(totalPrice);
    }
    totalCheckout();
  }, [cartItems]);

  const style = "text-2xl pl-2 pt-2";
  const styleButton = "bg-yellow-600 rounded-full px-2 font-bold";

  return (
    <dialog ref={dialog} onClose={modalFn} className="w-96 h-96 bg-stone-300">
      <h1 className={style}>Your cart</h1>
      <ul className="text-stone-900 mt-2 pl-5">
        {cartItems.map((order) => {
          return (
            <li key={order.item.id} className="flex gap-2">
              <p className="uppercase">{order.item.name}</p>
              <p className="font-bold">${order.item.price}</p>
              <button
                className={styleButton}
                onClick={() => buttonFn("+", order.item.id, order.quantity)}
              >
                +
              </button>
              <p>{order.quantity}</p>

              <button
                className={styleButton}
                onClick={() => buttonFn("-", order.item.id, order.quantity)}
              >
                -
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        <h1 className={style}>Total Price</h1>
        <h1 className={style}>${checkOut}</h1>
      </div>
      <button onClick={modalFn} className={styleButton}>
        Close
      </button>
    </dialog>
  );
}
