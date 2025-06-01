import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Link,
    Paper,
    CssBaseline,
    Avatar,
    IconButton, 
    InputAdornment,
    CircularProgress
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {AuthContext} from "../../context/AuthContext";
import API from "../../utils/api";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({email: false, password: false});
    const [loading, setLoading] = useState(false);
    const {setIsAuthenticated, setUser} = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await API.post("/auth/login", {email, password});
            localStorage.setItem("token", res.data.token);
            setUser(res.data.user);
            setIsAuthenticated(true);
            navigate("/dashboard");
        } catch (err) {
            alert("Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{
            height: "100vh",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }} >
            <CssBaseline />
            <Paper
                elevation={3}
                sx={{
                    mt: 8,
                    p: 4,
                    boxShadow: 3,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{m: 1, bgcolor: "primary.main"}}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{mt: 1, width: "100%"}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        error={errors.email}
                        helperText={errors.email ? "Invalid email format" : ""}
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        error={errors.password}
                        helperText={errors.password ? "Invalid password format" : ""}
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        // InputProps={{
                        //     endAdornment: (
                        //       <InputAdornment position="end">
                        //         <IconButton
                        //           onClick={() => setShowPassword(!showPassword)}
                        //         >
                        //           {showPassword ? <VisibilityOff /> : <Visibility />}
                        //         </IconButton>
                        //       </InputAdornment>
                        //     ),
                        //   }}
                          
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{mt: 3, mb: 2}}
                    >
                        {loading ? <CircularProgress size={24} /> : "Sign In"}
                    </Button>
                    <Box sx={{textAlign: "center"}}>
                        <Link href="/register" variant="body2">
                            Don't have an account? Sign Up
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default Login