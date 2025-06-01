import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
  Box,
  Divider,
  Avatar
} from '@mui/material';
import {Edit, Delete, ShoppingBag, LocationOn, CalendarToday} from '@mui/icons-material';

const ItemCard = ({item, onEdit, onDelete}) => {

  const categoryColors = {
    Electronics: 'error.main',
    Furniture: 'warning.main',
    Clothing: 'success.main'
  };

  return (
    <Card sx={{
      maxWidth: 345,
      m: 2,
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: 6
      },
      borderRadius: 2
    }}>
      {/* Header with Category Chip */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        bgcolor: 'background.default'
      }}>
        <Chip
          label={item.category}
          sx={{ 
            bgcolor: categoryColors[item.category] || 'primary.main',
            fontWeight: 'bold',
            color: 'white'
          }}
          size="small"
        />
        <Avatar sx={{bgcolor: 'primary.light'}}>
          <ShoppingBag fontSize="small" />
        </Avatar>
      </Box>

      {/* Content */}
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" sx={{fontWeight: 'bold'}}>
          {item.name}
        </Typography>

        <Box sx={{display: 'flex', alignItems: 'center', mb: 1}}>
          <Typography variant="body2" color="text.secondary" sx={{display: 'flex', alignItems: 'center'}}>
            <LocationOn fontSize="small" sx={{mr: 0.5}} />
            {item.location}
          </Typography>
        </Box>

        <Divider sx={{my: 1.5}} />

        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography variant="body2">
            <Box component="span" sx={{fontWeight: 'bold'}}>Price:</Box> ${item.price}
          </Typography>

          <Typography variant="body2" sx={{display: 'flex', alignItems: 'center'}}>
            <CalendarToday fontSize="small" sx={{mr: 0.5}} />
            {new Date(item.warrantyExpiry).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>

      {/* Action Buttons */}
      <CardActions sx={{
        display: 'flex',
        justifyContent: 'space-between',
        px: 2,
        pb: 2
      }}>
        <Button
          size="small"
          startIcon={<Edit />}
          onClick={onEdit}
          variant="outlined"
          sx={{
            textTransform: 'none',
            borderRadius: 1
          }}
        >
          Edit
        </Button>
        <Button
          size="small"
          startIcon={<Delete />}
          onClick={onDelete}
          variant="outlined"
          color="error"
          sx={{
            textTransform: 'none',
            borderRadius: 1
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;