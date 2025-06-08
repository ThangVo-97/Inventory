import {useState, useEffect, useMemo} from 'react';
import {Button, Typography, Grid, CircularProgress, FormGroup, FormControlLabel, Switch} from '@mui/material';
import API from '../../utils/api';
import ItemForm from './ItemForm';
import ItemCard from './ItemCard';
import CategoryFilterBar from '../CategoryFilterBar';

const ItemList = ({items, loading}) => {
    const [openForm, setOpenForm] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [showArchiveItem, setShowArchiveItem] = useState(false)
    const [filteredItems, setFilteredItems] = useState()
    const [total, setTotal] = useState(0)

    const handleDelete = async (id) => {
        try {
            await API.delete(`/items/${id}`);
            //   setItems(items.filter(item => item._id !== id));
        } catch (err) {
            console.error('Failed to delete item', err);
        }
    };

    useEffect(() => {
        filteredItems && setTotal(filteredItems.length)
    }, [filteredItems])

    useEffect(() => {
        setFilteredItems(items)
    }, [items])

    useEffect(() => {
        if(showArchiveItem === false && selectedCategory === 'All'){
            setFilteredItems(items);
            return
        }
        const fetchItems = async () => {
            try {
                const res = await API.get(`/items/filter-item?category=${selectedCategory}&archive=${showArchiveItem}`)
                  setFilteredItems(res.data);
                //   setLoading(false)
                //   setDisplayedItems(res.data)
            } catch (err) {
                console.error("Failed to fetch items", err);
            }
        };
        fetchItems();

    }, [showArchiveItem, selectedCategory])

    if (loading) return <CircularProgress />;
    return (
        <div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Typography variant="h4" gutterBottom>
                    Your Inventory: {total}
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => {
                        setCurrentItem(null);
                        setOpenForm(true);
                    }}
                    sx={{mb: 3}}
                >
                    Add New Item
                </Button>
            </div>

            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <CategoryFilterBar
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />
                <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked={showArchiveItem} onChange={() => setShowArchiveItem(!showArchiveItem)} />} label="Archive Items" labelPlacement='start' />
                </FormGroup>
            </div>

            <Grid container spacing={3} xs={2} sx={{display: 'flex', width: '100%'}}>
                {(filteredItems).map((item) => (
                    <Grid item key={item._id} xs={12} sm={6} md={4} lg={3} sx={{width: '23%', minWidth: '200px'}}>
                        <ItemCard
                            item={item}
                            onEdit={() => {
                                setCurrentItem(item);
                                setOpenForm(true);
                            }}
                            onDelete={() => handleDelete(item._id)}
                        />
                    </Grid>
                ))}
            </Grid>

            <ItemForm
                open={openForm}
                onClose={() => setOpenForm(false)}
                item={currentItem}
            // refreshItems={fetchItems}
            />
        </div>
    );
}

export default ItemList