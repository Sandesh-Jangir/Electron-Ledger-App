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

var message = "Credit";

function toCredit(){
    message = "Credit";
}
function toDebit(){
    message = "Debit";
}

function addTransaction(){
    let value = parseInt(document.getElementById("input").value);
    let transactionDoc = new transaction();
    transactionDoc.amount = value;
    transactionDoc.transaction_type = message;
    transactionDoc.save();
}