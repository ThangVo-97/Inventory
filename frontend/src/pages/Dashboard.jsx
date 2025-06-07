import { useState, useEffect, useContext } from "react";
import API from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import ItemList from "../components/Items/ItemList";
import {Container} from "@mui/material";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await API.get(`/items?userId=${user._id}&&role=${user.role}`)
        setItems(res.data);
        setLoading(false)
        
      } catch (err) {
        console.error("Failed to fetch items", err);
      }
    };
    fetchItems();
  }, []);

  return (
    <Container maxWidth='lg'>
      <h1>Welcome, {user?.name}!</h1>
      <ItemList items={items} loading={loading} />
    </Container>
  );
}
export default Dashboard