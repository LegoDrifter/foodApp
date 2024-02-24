import { useRef, useEffect } from "react";
import Button from "./Button";
import Input from "./Input";

export default function CheckoutModal({ open, modalFn, checkOut, cartItems }) {
  const dialog = useRef();

  const fullName = useRef();
  const email = useRef();
  const street = useRef();
  const postalCode = useRef();
  const city = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  const handleClose = () => {
    modalFn();
  };

  let orderData = null;

  function handleSubmit() {
    const enteredFullName = fullName.current.value;
    const enteredEmail = email.current.value;
    const enteredStreet = street.current.value;
    const enteredPostalCode = postalCode.current.value;
    const enteredCity = city.current.value;
    const customer = {
      name: enteredFullName,
      email: enteredEmail,
      street: enteredStreet,
      ["postal-code"]: enteredPostalCode,
      city: enteredCity,
    };

    orderData = {
      customer: customer,
      items: [...cartItems],
    };

    console.log(orderData);

    async function updateOrders(orderData) {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await response.json();
      console.log(resData);

      if (!response.ok) {
        throw new Error("Failed to update user data.");
      }

      return resData.message;
    }
    updateOrders(orderData);
  }

  return (
    <dialog
      ref={dialog}
      onClose={modalFn}
      className="w-[680px] h-96 bg-stone-300"
    >
      <div className="pl-5">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p>Total Amount ${checkOut.toFixed(2)}</p>
        <Input label={"Full name"} ref={fullName} />
        <Input label={"E-Mail-Address"} ref={email} />
        <Input label={"Street"} ref={street} />
        <div className="flex gap-3">
          <Input label={"Postal code"} ref={postalCode} />
          <Input label={"City"} ref={city} />
        </div>
        <div className="flex gap-3 justify-end mr-5 mt-10">
          <Button className="ml-5" clickFunction={handleClose}>
            Close
          </Button>
          <Button className="ml-5" clickFunction={handleSubmit}>
            Submit Order
          </Button>
        </div>
      </div>
    </dialog>
  );
}
