import React, { FormEvent, useEffect, useState } from "react";
import DatePicker from "react-datepicker";

interface BestBeforeEditItemFormProps {
  initialData: Item;
  editItem: (editedItem: Item) => void;
  deleteItem: (deletedItem: Item) => void;
}

const BestBeforeEditItemForm = ({
  initialData,
  editItem,
  deleteItem,
}: BestBeforeEditItemFormProps) => {
  const [userInput, setUserInput] = useState(initialData);
  const [datePickerVisible, setDatePickerVisible] = useState(
    initialData.bestBeforeDate ? true : false
  );
  const [bbDate, setbbDate] = useState<Date>(
    initialData.bestBeforeDate ?? new Date()
  );

  useEffect(() => {
    setUserInput(initialData);
    setDatePickerVisible(initialData.bestBeforeDate ? true : false);
    setbbDate(initialData.bestBeforeDate ?? new Date());
  }, [initialData]);

  const handleDatePickerCheckboxChange = () => {
    setDatePickerVisible(!datePickerVisible);
    setbbDate(new Date());
    setUserInput((prevFormData) => ({
      ...prevFormData,
      bestBeforeDate: new Date(),
    }));
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
    editItem(userInput);
  };

  const handleDelete = () => {
    deleteItem(initialData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Item:
          <input
            type="text"
            name="name"
            value={userInput.name}
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
            className="dropdowns"
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
          Update Item
        </button>
      </form>
      <button className="btn btn-outline-danger" onClick={handleDelete}>
        Delete Item
      </button>
    </>
  );
};

export default BestBeforeEditItemForm;
