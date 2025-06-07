import {useState, useEffect} from 'react';
import {
    TextField,
    InputAdornment,
    IconButton,
    CircularProgress
} from '@mui/material';
import {Search, Clear} from '@mui/icons-material';
import API from '../utils/api';
import {debounce} from 'lodash'

const SearchBar = ({onSearchResults}) => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleSearch = async () => {
        setLoading(true);
        try {
            const res = await API.get(`/items/search?q=${encodeURIComponent(query)}`);
            onSearchResults(res.data);
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setQuery('');
        onSearchResults(null); // Resets to show all items
    };

    const debouncedSearch = debounce(handleSearch, 300)
    useEffect(()=>{
        if(query.trim()) {
            debouncedSearch()
        }
        return () => debouncedSearch.cancel();
    }, [query])

    return (
        <TextField
            fullWidth
            variant="outlined"
            placeholder="Search items by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Search />
                    </InputAdornment>
                ),
                endAdornment: (
                    <>
                        {loading && <CircularProgress size={24} />}
                        {query && (
                            <IconButton onClick={handleClear}>
                                <Clear />
                            </IconButton>
                        )}
                    </>
                )
            }}
            sx={{mb: 3}}
        />
    );
}

export default SearchBar