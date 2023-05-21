// Mock transactions db
const { transactions } = require('../models/transactions.json')

exports.allTransactions = (req, res) => {
    res.json(transactions);
};

exports.transactionsById = (req, res) => {
    const customerId = parseInt(req.params.id);
    // Filter transactions based on the provided customer ID
    const customerTransactions = transactions.filter(
        (transaction) => transaction.customerId === customerId
    );

    res.json(customerTransactions);
};
