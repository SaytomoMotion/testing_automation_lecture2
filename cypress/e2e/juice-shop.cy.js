import { HomePage } from "../pageObjects/HomePage";
import { PaymentMethods } from "../pageObjects/PaymentsMethodPage";

describe("Juice-shop scenarios", () => {
  
  const loginAndNavigate = (username, password, navigateCallback) => {
    HomePage.visit();
    HomePage.clickAccountButton();
    HomePage.clickLoginMenu();
    HomePage.loginPage(username, password);
    navigateCallback();
  };

  context("Without auto login", () => {
    beforeEach(() => {
      HomePage.visit();
      HomePage.dismissButton.click();
      HomePage.meWantItButton.click();
    });

    it("Login", () => {
      loginAndNavigate('demo', 'demo', HomePage.goToUserProfile);
    });

    it("Registration", () => {
      HomePage.visit();
      HomePage.meWantItButton.click();
      HomePage.clickAccountButton();
      HomePage.clickLoginMenu();
      cy.get('a').contains('Not yet a customer?').click();
      HomePage.login("demo@demo.com", "demo123");
      HomePage.clickSecurityQuestionDropdown();
      HomePage.selectSecurityQuestion('Name of your favorite pet?');
      HomePage.fillSecurityAnswer('Fluffy');
      HomePage.submitRegistration();
    });
  });

  context("With auto login", () => {
    beforeEach(() => {
      cy.login("demo", "demo");
    });

    const searchAndValidateProduct = (searchTerm, productName, productDescription) => {
      HomePage.visit();
      HomePage.clickSearchIcon();
      HomePage.searchForProduct(searchTerm);
      HomePage.clickOnProductImage(productName);
      HomePage.checkProductNameVisibility(productName);
      HomePage.checkProductDescriptionVisibility(productDescription);
      HomePage.visit();
    };

    it("Search and validate Lemon", () => {
      searchAndValidateProduct("Lemon", "Lemon Juice (500ml)", "Sour but full of vitamins.");
    });

    it("Search 500ml and validate Lemon", () => {
      searchAndValidateProduct("500ml", "Lemon Juice (500ml)", "Sour but full of vitamins.");
    });

    it("Search 500ml and validate cards", () => {
      HomePage.visit();
      HomePage.clickSearchIcon();
      HomePage.searchForProduct("500ml");
      
      const validateProduct = (productName, productDescription) => {
        HomePage.clickOnProductImage(productName);
        HomePage.checkProductDescriptionVisibility(productDescription);
        HomePage.closeProductDetailsDialog();
      };

      validateProduct("Eggfruit Juice (500ml)", "Now with even more exotic flavour.");
      validateProduct("Lemon Juice (500ml)", "Sour but full of vitamins.");
      validateProduct("Strawberry Juice (500ml)", "Sweet & tasty!");
    });

    it("Read a review", () => {
      HomePage.visit();
      HomePage.clickSearchIcon();
      HomePage.searchForProduct("King");
      HomePage.clickOnProductImage2('OWASP Juice Shop "King of the Hill" Facemask');
      HomePage.openReviews();
    });

    it("Add a review", () => {
      HomePage.visit();
      HomePage.clickSearchIcon();
      HomePage.searchForProduct("Raspberry");
      HomePage.clickOnProductImage2('Raspberry Juice (1000ml)');
      HomePage.openReviews();
      HomePage.typeReview("Tastes like metal");
      HomePage.submitReview();
    });

    it("Validate product card amount", () => {
      HomePage.visit();
      HomePage.validateProductCardAmount('12');
      
      const validateAmount = (amount) => {
        HomePage.selectDropdownOption(amount);
        HomePage.validateProductCardAmount(amount);
      };

      validateAmount('24');
      validateAmount('36');
    });

    it("Buy Girlie T-shirt", () => {
      HomePage.visit();
      HomePage.clickSearchIcon();
      HomePage.searchForProduct("Girlie");
      HomePage.addToTheBasket();
      HomePage.goToBasketPage();
      HomePage.checkoutButton();
      HomePage.adressSubmition();
      HomePage.continueButtonToPayment();
      HomePage.selectDeliveryMethod('Standard Delivery');
      HomePage.continueButtonToDelivery();
      HomePage.clickCardAndRadio();
      HomePage.continueButtonToReview();
      HomePage.continueButtonToFinishPayment();
      HomePage.validateConfirmationOfOrder();
    });

    it("Add address", () => {
      HomePage.visit();
      HomePage.clickAccountButton();
      HomePage.goToPrivacyAddressSetings();
      HomePage.clickAddNewAddressButton();
      HomePage.clickAddNewAddress('CountryName', 'John Doe', '1234567890', '12345', '123 Main St', 'CityName', 'StateName');
      HomePage.submitReview();
    });

    it.only("Add payment option", () => {
      HomePage.visit();
      HomePage.clickAccountButton();
      HomePage.goToPrivacyPaymentsSetings();
      PaymentMethods.addNewCardBtn.click();
      PaymentMethods.nameTxtField.type("Name Surname");
      PaymentMethods.cardNumberTxtField.type("1111222233334444");
      PaymentMethods.exipreMonthTxtField.select("6");
      PaymentMethods.exipreYearTxtField.select("2090");
      PaymentMethods.submitBtn.click();
      PaymentMethods.paymentCardlist.contains("4444");
    });
  });
});
