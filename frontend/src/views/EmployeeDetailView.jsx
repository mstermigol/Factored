import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import employeeService from '../services/EmployeeService';
import {
  Container,
  Typography,
  Avatar,
  Paper,
  Divider,
  Box,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const EmployeeDetailView = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const data = await employeeService.getEmployee(id);
        setEmployee(data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setNotFound(true);
        } else {
          setError(true);
        }
      }
    };
    fetchEmployeeDetails();
  }, [id]);

  if (notFound) return <Typography variant="h5" color="error" sx={{ textAlign: 'center' }}>Employee not found.</Typography>;
  if (error) return <Typography variant="h5" color="error" sx={{ textAlign: 'center' }}>An error has occurred, please try again later.</Typography>;

  if (employee === null) {
    return <Typography sx={{ textAlign: 'center' }}>Loading...</Typography>;
  }

  const skillNames = employee.skills.map(skill => skill.name);
  const skillProficiencies = employee.skills.map(skill => skill.proficiency * 100);

  const data = {
    labels: skillNames,
    datasets: [
      {
        label: 'Skill Proficiency',
        data: skillProficiencies,
        backgroundColor: 'rgba(67, 77, 87, 0.2)',
        borderColor: 'rgba(67, 77, 87, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: false,
    maintainAspectRatio: false,
    scale: {
      ticks: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Grid container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Avatar
              alt={`${employee.name} ${employee.last_name}`}
              src={`https://avatar.iran.liara.run/public/${id}`}
              sx={{ width: 150, height: 150 }}
            />
          </Grid>
          <Grid item xs={12} sm={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mx: 'auto'}}>
            <Typography variant="h4" gutterBottom>
              {`${employee.name} ${employee.last_name}`}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              {employee.position}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 2 }} />

        <Typography variant="h6" gutterBottom>
          Description
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: 'normal', marginBottom: 2 }}>
          {employee.description}
        </Typography>
        
        <Divider sx={{ marginY: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Radar 
            data={data} 
            options={options}
            width={300} 
            height={300}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default EmployeeDetailView;
