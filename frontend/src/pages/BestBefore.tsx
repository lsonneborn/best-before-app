import React, { useEffect } from "react";
import { useState } from "react";

import BestBeforeAddItemForm from "../components/BestBeforeAddItemForm";
import BestBeforeEditItemForm from "../components/BestBeforeEditItemForm";
import PopupModal from "../components/PopupModal";
import NameFilter from "../components/NameFilter";
import InStockFilter from "../components/InStockFilter";
import CategoryFilter from "../components/CategoryFilter";

interface BestBeforeProps {
  initialData: Item[];
}

const BestBefore = ({ initialData }: BestBeforeProps) => {
  const [listData, setListData] = useState(initialData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [initialDataForEdit, setInitialDataForEdit] = useState({
    _id: 0,
    name: "",
    bestBeforeDate: new Date(),
    inStock: false,
    storeDays: 0,
    category: "food",
  });
  const [filteredItems, setFilteredItems] = useState(initialData);
  const [nameFilter, setNameFilter] = useState("");
  const [inStockFilter, setinStockFilter] = useState<boolean | undefined>(
    undefined
  );
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const today = new Date();
  const apiEndpoint = "http://localhost:8080/items";

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      setIsLoading(false);
      console.log("Successfully fetched Data:");
      const listDataWithDates = data.map((item: Item) => ({
        ...item,
        bestBeforeDate: new Date(item.bestBeforeDate),
      }));
      setListData(...[listDataWithDates]);
      setFilteredItems(...[listDataWithDates]);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setIsLoading(false);
    }
  };

  const addItem = async (newItem: Item) => {
    try {
      const jsonData = {
        name: newItem.name,
        inStock: newItem.inStock,
        bestBeforeDate: new Date(newItem.bestBeforeDate),
        storeDays: newItem.storeDays,
        category: newItem.category,
      };
      const response = await fetch(apiEndpoint + "/create", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (response.ok) {
        console.log("Data successfully posted.");
        const newItemData = await response.json();

        await fetchItems();
        setShowAddForm(false);
      } else {
        console.error("Error posting data:", response.statusText);
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const editItem = async (editedItem: Item) => {
    try {
      const jsonData = {
        name: editedItem.name,
        inStock: editedItem.inStock,
        bestBeforeDate: editedItem.bestBeforeDate,
        storeDays: editedItem.storeDays,
        category: editedItem.category,
      };
      const response = await fetch(apiEndpoint + "/" + editedItem._id, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (response.ok) {
        console.log("Data successfully updated.");
        try {
          editedItem = await response.json();
          await fetchItems();
          setShowEditForm(false);
        } catch (error) {
          console.error("Error updating data:", error);
        }
      } else {
        console.error("Error updating data:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  };

  const deleteItem = async (deletedItem: Item) => {
    try {
      const response = await fetch(apiEndpoint + "/" + deletedItem._id, {
        method: "DELETE",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        let updatedList = listData.filter(
          (item: Item) => item._id !== deletedItem._id
        );
        setListData([...updatedList]);
        setFilteredItems([...updatedList]);
        setShowEditForm(false);
      } else {
        console.error("Error deleting data:", response.statusText);
      }
    } catch (error) {
      console.log("Error deleting Item: ", error);
    }
  };

  const handleRowClick = (data: any) => {
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

  const handleNameChange = (keyword: string) => {
    setNameFilter(keyword);
    applyFilters(keyword, inStockFilter, categoryFilter);
  };

  const handleInStockChange = (inStock: boolean | undefined) => {
    setinStockFilter(inStock);
    applyFilters(nameFilter, inStock, categoryFilter);
  };

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
    applyFilters(nameFilter, inStockFilter, category);
  };

  const applyFilters = (
    nameFilter: string,
    inStockFilter: boolean | undefined,
    categoryFilter: string
  ) => {
    const nameKeyword = nameFilter.toLowerCase();
    const filteredByName = listData.filter((item) => {
      return item.name.toLowerCase().includes(nameKeyword);
    });

    if (inStockFilter !== undefined && categoryFilter !== "") {
      const filteredByNameAndInStock = filteredByName.filter((item) => {
        return item.inStock === inStockFilter;
      });
      const filteredByAll = filteredByNameAndInStock.filter((item) => {
        return item.category.includes(categoryFilter);
      });
      setFilteredItems(filteredByAll);
    } else if (inStockFilter !== undefined && categoryFilter === "") {
      const filteredByNameAndInStock = filteredByName.filter((item) => {
        return item.inStock === inStockFilter;
      });
      setFilteredItems(filteredByNameAndInStock);
    } else if (inStockFilter === undefined && categoryFilter !== "") {
      const filteredByCategory = filteredByName.filter((item) => {
        return item.category.includes(categoryFilter);
      });
      setFilteredItems(filteredByCategory);
    } else {
      setFilteredItems(filteredByName);
    }
  };

  return (
    <>
      <div className="list-container">
        <table>
          <tbody>
            <tr>
              <td>
                <NameFilter input={nameFilter} onChange={handleNameChange} />
                <label>At home?</label>
                <InStockFilter
                  value={inStockFilter}
                  onChange={handleInStockChange}
                />
                <label>Category</label>
                <CategoryFilter
                  value={categoryFilter}
                  onChange={handleCategoryChange}
                />
              </td>
              <td>
                <button
                  className="btn btn-primary addButton"
                  onClick={() => setShowAddForm(true)}
                >
                  +
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        {isLoading ? (
          <div>Loading Data...</div>
        ) : (
          <>
            <PopupModal
              isOpen={showAddForm}
              onClose={() => setShowAddForm(false)}
            >
              <BestBeforeAddItemForm addItem={addItem} />
            </PopupModal>

            <PopupModal
              isOpen={showEditForm}
              onClose={() => setShowEditForm(false)}
            >
              <BestBeforeEditItemForm
                initialData={initialDataForEdit}
                editItem={editItem}
                deleteItem={deleteItem}
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
                  filteredItems.map((data: Item, key) => {
                    return (
                      <tr
                        key={data._id}
                        className={
                          data["bestBeforeDate"] > today &&
                          data["bestBeforeDate"] != null
                            ? data["inStock"]
                              ? ""
                              : "table-warning"
                            : "table-danger"
                        }
                        onClick={() => handleRowClick(data)}
                      >
                        <td>{data.name}</td>
                        <td>
                          {data.bestBeforeDate === null
                            ? "-"
                            : formatDate(data.bestBeforeDate)}
                        </td>{" "}
                        <td>{data.inStock ? "yes" : "no"}</td>{" "}
                        <td>{data.category}</td>{" "}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>No results</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default BestBefore;
