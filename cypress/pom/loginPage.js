class loginPage {
  elements = {
    inputEmail: () => cy.get("[data-testid=email]"),
    inputPassword: () => cy.get("[data-testid=password]"),
    buttonSend: () => cy.get("[data-testid=button-send]"),
    boxResume: () => cy.get("[data-testid=resume]"),
  };

  login(email, password) {
    this.elements.inputEmail().type(email);
    this.elements.inputPassword().type(password);
    this.elements.buttonSend().click();
  }

  response = {
    success: () => {
      this.elements
        .boxResume()
        .contains("200-OK")
        .contains("statusCode")
        .contains("token");
    },
    fail: () => {
      this.elements
        .boxResume()
        .contains("200-OK")
        .contains("400")
        .contains("error");
    },
  };
}
module.exports = new loginPage();
