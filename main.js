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
}

function exitMessage(){
    document.getElementById("message_container").style.display = "none";
}

// Fetching the data.
const getTransactions = async ()=>{
    const fetchedTransactions = await transaction.find({});
}

getTransactions();