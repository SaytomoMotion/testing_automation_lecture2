export class BasePage {
  static visit() {
    return cy.visit(this.url);
  }
}
