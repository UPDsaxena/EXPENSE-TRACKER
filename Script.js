document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('add-expense-form');
    const expenseList = document.getElementById('expenses');
  
    // Load expenses from local storage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    // Display expenses
    function displayExpenses() {
      expenseList.innerHTML = '';
      expenses.forEach(function(expense, index) {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${expense.name}: $${expense.amount}</span>
          <button class="edit-btn" data-index="${index}">Edit</button>
          <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        expenseList.appendChild(li);
      });
      // Save expenses to local storage
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  
    // Add expense
    expenseForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const name = document.getElementById('expense-name').value;
      const amount = parseFloat(document.getElementById('expense-amount').value);
      if (name && !isNaN(amount)) {
        expenses.push({ name, amount });
        displayExpenses();
        expenseForm.reset();
      } else {
        alert('Please enter valid expense details.');
      }
    });
  
    // Edit or delete expense
    expenseList.addEventListener('click', function(event) {
      if (event.target.classList.contains('edit-btn')) {
        const index = event.target.dataset.index;
        const newName = prompt('Enter new expense name:');
        const newAmount = parseFloat(prompt('Enter new amount:'));
        if (newName && !isNaN(newAmount)) {
          expenses[index] = { name: newName, amount: newAmount };
          displayExpenses();
        } else {
          alert('Please enter valid expense details.');
        }
      } else if (event.target.classList.contains('delete-btn')) {
        const index = event.target.dataset.index;
        if (confirm('Are you sure you want to delete this expense?')) {
          expenses.splice(index, 1);
          displayExpenses();
        }
      }
    });
  
    // Initial display of expenses
    displayExpenses();
  });