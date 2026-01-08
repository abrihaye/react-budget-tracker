// LIBRARIES INCLUDE
const fs = require('fs');

let ledger = [];

if (fs.existsSync('ledger.json'))
{
    console.log("ledger.json exists");
    ledger = JSON.parse(fs.readFileSync('ledger.json'));
}

const addExpense = (description, amount, date) => { 
    const uniqueId = ledger.length + 1;

    const expense = {
        id: uniqueId,
        description: description,
        amount: amount,
        date: date
    };
    ledger.push(expense);
}

const expense1 = {
    id: 1,
    description: "Mc Donald's",
    amount: 14.58
};
expense1.date = "2025-12-31";
expense1.amount = 20;

const expense2 = {
    id: 2,
    description: "Netflix",
    amount: 10,
    date: "2025-12-30"
}

let totalSpent = 0;

addExpense("HydroQuebec", 100, "2026-01-01");
addExpense(expense1.description, expense1.amount, expense1.date);
addExpense(expense2.description, expense2.amount, expense2.date);


console.log(ledger);

ledger.forEach((expense) => { 
    totalSpent += expense.amount;
});

console.log("Total Amount spent : ", totalSpent, "$");

const data = JSON.stringify(ledger, null, 2);
fs.writeFileSync('ledger.json', data);
