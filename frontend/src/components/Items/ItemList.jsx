import {useState, useEffect} from 'react';
import {Button, Typography, Grid, CircularProgress} from '@mui/material';
import API from '../../utils/api';
import ItemForm from './ItemForm';
import ItemCard from './ItemCard';

const ItemList = ({items, loading}) => {
    const [openForm, setOpenForm] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    const handleDelete = async (id) => {
        try {
            await API.delete(`/items/${id}`);
            //   setItems(items.filter(item => item._id !== id));
        } catch (err) {
            console.error('Failed to delete item', err);
        }
    };

    if (loading) return <CircularProgress />;

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Your Inventory
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

            <Grid container spacing={3} xs={2} sx={{display: 'flex', width: '100%'}}>
                {items.map((item) => (
                    <Grid item key={item._id} xs={12} sm={6} md={4} lg={3} sx={{width: '20%', minWidth: '200px'}}>
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