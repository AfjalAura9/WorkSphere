describe("Login Functionality", () => {
  it("Admin can log in", () => {
    cy.visit("/login");
    cy.get('input[type="email"]').type("admin@me.com"); // Admin email from your Login.jsx
    cy.get('input[type="password"]').type("123"); // Admin password from your Login.jsx
    cy.get('button[type="submit"]').click();

    // Check for admin dashboard route and welcome message
    cy.url().should("include", "/dashboard/admin");
    cy.contains("Hello, Admin"); // Text from Header.jsx for admin
  });

  it("Employee can log in", () => {
    cy.visit("/login");
    cy.get("button").contains("Employee Login").click(); // Switch to employee login

    // Use a real employee email and password from your database or test data
    cy.get('input[type="email"]').type("employee@example.com");
    cy.get('input[type="password"]').type("123"); // Default password from Manageusers.jsx
    cy.get('button[type="submit"]').click();

    // Check for employee dashboard route and welcome message
    cy.url().should("include", "/dashboard/employee");
    cy.contains("Hello,"); // All users see "Hello, <name>" in Header.jsx
  });
});
