document.addEventListener("DOMContentLoaded", function() {
  // Define variables to store budget, expenses, and balance
  let budget = 0;
  let expenses = [];
  
  // Select elements
  const budgetInput = document.querySelector('.budget_input');
  const expensesDescInput = document.querySelector('.expensess_input');
  const expensesAmountInput = document.querySelector('.expensess_amount');
  const budgetCard = document.querySelector('.budget_card');
  const expensesCard = document.querySelector('.expenses_card');
  const balanceCard = document.querySelector('.balance_card');
  const errorDiv = document.querySelector('.error_message');
  const tblData = document.querySelector('.tbl_data');

  // Function to calculate and update balance
  const updateBalance = () => {
    let totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    let balance = budget - totalExpenses;
    balanceCard.textContent = balance;
  }

  // Function to update budget card
  const updateBudgetCard = () => {
    budgetCard.textContent = budget;
    updateBalance();
  }

  // Function to update expenses card
const updateExpensesCard = () => {
  let totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  let balance = budget - totalExpenses;
  balanceCard.textContent = balance;

  const warningParagraph = document.getElementById('warning');

  if (balance < 0) {
    warningParagraph.textContent = "Expenses is more than the budget";
  } else {
    warningParagraph.textContent = ""; // Clear the warning if balance is not negative
    renderTable();
  }
};



  // Event listener for budget calculation
  document.getElementById('btn_budget').addEventListener('click', function(event) {
    event.preventDefault();
    const budgetValue = parseFloat(budgetInput.value);
    if (isNaN(budgetValue) || budgetValue <= 0) {
      errorDiv.style.display = 'block';
    } else {
      budget = budgetValue;
      updateBudgetCard();
      errorDiv.style.display = 'none';
    }
  });

  // Event listener for adding expenses
  document.getElementById('btn_expenses').addEventListener('click', function(event) {
    event.preventDefault();
    const desc = expensesDescInput.value;
    const amount = parseFloat(expensesAmountInput.value);
    if (desc.trim() === '' || isNaN(amount) || amount <= 0) {
      return;
    }
    const expense = { desc, amount };
    expenses.push(expense);
    updateExpensesCard();
    renderTable();
    expensesDescInput.value = '';
    expensesAmountInput.value = '';
  });

  // Function to render table with expenses data
  const renderTable = () => {
    tblData.innerHTML = '';
    expenses.forEach((expense, index) => {
      const row = document.createElement('div');
      row.classList.add('tbl_row');
      row.innerHTML = `
        <div>${index + 1}</div>
        <div>${expense.desc}</div>
        <div>${expense.amount}</div>
        <div>
          <button class="btn_edit" data-index="${index}">Edit</button>
          <button class="btn_delete" data-index="${index}">Delete</button>
        </div>
      `;
      tblData.appendChild(row);
    });

    // Add event listener for edit buttons
    document.querySelectorAll('.btn_edit').forEach(btn => {
      btn.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        const { desc, amount } = expenses[index];
        expensesDescInput.value = desc;
        expensesAmountInput.value = amount;
        expenses.splice(index, 1);
        updateExpensesCard();
        renderTable();
      });
    });

    // Add event listener for delete buttons
    document.querySelectorAll('.btn_delete').forEach(btn => {
      btn.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        expenses.splice(index, 1);
        updateExpensesCard();
        renderTable();
      });
    });
  };

});
