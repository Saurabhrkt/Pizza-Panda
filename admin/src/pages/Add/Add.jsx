import React from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function Add({ url }) {
  const [image, setImage] = useState(null);
  const[data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitHandler =async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    const response = await axios.post(`${url}/api/food/add`, formData);
    if(response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "",
      });
      setImage(null);
      toast.success(response.data.message);
    } else {
      toast.error("Failed to add item");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>upload image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>

          <input
            onChange={onChangeHandler} value={data.name}
            type="text"
            name="name"
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="add-product-description">
          <p>product description</p>
          <textarea
            onChange={onChangeHandler} value={data.description}
            name="description"
            rows="6"
            placeholder="Enter product description"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category" required>
              <option value="">
                Select category
              </option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desert">Desert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler} value={data.price}
              type="number"
              name="price"
              placeholder="Enter product price"
              required
            />
          </div>
        </div>
        <button type="submit" className="add-btn">Add</button>
      </form>
    </div>
  );
}

export default Add;
