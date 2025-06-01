import { useState, useEffect, useContext } from "react";
import API from "../utils/api";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await API.get("/items");
        setItems(res.data);
      } catch (err) {
        console.error("Failed to fetch items", err);
      }
    };
    fetchItems();
  }, []);

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}