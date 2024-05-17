
import { BasePage } from "../pageObjects/basePage";

export class HomePage extends BasePage {
  static get url() {
    return "/#/";
  }

  static get dismissButton() {
    return cy.get("[aria-label='Close Welcome Banner']");
  }

  static get meWantItButton() {
    return cy.get("[aria-label='dismiss cookie message']");
  }

  static loginPage(email, password) {
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.contains('button[type="submit"]', 'Log in').click();
  }

  static clickAccountButton() {
    cy.contains('button', 'Account').click();
  }

  static clickLoginMenu() {
    cy.contains('.mat-menu-content', 'Login').click();
  }

  static login(email, password) {
    cy.get('[aria-label="Email address field"]').type(email);
    cy.get('[aria-label="Field for the password"]').type(password); 
    cy.get('[aria-label="Field to confirm the password"]').type(password);  

  }
  static clickSecurityQuestionDropdown() {
    cy.get('[aria-label="Selection list for the security question"]').click();
  }

  static selectSecurityQuestion(question) {
    // Wait for options to be visible and select the desired question
    cy.contains('mat-option', question).click();
  }
  static fillSecurityAnswer(answer) {
    cy.get('#securityAnswerControl').type(answer);
  }

  static submitRegistration() {
    cy.get('#registerButton').should('not.be.disabled').click();
  }

  static goToUserProfile() {
    this.clickAccountButton();
    cy.get('button[aria-label="Go to user profile"]')
      .contains('span', 'demo')
      .should('be.visible')
      .click();
  }

  static clickNotYetACustomer(text) {
    cy.get('a').contains(text).click();
  }

  static clickSearchIcon() {
    cy.get('.mat-search_icon-search').click(); 
  }

  static searchForProduct(productName) {
    this.clickSearchIcon(); 
    cy.get('#mat-input-0').type(`${productName}{enter}`); 
  }

  static clickOnProductImage(productName) {
    cy.get(`img[alt="${productName}"]`).should('be.visible').click();
  }

  static validateProductDescription(productName, description) {
    cy.contains('.product-card', productName).within(() => {
        cy.get('.product-description').should('contain', description);
    });
  }
  static validateProductImage(productName, imageUrl) {
    cy.get(`img[alt="${productName}"]`)
        .should('have.attr', 'src', imageUrl)
        .and('be.visible');
  }
  static checkProductNameVisibility(productName) {
    cy.get('h1').contains(productName).should('be.visible');
  }

  static checkProductDescriptionVisibility(description) {
    cy.get('div').contains(description).should('be.visible');
  }

  static checkProductPriceVisibility(price) {
    cy.get('p.item-price').contains(price).should('be.visible');
  }
  static closeProductDetailsDialog() {
    cy.get('button[mat-dialog-close]').click();
  }

  static clickOnProductImage2(productName) {
    const escapedProductName = productName.replace(/"/g, '\\"');
    cy.get(`img[alt="${escapedProductName}"]`).click();
  }

  static openReviews() {
    cy.get('[aria-label="Expand for Reviews"]').click().should('be.visible');
  }

  static typeReview(reviewText) {
    cy.get('textarea[aria-label="Text field to review a product"]').click().wait(100).type(reviewText);
  }
  static submitReview() {
    cy.get('#submitButton', { timeout: 10000 })
      .should('be.visible')
      .and('not.be.disabled')
      .click();
  }

  static validateProductCardAmount(expectedAmount) {
    cy.get('.mat-select-value-text').should('contain', expectedAmount);
  }
  static selectDropdownOption(optionText) {
    cy.get('.mat-select-arrow').click();
    cy.contains('.mat-option-text', optionText).click();
  }

  static addToTheBasket(){
    cy.get('[aria-label="Add to Basket"]').click();
  }

  static goToBasketPage(){
    cy.get('[aria-label="Show the shopping cart"]').click();
  }

  static checkoutButton(){
    cy.get('#checkoutButton').click();
  }

  static adressSubmition(){
    cy.get('label.mat-radio-label').click();
  }

  static continueButtonToPayment(){
    cy.get('[aria-label="Proceed to payment selection"]').click();
  }
  static selectDeliveryMethod(deliveryMethodName) {
    cy.contains('mat-cell.mat-cell.cdk-cell.cdk-column-Name.mat-column-Name', deliveryMethodName).click();
  }
  static continueButtonToDelivery(){
    cy.get('[aria-label="Proceed to delivery method selection"]').click();
  }

  static clickCardAndRadio() {
    cy.get('.mat-row').contains('5678').click().then(() => {
      cy.get('.mat-radio-inner-circle').click();
    });
  }
  static continueButtonToReview(){
    cy.get('[aria-label="Proceed to review"]').click();
  } 

  static continueButtonToFinishPayment(){
    cy.get('[aria-label="Complete your purchase"]').click();
  } 

  static validateConfirmationOfOrder(){
      cy.contains('.confirmation', 'Thank you for your purchase!').should('be.visible');
  }

  static goToPrivacyAddressSetings() {
    cy.get('button[aria-label="Show Orders and Payment Menu"]').click();
    cy.get('button[aria-label="Go to saved address page"]').click();
  }

  static clickAddNewAddressButton() {
    cy.get('button[aria-label="Add a new address"]').click();
  }

  static clickAddNewAddress(country, name, mobileNumber, zipCode, address, city, state){
      cy.get('input[placeholder="Please provide a country."]').type(country);
      cy.get('input[placeholder="Please provide a name."]').type(name);
      cy.get('input[placeholder="Please provide a mobile number."]').type(mobileNumber);
      cy.get('input[placeholder="Please provide a ZIP code."]').type(zipCode);
      cy.get('textarea[placeholder="Please provide an address."]').type(address);
      cy.get('input[placeholder="Please provide a city."]').type(city);
      cy.get('input[placeholder="Please provide a state."]').type(state);
  }

  static goToPrivacyPaymentsSetings() {
    cy.get('button[aria-label="Show Orders and Payment Menu"]').click();
    cy.get('button[aria-label="Go to saved payment methods page"]').click();
  }

  static clickAddNewCard() {
    return cy.get('mat-expansion-panel');
  }
}