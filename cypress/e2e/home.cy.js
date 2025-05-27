describe("Deployed App Smoke Test", () => {
  it("loads the homepage", () => {
    cy.visit("/"); // This will go to your deployed baseUrl
    cy.contains("Welcome Back!"); // Replace with text you expect on your homepage
  });
});
