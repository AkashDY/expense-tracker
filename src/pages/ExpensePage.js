// import React from "react";
// import ExpenseForm from "../components/Auth/ExpenseForm";
// import { useState, useEffect } from "react";
// import axios from "axios";

// const ExpensePage = () => {
//   const [expenses, setExpenses] = useState([]);
//   const [editExpense, setEditExpense] = useState(null);

//   const fetchExpenses = async () => {
//     try {
//       const response = await axios.get(
//         "https://expensetracker-d6e25-default-rtdb.firebaseio.com/expenses.json"
//       );
//       const expensesData = response.data;
//       const expensesArray = [];
//       for (const key in expensesData) {
//         expensesArray.push({ id: key, ...expensesData[key]});
//       }
//       setExpenses(expensesArray);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchExpenses();
//   }, []);

//   const handleFormSubmit = async (formData) => {
//     try {
//       await axios.post(
//         "https://expensetracker-d6e25-default-rtdb.firebaseio.com/expenses.json",
//         formData
//       );
//       setExpenses((prevExpenses) => [...prevExpenses, formData]);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleDeleteExpense = async (id) => {
//     try {
//       await axios.delete(
//         `https://expensetracker-d6e25-default-rtdb.firebaseio.com/expenses/${id}.json`
//       );
//       setExpenses((prevExpenses) =>
//         prevExpenses.filter((expense) => expense.id !== id)
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleEditExpense = (expense) => {
//     setEditExpense(expense);
//   }

//   return (
//     <div>
//       <ExpenseForm onSubmit={handleFormSubmit} editExpense={editExpense} />
//       <div>
//         <h2>Expense List</h2>
//         <ul>
//           {expenses.map((expense, index) => (
//             <li key={index}>
//               Amount: {expense.amount}, Description: {expense.description},
//               Category: {expense.category}, Date: {expense.date}
//               <button onClick={() => handleDeleteExpense(expense.id)}>
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ExpensePage;

import React from "react";
import ExpenseForm from "../components/Auth/ExpenseForm";
import { useState, useEffect } from "react";
import axios from "axios";

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [editExpense, setEditExpense] = useState(null);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        "https://expensetracker-d6e25-default-rtdb.firebaseio.com/expenses.json"
      );
      const expensesData = response.data;
      const expensesArray = [];
      for (const key in expensesData) {
        expensesArray.push({ id: key, ...expensesData[key] });
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
      if (editExpense) {
        await axios.put(
          `https://expensetracker-d6e25-default-rtdb.firebaseio.com/expenses/${editExpense.id}.json`,
          formData
        );
        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense.id === editExpense.id ? formData : expense
          )
        );
        setEditExpense(null);
      } else {
        await axios.post(
          "https://expensetracker-d6e25-default-rtdb.firebaseio.com/expenses.json",
          formData
        );
        setExpenses((prevExpenses) => [...prevExpenses, formData]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(
        `https://expensetracker-d6e25-default-rtdb.firebaseio.com/expenses/${id}.json`
      );
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditExpense = (expense) => {
    setEditExpense(expense);
  };

  return (
    <div>
      <ExpenseForm onSubmit={handleFormSubmit} editExpense={editExpense} />
      <div>
        <h2>Expense List</h2>
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>
              Amount: {expense.amount}, Description: {expense.description},
              Category: {expense.category}, Date: {expense.date}
              <button onClick={() => handleDeleteExpense(expense.id)}>
                Delete
              </button>
              <button onClick={() => handleEditExpense(expense)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpensePage;

