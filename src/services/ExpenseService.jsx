import axios from 'axios';

const EXPENSE_BASE_API_URL = 'http://localhost:8080/expense';

export function getAllExpenses(){
    return axios.get(EXPENSE_BASE_API_URL);
}

export function createExpense(expense){
    return axios.post(EXPENSE_BASE_API_URL,expense);
}

export function getExpenseById(id){
    return axios.get(`${EXPENSE_BASE_API_URL}/${id}`);
}

export function updateExpense(id, expense){
    return axios.put(`${EXPENSE_BASE_API_URL}/${id}`, expense);
}

export function deleteExpense(id){
    return axios.delete(`${EXPENSE_BASE_API_URL}/${id}`);
}
