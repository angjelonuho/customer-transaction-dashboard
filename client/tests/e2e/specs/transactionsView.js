describe("TransactionsView", () => {

    const transactions = [
        { id: 1, date: "2022-01-01", amount: 100, description: "Transaction 1" },
        { id: 2, date: "2022-02-01", amount: 150, description: "Transaction 2" },
        { id: 3, date: "2022-03-01", amount: 200, description: "Transaction 3" },
    ];

    beforeEach(() => {
        cy.visit("/");
        cy.login('user1', 'password1');
        cy.intercept("GET", "/transactions", {
            statusCode: 200,
            body: transactions,
          }).as("fetchTransactions");
          cy.visit("/dashboard/transactions");

    });

    it("should display filtered transactions in the table", () => {
    
        cy.get("input[type='date']").eq(0).clear().type("2022-01-01");
        cy.get("input[type='date']").eq(1).clear().type("2022-12-31");
        cy.get("input[type='number']").eq(0).clear().type("50");
        cy.get("input[type='number']").eq(1).clear().type("200");
        cy.contains("button", "Filter").click();

      });
    
      it("should display loading indicator while fetching transactions", () => {
        cy.contains("Loading...").should("be.visible");
        cy.contains("Loading...").should("not.exist");
      });
});