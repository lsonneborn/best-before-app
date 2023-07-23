import React, { useEffect } from "react";
import { useState } from "react";

import BestBeforeAddItemForm from "../../components/BestBeforeAddItemForm";
import BestBeforeEditItemForm from "../../components/BestBeforeEditItemForm";
import PopupModal from "../../components/PopupModal";

interface BestBeforeProps {
  jsonData: Item[];
}

const BestBefore = ({ jsonData }: BestBeforeProps) => {
  const [listData, setListData] = useState(jsonData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [initialDataForEdit, setInitialDataForEdit] = useState({
    id: 0,
    item: "",
    bestBeforeDate: new Date(),
    inStock: false,
    category: "food",
  });
  const [searchField, setSearchField] = useState("");
  const [filteredItems, setFilteredItems] = useState(listData);

  const today = new Date();

  const addItem = (newItem: Item) => {
    let updatedList = [...listData];
    updatedList = [
      ...updatedList,
      {
        id: listData.length + 1,
        item: newItem.item,
        inStock: newItem.inStock,
        bestBeforeDate: newItem.bestBeforeDate,
        category: newItem.category,
      },
    ];
    setListData(updatedList);
    setFilteredItems(updatedList);
    setShowAddForm(false);
  };

  const editItem = (id: number, editedItem: Item) => {
    const itemIndex = listData.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      const updatedList = [...listData];

      updatedList[itemIndex] = {
        ...updatedList[itemIndex],
        item: editedItem.item,
        inStock: editedItem.inStock,
        bestBeforeDate: editedItem.bestBeforeDate,
        category: editedItem.category,
      };

      setListData(updatedList);
      setFilteredItems(updatedList);

      const keyword = searchField.toLowerCase();
      if (keyword !== "") {
        const filteredResults = updatedList.filter((item) => {
          return item.item.toLowerCase().startsWith(keyword);
        });
        setFilteredItems(filteredResults);
      }
      setShowEditForm(false);
      setInitialDataForEdit({
        id: 0,
        item: "",
        bestBeforeDate: new Date(),
        inStock: false,
        category: "food",
      });
    }
  };

  const handleRowClick = (data: Item) => {
    setShowEditForm(true);
    setInitialDataForEdit(data);
  };

  const formatDate = (date: Date | string | null): string => {
    if (!date) {
      return "-";
    }

    const dateObj = typeof date === "string" ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) {
      return "-";
    }

    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(dateObj);
  };

  const filterByName = (e: any) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = listData.filter((items) => {
        return items.item.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFilteredItems(results);
    } else {
      setFilteredItems(listData);
    }
    setSearchField(keyword);
  };

  return (
    <>
      <div className="list-container">
        <table>
          <tr>
            <td>
              <input
                type="search"
                value={searchField}
                onChange={filterByName}
                placeholder="Search item"
              />
            </td>
            <td>
              <button
                className="btn btn-primary addButton"
                onClick={() => setShowAddForm(true)}
              >
                Add item
              </button>
            </td>
          </tr>
        </table>

        <PopupModal isOpen={showAddForm} onClose={() => setShowAddForm(false)}>
          <BestBeforeAddItemForm addItem={addItem} />
        </PopupModal>

        <PopupModal
          isOpen={showEditForm}
          onClose={() => setShowEditForm(false)}
        >
          <BestBeforeEditItemForm
            initialData={initialDataForEdit}
            editItem={editItem}
          />
        </PopupModal>

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Best before</th>
              <th scope="col">At home?</th>
              <th scope="col">Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems && filteredItems.length > 0 ? (
              filteredItems.map((data, key) => {
                return (
                  <tr
                    key={data["id"]}
                    className={
                      data["bestBeforeDate"] > today
                        ? data["inStock"]
                          ? ""
                          : "table-warning"
                        : "table-danger"
                    }
                    onClick={() => handleRowClick(data)}
                  >
                    <td>{data["item"]}</td>
                    <td>
                      {data["bestBeforeDate"] === null
                        ? "-"
                        : formatDate(data["bestBeforeDate"])}
                      {/* data["bestBeforeDate"]} */}
                    </td>
                    <td>{data["inStock"] ? "yes" : "no"}</td>
                    <td>{data["category"]}</td>
                  </tr>
                );
              })
            ) : (
              <div>No results</div>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BestBefore;
