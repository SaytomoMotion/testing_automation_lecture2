// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (username, password) => {
  cy.session(
    [username, password],
    () => {
      cy.request({
        method: "POST",
        url: "/rest/user/login",
        body: { email: username, password: password },
      }).then((response) => {
        window.localStorage.setItem(
          "token",
          response.body.authentication.token
        );
        window.sessionStorage.setItem("bid", response.body.authentication.bid);
        cy.setCookie("token", response.body.authentication.token);
        cy.setCookie("cookieconsent_status", "dismiss");
        cy.setCookie("welcomebanner_status", "dismiss");
      });
    },
    {
      validate() {
        cy.request("/whoami").its("status").should("eq", 200);
      },
    }
  );
});
