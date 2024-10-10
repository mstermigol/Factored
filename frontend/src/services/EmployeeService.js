import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + 'employees/';

const getAuthHeaders = () => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    
    if (username && password) {
        return {
            headers: {
                'username': username,
                'password': password,
            },
        };
    }
    return {};
};

const login = async (username, password) => {
    const response = await axios.post(API_URL + 'login', null, {
        headers: {
            'username': username,
            'password': password,
        }});
    
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    localStorage.setItem('id', response.data.id);
    
    return response.data;
};

const register = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData);
    
    if (userData.username && userData.password) {
        localStorage.setItem('username', userData.username);
        localStorage.setItem('password', userData.password);
        localStorage.setItem('id', response.data.id);
    }

    return response.data;
};

const getEmployees = async () => {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
};

const getEmployee = async (id) => {
    const response = await axios.get(API_URL + id, getAuthHeaders()); 
    return response.data;
};

const updateEmployee = async (id, updatedData) => {
    const response = await axios.put(API_URL + 'update/' + id, updatedData, getAuthHeaders());
    return response.data;
};

const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('id');
};

const employeeService = {
    login,
    register,
    getEmployees,
    getEmployee,
    updateEmployee,
    logout,
};

export default employeeService;
