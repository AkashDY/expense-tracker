import React from "react";
import ExpenseForm from "../components/Auth/ExpenseForm";
import { useState, useEffect } from "react";
import axios from "axios";

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        "https://expensetracker-d6e25-default-rtdb.firebaseio.com/expenses.json"
      );
      const expensesData = response.data;
      const expensesArray = [];
      for (const key in expensesData) {
        expensesArray.push(expensesData[key]);
      }
      setExpenses(expensesArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleFormSubmit = async (formData) => {
    try {
      await axios.post(
        "https://expensetracker-d6e25-default-rtdb.firebaseio.com/expenses.json",
        formData
      );
      setExpenses((prevExpenses) => [...prevExpenses, formData]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ExpenseForm onSubmit={handleFormSubmit} />
      <div>
        <h2>Expense List</h2>
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>
              Amount: {expense.amount}, Description: {expense.description},
              Category: {expense.category}, Date: {expense.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpensePage;

