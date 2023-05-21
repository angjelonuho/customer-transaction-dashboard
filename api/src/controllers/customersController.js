// Mock customers db
const { customers } = require('../models/customers.json');
// Mock users db
const { users } = require('../models/users.json');

exports.customers = (req, res) => {
  const loggedInUserId = req.userId;
  const loggedInUser = users.find(user => user.id === loggedInUserId);
  if (!loggedInUser) {
    // If the user is not found, return an error response
    return res.status(404).json({ error: 'User not found' });
  }

  if (loggedInUser.role === 'admin') {
    // If the user is an admin, return all customers
    res.json(customers);
  } else {
    // If the user is not an admin, filter the customers based on the user's access
    const userCustomers = customers.filter(customer => customer.userId === loggedInUserId);
    res.json(userCustomers);
  }
}
