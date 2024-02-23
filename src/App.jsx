import { useState, useEffect } from "react";

import Header from "./components/Header";
import Items from "./components/Items";
import CartModal from "./components/CartModal";
import foods from "./foods";

function App() {
  const [cartVisiblityState, setCartVisibilityState] = useState(false);
  const [cartState, setCartState] = useState([]);
  const [mealsState, setMealsState] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/meals")
      .then((response) => response.json())
      .then((data) => {
        setMealsState(data);
      });
  }, []);

  console.log(mealsState);

  function handleAddClick(id) {
    const itemID = foods.findIndex((item) => item.id === id);
    // console.log(checkItem(itemID));

    if (checkItem(itemID)) {
      setStateHelper("+", itemID);
    } else {
      setCartState((prevState) => [
        ...prevState,
        { item: foods[itemID], quantity: 1 },
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

  function handleQuantity(identifier, id, quantity) {
    if (quantity === 1) {
      setCartState((prevState) => {
        return prevState.filter((item) => item.item.id !== id);
      });
    } else {
      setStateHelper(identifier, id);
    }
  }

  return (
    <div className="min-h-screen bg-stone-600 mx-auto">
      <CartModal
        key={cartVisiblityState}
        open={cartVisiblityState}
        modalFn={handleClick}
        cartItems={cartState}
        buttonFn={handleQuantity}
      />
      <Header modalFn={handleClick} cartCnt={cartState.length} />
      <Items onAdd={handleAddClick} meals={mealsState} />
    </div>
  );
}

export default App;
