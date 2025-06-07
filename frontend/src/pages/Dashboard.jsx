import {useState, useEffect, useContext} from "react";
import API from "../utils/api";
import {AuthContext} from "../context/AuthContext";
import ItemList from "../components/Items/ItemList";
import {Container} from "@mui/material";
import SearchBar from "../components/SearchBar";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user} = useContext(AuthContext);
  const [displayedItems, setDisplayedItems] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await API.get(`/items?userId=${user._id}&&role=${user.role}`)
        setItems(res.data);
        setLoading(false)
        setDisplayedItems(res.data)
      } catch (err) {
        console.error("Failed to fetch items", err);
      }
    };
    fetchItems();
  }, []);

  const handleSearchResults = (results) => {
    setDisplayedItems(results || items)
  }

  return (
    <Container maxWidth='lg' sx={{bgcolor: "#f2f6fc", p: 0}}>
      <h1>Welcome, {user?.name}!</h1>
      <SearchBar onSearchResults={handleSearchResults} />
      <ItemList items={displayedItems} loading={loading} />
    </Container>
  );
}
export default Dashboard