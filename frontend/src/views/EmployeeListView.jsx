import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import employeeService from '../services/EmployeeService';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Container,
  Typography,
  Paper,
} from '@mui/material';

const EmployeeListView = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await employeeService.getEmployees();
        setEmployees(data);
      } catch (error) {
        setError('Failed to fetch employees: ' + error.message);
      }
    };
    fetchEmployees();
  }, []);

  const viewEmployeeDetails = (id) => {
    navigate(`/employees/${id}`);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom sx={{textAlign: 'center'}}>
        Meet your colleagues!
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      
      <List>
        {employees.map((employee) => (
          <Paper key={employee.id} elevation={3} sx={{ marginBottom: 2 }}>
            <ListItem onClick={() => viewEmployeeDetails(employee.id)} sx={{'&:hover': {cursor: 'pointer'}}} button>
              <ListItemAvatar>
                <Avatar
                  alt={`${employee.name} ${employee.last_name}`}
                  src={`https://avatar.iran.liara.run/public/${employee.id}`}
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${employee.name} ${employee.last_name}`}
                secondary={employee.position}
              />
            </ListItem>
          </Paper>
        ))}
      </List>
    </Container>
  );
};

export default EmployeeListView;
