var mongoose = require("mongoose");

// Connecting to DataBase.
mongoose.connect("mongodb://localhost:27017/Ledger");

// Creating the Schema.
const transactionSchema = new mongoose.Schema({
  amount: Number,
  transaction_type: String,
  date: { type: Date, default: Date.now },
});

// Initializing the Model.
const transaction = new mongoose.model("Transaction", transactionSchema);

// Form functioning.
var transType = "Credit";

function toCredit() {
  transType = "Credit";
}
function toDebit() {
  transType = "Debit";
}

// Function for closing the popup message.
function exitMessage() {
  document.getElementById("message_container").style.display = "none";
}

function addTransaction() {
  document.getElementById("message_container").style.display = "flex";
  let value = parseInt(document.getElementById("input").value);
  let transactionDoc = new transaction();
  transactionDoc.amount = value;
  transactionDoc.transaction_type = transType;
  transactionDoc.save();

  // Adding the transaction to frontend.
  let date = new Date(Date.now());
  date = String(date).slice(4, 15);
  document.getElementById("main").innerHTML += `<div class="row">
    <div class="column">${date}</div>
    <div class="column">${value}</div>
    <div class="column ${String(transType).toLowerCase()}">${transType}</div>
    </div>`;
}
// Fetching the data.
const getTransactions = async () => {
  const fetchedTransactions = await transaction.find({});
  for (let i = 0; i < fetchedTransactions.length; i++) {
    const element = fetchedTransactions[i];
    let date = String(element["date"]).slice(4, 15);
    document.getElementById("main").innerHTML += `<div class="row">
        <div class="column">${date}</div>
        <div class="column">${element["amount"]}</div>
        <div class="column ${String(
          element["transaction_type"]
        ).toLowerCase()}">${element["transaction_type"]}</div>
    </div>`;
  }
};

// Function to calculate the overall performance.
const calculateOverall = async () => {
  const debitTransaction = await transaction.find({
    transaction_type: "Debit",
  });
  const creditTransaction = await transaction.find({
    transaction_type: "Credit",
  });
  let totalExpense = 0;
  let totalIncome = 0;
  // Collecting expense;
  for (const expense in debitTransaction) {
    totalExpense += debitTransaction[expense]["amount"];
  }
  // Collecting Income.
  for (const income in creditTransaction) {
    totalIncome += creditTransaction[income]["amount"];
  }
  // Calculating Balance.
  const balance = totalIncome - totalExpense;

  // Sending the values to home page.
  document.getElementById("overall_balance").innerText += ` ${balance}`;
  document.getElementById("overall_income").innerText += ` ${totalIncome}`;
  document.getElementById("overall_expense").innerText += ` ${totalExpense}`;
};

// Function to calculate monthly performance.
const calculateMonthly = async () => {
  // All Transactions.
  const allTransactions = await transaction.find({});

  // Fetching this month transactions.
  for (let i = 0; i < allTransactions.length; i++) {
    var thisMonthTransactions = [];
    const element = allTransactions[i];
    let currentMonth = new Date(Date.now());
    currentMonth = String(currentMonth).slice(4, 7);
    let elementMonth = String(element["date"]).slice(4, 7);
    if (elementMonth == currentMonth) {
      thisMonthTransactions.push(element);
    }
  }
  // Categorising this month's transactions.
  for (let i = 0; i < thisMonthTransactions.length; i++) {
    const element = thisMonthTransactions[i];
    var moneyInMonth = 0;
    var moneyOutMonth = 0;
    if(element["transaction_type"] == "Credit"){
      moneyInMonth += element["amount"];
    }
    else if(element["transaction_type"] == "Debit"){
      moneyOutMonth += element["amount"];
    }
  }

  // Adding the values to the home page.
  document.getElementById("month_balance").innerHTML += ` ${moneyInMonth-moneyOutMonth}`;
  document.getElementById("month_income").innerHTML += ` ${moneyInMonth}`;
  document.getElementById("month_expense").innerHTML += ` ${moneyOutMonth}`;
};
// Executing the functions.
calculateMonthly();
calculateOverall();
getTransactions();
