import React, { useEffect } from "react";
import { useState } from "react";

import BestBeforeForm from "../../components/BestBeforeForm";
import PopupModal from "../../components/PopupModal";
import FilterForm from "../../components/FilterForm";

interface BestBeforeProps {
  jsonData: Item[];
}

const BestBefore = ({ jsonData }: BestBeforeProps) => {
  const [listData, setListData] = useState(jsonData);
  const [showFilter, setShowFilter] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [filteredItems, setFilteredItems] = useState(jsonData);

  const today = new Date();

  const addItem = (newItem: Item) => {
    let copy = [...listData];
    copy = [
      ...copy,
      {
        id: listData.length + 1,
        item: newItem.item,
        inStock: newItem.inStock,
        bestBeforeDate: newItem.bestBeforeDate,
        category: newItem.category,
      },
    ];
    setListData(copy);
    setShowForm(false);
  };

  const formatDate = (date: Date | string | null): string => {
    if (!date) {
      return "-"; // Handle the case when date is null or undefined
    }

    const dateObj = typeof date === "string" ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) {
      return "-"; // Handle the case when date is an invalid Date object or an invalid date string
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
      const results = jsonData.filter((items) => {
        return items.item.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFilteredItems(results);
    } else {
      setFilteredItems(jsonData);
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
                className="btn btn-outline-primary"
                onClick={() => setShowFilter(true)}
              >
                Filter
              </button>
            </td>
            <td>
              <button
                className="btn btn-primary addButton"
                onClick={() => setShowForm(true)}
              >
                Add item
              </button>
            </td>
          </tr>
        </table>

        <PopupModal isOpen={showFilter} onClose={() => setShowFilter(false)}>
          <FilterForm />
        </PopupModal>

        <PopupModal isOpen={showForm} onClose={() => setShowForm(false)}>
          <BestBeforeForm addItem={addItem} />
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
