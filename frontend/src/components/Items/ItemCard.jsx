import {useState} from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Button,
  Chip,
  Box,
  alpha,
  Divider,
  Avatar
} from '@mui/material';
import {ShoppingBag, LocationOn, CalendarToday} from '@mui/icons-material';
import {Edit, Delete, Image as ImageIcon} from '@mui/icons-material';

const ItemCard = ({item, onEdit, onDelete}) => {

  const categoryColors = {
    Electronics: 'error.main',
    Furniture: 'warning.main',
    Clothing: 'success.main'
  };
  const [imageError, setImageError] = useState(false);

  return (
    <Card sx={{
      position: 'relative',
      minHeight: 240,
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: 3,
      '&:hover': {
        boxShadow: 6,
        '& .MuiCardContent-root': {
          bgcolor: (theme) => alpha(theme.palette.background.paper, 0.85)
        }
      }
    }}>
      {/* Background Image */}
      <Box
        component="img"
        src="logo512.png"
        alt={item.name}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          filter: 'brightness(0.7)'
        }}
      />

      {/* Gradient Overlay */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '60%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
          zIndex: 1
        }}
      />

      {/* Content */}
      <CardContent sx={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          color: 'common.black',
          bgcolor: (theme) => alpha(theme.palette.background.paper, 0.7),
          transition: 'background-color 0.3s ease'
        }}>
        {/* Category Chip */}
        <Chip
          label={item.category}
          color="primary"
          size="small"
          sx={{ 
            mb: 1,
            alignSelf: 'flex-start',
            fontWeight: 'bold',
            backdropFilter: 'blur(4px)'
          }}
        />

        {/* Item Name */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          {item.name}
        </Typography>

        {/* Price & Warranty */}
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          mb: 2
        }}>
          <Typography variant="body2">
            ${item.price}
          </Typography>
          <Typography variant="body2">
            {item.warrantyExpiry && new Date(item.warrantyExpiry).toLocaleDateString()}
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box sx={{
          display: 'flex',
          gap: 1,
          '& .MuiButton-root': {
            color: 'common.white',
            borderColor: 'common.white',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.1)'
            }
          }
        }}>
          <Button 
            size="small" 
            startIcon={<Edit />}
            onClick={onEdit}
            color='secondary'
            variant="contained"
          >
            Edit
          </Button>
          <Button 
            size="small" 
            startIcon={<Delete />}
            onClick={onDelete}
            variant="contained"
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ItemCard;