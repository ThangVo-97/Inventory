import { ToggleButton, ToggleButtonGroup, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { categories } from '../utils/constant';

export default function CategoryFilterBar({ 
  selectedCategory,
  onCategoryChange 
}) {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 3 }}>
      <ToggleButtonGroup
        value={selectedCategory}
        exclusive
        onChange={(_, newCategory) => onCategoryChange(newCategory)}
        aria-label="item categories"
        sx={{
          flexWrap: 'wrap',
          gap: 1,
          '& .MuiToggleButton-root': {
            px: 2,
            py: 1,
            borderRadius: 1,
            border: `1px solid ${theme.palette.divider}`,
            '&.Mui-selected': {
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              '&:hover': {
                bgcolor: theme.palette.primary.dark
              }
            }
          }
        }}
      >
        {categories.map((category) => (
          <ToggleButton 
            key={category} 
            value={category}
            aria-label={category.toLowerCase()}
          >
            {category}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}