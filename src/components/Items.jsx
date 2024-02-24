import foods from "../foods";
import Item from "./Item";

export default function Items({ onAdd, meals }) {
  return (
    <div className="mt-20 flex justify-center">
      <ul className="grid grid-cols-3 gap-2">
        {meals.map((foodItem) => {
          return (
            <Item
              key={foodItem.id}
              id={foodItem.id}
              image={foodItem.image}
              name={foodItem.name}
              price={foodItem.price}
              desc={foodItem.description}
              addFn={onAdd}
            />
          );
        })}
      </ul>
    </div>
  );
}
