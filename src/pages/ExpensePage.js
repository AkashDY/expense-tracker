import React from "react";
import ExpenseForm from "../components/Auth/ExpenseForm";
import { useState } from "react";

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);
  const handleFormSubmit = (formData) => {
    // Process the form data or send it to the server
    console.log(formData);
    setExpenses((prevExpenses) => [...prevExpenses, formData]);
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
