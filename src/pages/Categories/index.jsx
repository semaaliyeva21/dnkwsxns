import React, { useState, useRef } from "react";
import { Table, Button, Input, Space } from "antd";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useShoppingCart } from "../../services/context/ShoppingCart";
import styles from "./styles.module.css";
import "antd/dist/antd.css";
import Swal from "sweetalert2";

const Categories = () => {
  const { addToCart } = useShoppingCart();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const data = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `Clothing ${index + 1}`,
    price: Math.floor(Math.random() * 50) + 20,
  }));

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          className={styles.basketButton}
          type="primary"
          size="large"
          icon={<ShoppingCartOutlined />}
          onClick={() => handleBasketClick(record)}
        />
      ),
    },
  ];

  const handleBasketClick = (record) => {
    addToCart(record);
    Swal.fire({
      icon: "success",
      title: "Added to Basket!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        close,
      }) => (
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: "block",
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              Close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? "#1677ff" : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: "#ffc069",
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        ) : (
          text
        ),
    };
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  return (
    <div className={styles.categoriesContainer}>
      <h2 className={styles.categoriesTitle}>Categories</h2>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ defaultPageSize: 5 }}
      />
    </div>
  );
};

export default Categories;
