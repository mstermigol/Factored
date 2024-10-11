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
import '../assets/global.css';

const RegisterView = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('');
  const [description, setDescription] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [skills, setSkills] = useState([{ name: '', proficiency: 0 }]);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleAddSkill = () => {
    setSkills([...skills, { name: '', proficiency: 0 }]);
  };

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...skills];
    if (field === 'name') {
      updatedSkills[index].name = value;
    } else {
      updatedSkills[index].proficiency = parseFloat(value) || 0;
    }
    setSkills(updatedSkills);
  };

  const handleRegister = async () => {
    setError('');
    setFieldErrors({});
    
    const newFieldErrors = {};
    if (!username) newFieldErrors.username = 'Username is required.';
    if (!password) newFieldErrors.password = 'Password is required.';
    if (!name) newFieldErrors.name = 'First name is required.';
    if (!lastName) newFieldErrors.lastName = 'Last name is required.';
    if (!position) newFieldErrors.position = 'Position is required.';
    if (!description) newFieldErrors.description = 'Description is required.';
    
    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      setError('Please fix the errors before submitting.');
      return;
    }

    if (skills.length < 5) {
      setError('You must provide at least 5 skills.');
      return;
    }
  
    try {
      await employeeService.register({
        username,
        password,
        name,
        last_name: lastName,
        position,
        description,
        skills: skills,
      });
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('Username is already taken.');
      } else {
        setError('There was an issue. Please try again later.');
      }
    }
  };
  
  const handleFieldChange = (setter) => (e) => {
    setter(e.target.value);
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    if (error) setError('');
  };

  return (
    <Container
      component="main"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 4 }}
    >
      <Paper elevation={3} sx={{ padding: { xs: 2, sm: 4 }, width: '100%', maxWidth: '450px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h4">
            Register
          </Typography>
          <Box component="form" sx={{ mt: 1, width: '100%' }}>
            <Grid container direction="column" spacing={2}>
              <Grid  xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={username}
                  onChange={handleFieldChange(setUsername)}
                  error={!!fieldErrors.username}
                  helperText={fieldErrors.username}
                />
              </Grid>
              <Grid  xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="password"
                  id="password"
                  label="Password"
                  name="password"
                  value={password}
                  onChange={handleFieldChange(setPassword)}
                  error={!!fieldErrors.password}
                  helperText={fieldErrors.password}
                />
              </Grid>
              <Grid  xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="First Name"
                  name="name"
                  autoComplete="given-name"
                  autoFocus
                  value={name}
                  onChange={handleFieldChange(setName)}
                  error={!!fieldErrors.name}
                  helperText={fieldErrors.name}
                />
              </Grid>
              <Grid  xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={handleFieldChange(setLastName)}
                  error={!!fieldErrors.lastName}
                  helperText={fieldErrors.lastName}
                />
              </Grid>
              <Grid  xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="position"
                  label="Position"
                  name="position"
                  value={position}
                  onChange={handleFieldChange(setPosition)}
                  error={!!fieldErrors.position}
                  helperText={fieldErrors.position}
                />
              </Grid>
              <Grid  xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  value={description}
                  onChange={handleFieldChange(setDescription)}
                  error={!!fieldErrors.description}
                  helperText={fieldErrors.description}
                />
              </Grid>
              {skills.map((skill, index) => (
                <Grid xs={12} key={index}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label={`Skill ${index + 1} Name`}
                    value={skill.name}
                    onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                    error={!skill.name && !!fieldErrors.skills}
                    helperText={!skill.name ? (
                      <span className="text-red">Skill name is required.</span>
                    ) : ''}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="number"
                    label={`Skill ${index + 1} Proficiency (0-100)`}
                    value={skill.proficiency * 100}
                    onChange={(e) => handleSkillChange(index, 'proficiency', e.target.value / 100)}
                    error={(skill.proficiency < 0 || skill.proficiency > 1) && !!fieldErrors.skills}
                    helperText={(skill.proficiency < 0 || skill.proficiency > 1) ? (
                      <span className="text-red">Skill proficiency must be greater than 0 and less than or equal to 100.</span> // Apply custom CSS class
                    ) : ''}
                  />
                </Grid>
              ))}
              <Grid  xs={12}>
                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  onClick={handleAddSkill}
                >
                  Add Another Skill
                </Button>
              </Grid>
              {error && (
                <Grid  xs={12}>
                  <Typography color="error" variant="body2">
                    {error}
                  </Typography>
                </Grid>
              )}
              <Grid  xs={12}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleRegister}
                >
                  Register
                </Button>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                  <Link to="/login" style={{ textDecoration: 'none', color: 'grey'}}>
                    Login
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

export default RegisterView;
