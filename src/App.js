import React, { useState } from 'react';
import { products } from './data';

const App = () => {
  const [values, setValue] = useState('');

  const [message, setmessage] = useState(``);
  const [price, setprice] = useState(20);

  const [images, setImages] = useState('');
  const [imageBeforeSubmitting, setImageBeforeSubmitting] =
    useState('./img/cola.png');

  let position;
  const handleProduct = (e) => {
    setImageBeforeSubmitting(e.target.value);
    setImages('');
    setValue('0');
    setmessage('');
    if (e.target.value === './img/cola.png') {
      position = 0;
    } else if (e.target.value === './img/kitkat.png') {
      position = 1;
    } else if (e.target.value === './img/faxekondi.png') {
      position = 2;
    }
    setprice(e.target.children[position].id);
  };

  const handleSubmit = (e) => {
    let totalPrice;

    if (price < values) {
      totalPrice = values - price;

      setmessage(`You got back ${totalPrice}`);

      setImages(imageBeforeSubmitting);
    } else if (price > values) {
      totalPrice = price - values;

      setmessage(
        ` You Paid ${values} kr
          but price is ${price} kr `
      );
      setImages('');
    } else if (price == values) {
      setmessage(`thx for the visit you paid ${values}`);

      setImages(imageBeforeSubmitting);
    }

    console.log(imageBeforeSubmitting);
  };

  const handlePrice = (e) => {
    setValue(Number(e.target.value));
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center ">
      <div
        className="wrapper"
        style={{ margin: '25vh auto', border: '1px solid grey' }}
      >
        <label>Select a Product</label>
        <div>
          <select onChange={handleProduct}>
            {products.map((product) => (
              <option
                value={product.productImageUrl}
                key={product.id}
                id={product.price}
              >
                {product.name} {product.price} kr
              </option>
            ))}
          </select>
        </div>
        <label className="mt-3">pay here </label>
        <div>
          <input
            value={String(values)}
            onChange={handlePrice}
            type="number"
            style={{ width: 70 }}
          ></input>
          <button onClick={handleSubmit}>Confirm</button>
        </div>
        <div className="d-block">
          <img className="img-center" src={images} alt="" width="50" />
          <p className="text-center">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
