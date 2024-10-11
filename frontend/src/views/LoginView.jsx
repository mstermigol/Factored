import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import employeeService from '../services/EmployeeService';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

const LoginView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    setUsernameError(false);
    setPasswordError(false);

    if (!username || !password) {
      if (!username) setUsernameError(true);
      if (!password) setPasswordError(true);
      setError('Username and password are required.');
      return;
    }

    try {
      await employeeService.login(username, password);
      navigate('/');
    } catch {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleUsernameErrorDismiss = (e) => {
    setUsername(e.target.value);
    if (e.target.value) {
      setUsernameError(false);
      setError('');
    }
  };

  const handlePasswordErrorDismiss = (e) => {
    setPassword(e.target.value);
    if (e.target.value) {
      setPasswordError(false);
      setError('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Container
      component="main"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <Paper elevation={3} sx={{ padding: { xs: 2, sm: 4 }, width: '100%', maxWidth: '450px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h4">
            Login
          </Typography>
          <Box component="form" sx={{ mt: 1, width: '100%' }} onKeyDown={handleKeyDown}>
            <Grid container direction="column" spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={handleUsernameErrorDismiss}
                  error={usernameError}
                  helperText={usernameError ? 'Username is required' : ''}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordErrorDismiss}
                  error={passwordError}
                  helperText={passwordError ? 'Password is required' : ''}
                />
              </Grid>
              {error && (
                <Grid size={{ xs: 12 }}>
                  <Typography color="error" variant="body2">
                    {error}
                  </Typography>
                </Grid>
              )}
              <Grid size={{ xs: 12 }}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                  <Link to="/register" style={{ textDecoration: 'none', color: 'grey'}}>
                    Register
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginView;
