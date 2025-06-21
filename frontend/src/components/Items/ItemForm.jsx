import { useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from '@mui/material';
import API from '../../utils/api';
import {AuthContext} from '../../context/AuthContext';
import { categories } from '../../utils/constant';

const ItemForm = ({ open, onClose, item, refreshItems }) => {
    const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: item?.name || '',
    category: item?.category || 'Electronics',
    price: item?.price || '',
    warrantyExpiry: item?.warrantyExpiry?.split('T')[0] || '',
    location: item?.location || '',
    userId: user?._id
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (item) {
        await API.put(`/items/${item._id}`, formData);
      } else {
        await API.post('/items', formData);
      }
      onClose();
    } catch (err) {
      console.error('Failed to save item', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{item ? 'Edit Item' : 'Add New Item'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <TextField
            select
            margin="dense"
            label="Category"
            fullWidth
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            required
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Warranty Expiry"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.warrantyExpiry}
            onChange={(e) => setFormData({...formData, warrantyExpiry: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Location"
            fullWidth
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {item ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
export default ItemForm