//
//  SwagLabsFlow.swift
//  SwagLabsMobileAppUITests
//
//  Created by Wim Selles on 23/11/2020.
//  Copyright © 2020 Facebook. All rights reserved.
//

import XCTest

class SwagLabsFlow: XCTestCase {

    override func setUpWithError() throws {
        // Put setup code here. This method is called before the invocation of each test method in the class.

        // In UI tests it is usually best to stop immediately when a failure occurs.
        continueAfterFailure = false

        // UI tests must launch the application that they test. Doing this in setup will make sure it happens for each test method.
        XCUIApplication().launch()

        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
    }

    override func tearDownWithError() throws {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    func testCompleteFlow() throws {
      // UI tests must launch the application that they test.
      let app = XCUIApplication()
      app.launch()
      
      // Wait for the login page
      XCTAssert(app.otherElements["test-Login"].waitForExistence(timeout: 5000))
    
      // Sign in
      let userName = app.textFields["test-Username"]
      userName.tap()
      userName.typeText("standard_user")
      
      let password = app.secureTextFields["test-Password"]
      password.tap()
      // Add '\n' to hide the keyboard
      password.typeText("secret_sauce\n")
      
      app.buttons["test-LOGIN"].tap()
    
      // Wait for the Products page, add article and go to cart
      XCTAssert(app.otherElements["test-PRODUCTS"].waitForExistence(timeout: 5000))
      app.buttons["test-ADD TO CART"].firstMatch.tap()
      
      // Go to cart and do a checkout
      app.otherElements["test-Cart"].tap()
      XCTAssert(app.otherElements["test-Cart Content"].waitForExistence(timeout: 5000))
      app.buttons["test-CHECKOUT"].tap()
      
      // checkoutPageOne
      XCTAssert(app.otherElements["test-Checkout: Your Info"].waitForExistence(timeout: 5000))
      
      let firstName = app.textFields["test-First Name"]
      firstName.tap()
      // Add '\n' to hide the keyboard
      firstName.typeText("Sauce\n")
      
      let lastName = app.textFields["test-Last Name"]
      lastName.tap()
      // Add '\n' to hide the keyboard
      lastName.typeText("Bot\n")
      
      let zipPostalCode = app.textFields["test-Zip/Postal Code"]
      zipPostalCode.tap()
      // Add '\n' to hide the keyboard
      zipPostalCode.typeText("1234 BB\n")
      
      app.buttons["test-CONTINUE"].tap()
      
      // checkoutPageTwo
      XCTAssert(app.otherElements["test-CHECKOUT: OVERVIEW"].waitForExistence(timeout: 5000))
      app.buttons["test-FINISH"].tap()
      
      // checkoutCompletePage
      XCTAssert(app.otherElements["test-CHECKOUT: COMPLETE!"].waitForExistence(timeout: 5000))
      app.buttons["test-BACK HOME"].tap()
      XCTAssert(app.otherElements["test-PRODUCTS"].waitForExistence(timeout: 5000))
    }

}
