import loginPage from "../pom/loginPage";

describe("Interceptor command, work with APIs", () => {
  beforeEach(function () {
    cy.visit("/");

    cy.fixture("users").then((credentials) => {
      this.credential = credentials;
    });
  });

  describe("Shoulds basic", () => {
    it("Initial validataion", () => {
      loginPage.elements.inputEmail().should("have.length", 1);
      loginPage.elements.inputPassword().should("have.length", 1);
      loginPage.elements.buttonSend().should("have.length", 1);
    });
  });

  describe("Login success", () => {
    it("Moked login success whit credentials valids", function () {
      cy.intercept("POST", "https://reqres.in/api/login", {
        fixture: "intercept/loginSuccessfull.json",
      }).as("login-Fixture");

      loginPage.login(
        this.credential.userValid.email,
        this.credential.userValid.password
      );

      loginPage.response.success();
    });

    it("Moked login success whit credentials invalids", function () {
      cy.intercept("POST", "https://reqres.in/api/login", {
        fixture: "intercept/loginSuccessfull.json",
      }).as("login-Fixture");

      loginPage.login(
        this.credential.userValid.email,
        this.credential.userValid.password
      );

      cy.wait("@login-Fixture");

      loginPage.response.success();
    });
  });

  describe("Not login", () => {
    it("Whit credentials valids", function () {
      cy.intercept("POST", "https://reqres.in/api/login", {
        fixture: "intercept/loginUnsuccessfull.json",
      }).as("login-Fixture");

      loginPage.login(
        this.credential.userValid.email,
        this.credential.userValid.password
      );

      cy.wait("@login-Fixture");

      loginPage.response.fail();
    });

    it("Whit credentials invalids", function () {
      cy.intercept("POST", "https://reqres.in/api/login", {
        fixture: "intercept/loginUnsuccessfull.json",
      }).as("login-Fixture");

      loginPage.login(
        this.credential.userValid.email,
        this.credential.userValid.password
      );

      cy.wait("@login-Fixture");

      loginPage.response.fail();
    });
  });
});
