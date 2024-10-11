import { useState, useEffect } from 'react';
import employeeService from '../services/EmployeeService';
import {
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

const ProfileView = () => {
  const [profile, setProfile] = useState({
    name: '',
    last_name: '',
    position: '',
    description: '',
  });
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const employeeId = localStorage.getItem('id');
      if (!employeeId) {
        setError('No employee ID found in local storage.');
        return;
      }

      try {
        const data = await employeeService.getEmployee(employeeId);
        const formattedSkills = data.skills.map(skill => ({
          ...skill,
          proficiency: skill.proficiency * 100,
        }));
        setProfile(data);
        setSkills(formattedSkills || []);
      } catch {
        setError('There was an error, please try again later.');
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async () => {
    const employeeId = localStorage.getItem('id');
    const updatedProfile = {
      ...profile,
      skills: skills.map(skill => ({
        name: skill.name,
        proficiency: skill.proficiency / 100,
      })),
    };
    
    try {
      await employeeService.updateEmployee(employeeId, updatedProfile);
      setMessage('Profile updated successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      setError('Profile update failed: ' + error.message);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setError('');
  };

  const handleAddSkill = () => {
    setSkills((prevSkills) => [...prevSkills, { name: '', proficiency: 0 }]);
  };

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index][field] = value;
    setSkills(updatedSkills);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Edit Profile
      </Typography>
      {error && (
        <Alert severity="error" onClose={handleSnackbarClose} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {message && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            {message}
          </Alert>
        </Snackbar>
      )}
      <TextField
        fullWidth
        margin="normal"
        label="First Name"
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        required
        error={!profile.name}
        helperText={!profile.name ? 'First name is required.' : ''}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Last Name"
        value={profile.last_name}
        onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
        required
        error={!profile.last_name}
        helperText={!profile.last_name ? 'Last name is required.' : ''}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Position"
        value={profile.position}
        onChange={(e) => setProfile({ ...profile, position: e.target.value })}
        required
        error={!profile.position}
        helperText={!profile.position ? 'Position is required.' : ''}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Description"
        required
        multiline
        rows={4}
        value={profile.description}
        onChange={(e) => setProfile({ ...profile, description: e.target.value })}
      />
      <Typography variant="h6" gutterBottom>
        Skills
      </Typography>
      {skills.map((skill, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
          <Grid xs={6}>
            <TextField
              fullWidth
              required
              label={`Skill ${index + 1} Name`}
              value={skill.name}
              onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
              error={!skill.name}
              helperText={!skill.name ? 'Skill name is required.' : ''}
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              fullWidth
              required
              type="number"
              label={`Skill ${index + 1} Proficiency (0-100)`}
              value={skill.proficiency}
              onChange={(e) => handleSkillChange(index, 'proficiency', e.target.value)}
              error={skill.proficiency < 0 || skill.proficiency > 100}
              helperText={(skill.proficiency < 0 || skill.proficiency > 100) ? 'Skill proficiency must be between 0 and 100.' : ''}
            />
          </Grid>
        </Grid>
      ))}
      <Button variant="outlined" color="primary" onClick={handleAddSkill} sx={{ mt: 2, display: 'block', mx: 'auto' }}>
        Add Skill
      </Button>
      <Button variant="contained" color="primary" onClick={handleUpdateProfile} sx={{ mt: 3, display: 'block', mx: 'auto' }}>
        Update Profile
      </Button>
    </Container>
  );
};

export default ProfileView;
