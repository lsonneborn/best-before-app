import React, { FormEvent } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";

interface BestBeforeFormProps {
  addItem: (newItem: Item) => void;
}

const BestBeforeForm = ({ addItem }: BestBeforeFormProps) => {
  const [userInput, setUserInput] = useState({
    id: 0,
    item: "",
    bestBeforeDate: new Date(),
    inStock: false,
    category: "food",
  });
  const [datePickerVisible, setDatePickerVisible] = useState(true);
  const [bbDate, setbbDate] = useState<Date>(new Date());

  const handleDatePickerCheckboxChange = () => {
    setDatePickerVisible(!datePickerVisible);
  };

  const handleDateChange = (date: Date) => {
    setbbDate(date);
    setUserInput((prevFormData) => ({ ...prevFormData, bestBeforeDate: date }));
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setUserInput((prevFormData) => ({ ...prevFormData, [name]: inputValue }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addItem(userInput);
    setUserInput({
      id: 0,
      item: "",
      bestBeforeDate: new Date(),
      inStock: false,
      category: "food",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Item:
        <input
          type="text"
          name="item"
          value={userInput.item}
          onChange={handleChange}
          placeholder="Enter item name"
        />
      </label>
      {/* <label>
        Has due date?
        <input
          type="checkbox"
          checked={datePickerVisible}
          onChange={handleDatePickerCheckboxChange}
        />
      </label> */}
      {datePickerVisible && (
        <label>
          Best before:
          <DatePicker selected={bbDate} onChange={handleDateChange} />
        </label>
      )}
      <label>
        At home?
        <input
          type="checkbox"
          name="inStock"
          checked={userInput.inStock}
          onChange={handleChange}
        />
      </label>
      <label>
        Category:
        <select
          name="category"
          value={userInput.category}
          onChange={handleChange}
          placeholder="Enter category"
        >
          <option value="food">food</option>
          <option value="cosmetics">cosmetics</option>
          <option value="houseware">housewares</option>
          <option value="pharmaceuticals">pharmaceuticals</option>
          <option value="other">other</option>
        </select>
      </label>
      <button className="btn btn-primary" type="submit">
        Add New Item
      </button>
    </form>
  );
};

export default BestBeforeForm;
