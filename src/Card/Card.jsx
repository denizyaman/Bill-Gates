import { useState } from "react";
import "./CardStyle.css";

function Card({
  setTotalPrice,
  totalPrice,
  count,
  basket,
  setBasket,
  title,
  id,
  price,
  image,
  setCount,
}) {
  const [amountCount, setAmountCount] = useState(0);

  const handleBuy = (event) => {
    setAmountCount(amountCount + 1);
    slowDecrease(count, parseInt(event.target.value, 10));
    setTotalPrice(totalPrice + parseInt(event.target.value));
    addBasket();
  };

  const handleBuyInput = (event) => {
    if (event.target.value) {
      setAmountCount(event.target.value);
      slowDecrease(count, parseInt(event.target.value, 10));
      setTotalPrice(totalPrice + parseInt(event.target.value));
      addBasket();
    }
  };

  const handleSell = (event) => {
    if (count > 0) {
      setAmountCount(amountCount - 1);
      slowIncrease(count, parseInt(event.target.value, 100000));
      setTotalPrice(totalPrice - parseInt(event.target.value));
      removeBasket();
    }
  };

  const addBasket = () => {
    const currentItem = basket?.find((item) => item.id === id);
    const newItem = basket?.filter((item) => item.id !== id);
    if (currentItem) {
      currentItem.amount += 1;
      setBasket([...newItem, currentItem]);
    } else {
      setBasket((prev) => [
        ...prev,
        { name: title, amount: 1, price: price, id: id },
      ]);
    }
  };

  const removeBasket = () => {
    const sellItem = basket.find((item) => item.id === id);
    const otherItem = basket.filter((item) => item.id !== id);
    sellItem.amount -= 1;
    if (sellItem.amount === 0) {
      setBasket([...otherItem]);
    } else {
      setBasket([...otherItem, sellItem]);
    }
  };

  const slowDecrease = (currentCount, decreaseAmount) => {
    const interval = 0.000001;
    const stepAmount = 100;

    const decrease = () => {
      if (currentCount > count - decreaseAmount) {
        currentCount -= stepAmount;
        setCount(currentCount);
        setTimeout(decrease, interval);
      } else {
        setCount(count - decreaseAmount);
      }
    };

    decrease();
  };

  const slowIncrease = (currentCount, increaseAmount) => {
    const interval = 0.000001;
    const stepAmount = 100;

    const increase = () => {
      if (currentCount < count + increaseAmount) {
        currentCount += stepAmount;
        setCount(currentCount);
        setTimeout(increase, interval);
      } else {
        setCount(count + increaseAmount);
      }
    };

    increase();
  };

  return (
    <div className="card-body">
      <div className="card">
        <div className="img-body">
          <img src={image} />
        </div>
        <div className="card-content">
          <h3> {title}</h3>
          <p className="price">{price} $</p>
          <div className="buttons">
            <button
              className={amountCount > 0 ? "sell-btn btn" : "btn"}
              onClick={handleSell}
              value={price}
              disabled={amountCount <= 0}
            >
              Sell
            </button>
            <input
              className="counter"
              type="text"
              value={amountCount}
              onChange={handleBuyInput}
              min={0}
              // readOnly
            />
            <button className="btn buy-btn" onClick={handleBuy} value={price}>
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
