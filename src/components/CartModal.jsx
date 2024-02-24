import { useEffect, useRef, useState } from "react";
import Button from "./Button";

export default function ResultModal({
  open,
  modalFn,
  cartItems,
  buttonFn,
  checkModalFn,
  checkOut,
}) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  function getCheckOutPrice() {}

  function goCheckout() {
    modalFn();
    checkModalFn();
  }

  const style = "text-2xl pl-2 pt-2";

  return (
    <dialog
      ref={dialog}
      onClose={modalFn}
      className="w-96 h-96 bg-stone-300 px-4 py-2"
    >
      <h1 className={style}>Your cart</h1>
      <ul className="text-stone-900 mt-2 pl-5">
        {cartItems.map((order) => {
          return (
            <li key={order.item.id} className="flex gap-2 mb-1">
              <p>{order.item.name}</p>
              <p className="font-bold">${order.item.price}</p>
              <div className="flex ml-auto gap-2">
                <Button
                  clickFunction={() =>
                    buttonFn("+", order.item.id, order.quantity)
                  }
                >
                  +
                </Button>

                <p>{order.quantity}</p>

                <Button
                  clickFunction={() =>
                    buttonFn("-", order.item.id, order.quantity)
                  }
                >
                  -
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
      <div>
        <h1 className={style}>Total Price</h1>
        <h1 className={style}>${checkOut.toFixed(2)}</h1>
      </div>
      <div className="flex gap-3 mt-2">
        <Button clickFunction={goCheckout}>Go Checkout</Button>
        <Button clickFunction={modalFn}>Close</Button>
      </div>
    </dialog>
  );
}
