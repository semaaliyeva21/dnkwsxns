import { Table, Button, Space, Typography } from "antd";
import { useShoppingCart } from "../../services/context/ShoppingCart";
import "antd/dist/antd.css";
import styles from "./styles.module.css";

const { Text } = Typography;

const ShoppingCart = () => {
  const { cartItems, increaseItem, decreaseItem, removeItem } =
    useShoppingCart();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => decreaseItem(record)}>
            -
          </Button>
          <Text strong>{record.quantity}</Text>
          <Button type="primary" onClick={() => increaseItem(record)}>
            +
          </Button>
          <Button type="danger" onClick={() => removeItem(record)}>
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  const data = cartItems.map((item) => ({
    ...item,
    key: item.id,
  }));

  return (
    <div className={styles["shopping-cart-container"]} style={{margin:'25px',}}>
      <h2 className={styles["shopping-cart-title"]} style={{textAlign:'center',fontSize:'20px',}}>Shopping Cart</h2>
      <Table
        className={styles["shopping-cart-table"]}
        columns={columns}
        dataSource={data}
        pagination={{ defaultPageSize: 5 }}
      />
    </div>
  );
};

export default ShoppingCart;
