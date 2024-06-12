import "./App.css";
import Card from "./Card/Card";
import { data } from "./Data";
import { useState } from "react";

import Header from "./Header/Header";
import Navbar from "./Navbar/Navbar";
import Summary from "./Summary/Summary";

function App() {
  const [count, setCount] = useState(100000000000);
  const [basket, setBasket] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <>
      <Header />
      <Navbar count={count} />
      <div className="card-container">
        {data.map((eachProduct) => {
          return (
            <Card
              key={eachProduct.id}
              id={eachProduct.id}
              title={eachProduct.title}
              price={eachProduct.price}
              image={eachProduct.image}
              count={count}
              setCount={setCount}
              basket={basket}
              setBasket={setBasket}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
            />
          );
        })}
      </div>
      {basket.length > 0 && <Summary basket={basket} totalPrice={totalPrice} />}
    </>
  );
}

export default App;
