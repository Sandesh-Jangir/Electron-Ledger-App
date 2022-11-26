var mongoose = require('mongoose');

// Connecting to DataBase.
mongoose.connect('mongodb://localhost:27017/Ledger');

// Creating the Schema.
const transactionSchema = new mongoose.Schema({
    amount : Number,
    transaction_type : String,
    date : {type: Date, default: Date.now}
})

// Initializing the Model.
const transaction = new mongoose.model("Transaction", transactionSchema);


// Form functioning.
var transType = "Credit";

function toCredit(){
    transType = "Credit";
}
function toDebit(){
    transType = "Debit";
}

function addTransaction(){
    document.getElementById("message_container").style.display = "flex";
    let value = parseInt(document.getElementById("input").value);
    let transactionDoc = new transaction();
    transactionDoc.amount = value;
    transactionDoc.transaction_type = transType;
    transactionDoc.save();
    
    // Adding the transaction to frontend.
    let date = new Date(Date.now());
    date = String(date).slice(4,15) 
    document.getElementById("main").innerHTML += `<div class="row">
    <div class="column">${date}</div>
    <div class="column">${value}</div>
    <div class="column ${String(transType).toLowerCase()}">${transType}</div>
    </div>`
}

function exitMessage(){
    document.getElementById("message_container").style.display = "none";
}

// Fetching the data.
const getTransactions = async ()=>{
    const fetchedTransactions = await transaction.find({});
    for (let i = 0; i < fetchedTransactions.length; i++) {
        const element = fetchedTransactions[i];
        let date = String(element["date"]).slice(4,15)
        document.getElementById("main").innerHTML += `<div class="row">
        <div class="column">${date}</div>
        <div class="column">${element["amount"]}</div>
        <div class="column ${String(element["transaction_type"]).toLowerCase()}">${element["transaction_type"]}</div>
    </div>`;
    }
}

getTransactions();