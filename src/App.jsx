import { useState, useEffect } from "react";

import Header from "./components/Header";
import Items from "./components/Items";
import CartModal from "./components/CartModal";
import CheckoutModal from "./components/CheckoutModal";

function App() {
  const [cartVisiblityState, setCartVisibilityState] = useState(false);
  const [cartState, setCartState] = useState([]);
  const [mealsState, setMealsState] = useState([]);
  const [checkoutModalState, setCheckoutModalState] = useState(false);
  const [checkOut, setCheckout] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/meals")
      .then((response) => response.json())
      .then((data) => {
        setMealsState(data);
      });
  }, []);

  useEffect(() => {
    function totalCheckout() {
      let totalPrice = 0;
      cartState.forEach((order) => {
        totalPrice += order.quantity * order.item.price;
      });
      setCheckout(totalPrice);
    }
    totalCheckout();
  }, [cartState]);

  function handleAddClick(id) {
    const itemID = mealsState.find((item) => item.id === id);
    console.log(checkItem(itemID.id));
    console.log(itemID.id);
    console.log(id);

    if (checkItem(itemID.id)) {
      setStateHelper("+", itemID.id);
    } else {
      setCartState((prevState) => [
        ...prevState,
        { item: itemID, quantity: 1 },
      ]);
    }
  }

  function setStateHelper(identifier, id) {
    setCartState((prevState) => {
      return prevState.map((item) => {
        if (item.item.id === id) {
          return {
            ...item,
            quantity:
              identifier === "+" ? item.quantity + 1 : item.quantity - 1,
          };
        }
        return item;
      });
    });
  }

  function checkItem(id) {
    let check = false;
    cartState.forEach((stateItem) => {
      if (stateItem.item.id === id) {
        check = true;
      }
    });
    return check;
  }

  function handleClick() {
    setCartVisibilityState((prevState) => !prevState);
  }

  function handleCheckout() {
    setCheckoutModalState((prevState) => !prevState);
    console.log(checkoutModalState);
  }

  function handleQuantity(identifier, id, quantity) {
    if (quantity === 1 && identifier === "-") {
      setCartState((prevState) => {
        return prevState.filter((item) => item.item.id !== id);
      });
    } else {
      setStateHelper(identifier, id);
    }
  }

  return (
    <div className="min-h-screen bg-stone-600 mx-auto">
      <CheckoutModal
        open={checkoutModalState}
        modalFn={handleCheckout}
        checkOut={checkOut}
        cartItems={cartState}
      />
      <CartModal
        key={cartVisiblityState}
        open={cartVisiblityState}
        modalFn={handleClick}
        checkModalFn={handleCheckout}
        cartItems={cartState}
        buttonFn={handleQuantity}
        checkOut={checkOut}
      />
      <Header modalFn={handleClick} cartCnt={cartState.length} />
      <Items onAdd={handleAddClick} meals={mealsState} />
    </div>
  );
}

export default App;
