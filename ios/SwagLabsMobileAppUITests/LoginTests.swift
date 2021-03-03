//
//  LoginTests.swift
//  SwagLabsMobileAppUITests
//
//  Created by Wim Selles on 23/11/2020.
//  Copyright © 2020 Facebook. All rights reserved.
//

import XCTest

class LoginTests: XCTestCase {

    override func setUpWithError() throws {
        // Put setup code here. This method is called before the invocation of each test method in the class.

        // In UI tests it is usually best to stop immediately when a failure occurs.
        continueAfterFailure = false

        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
    }

    override func tearDownWithError() throws {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    func testSuccessfulLogin() throws {
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
    
      // Wait for the Products page
      XCTAssert(app.otherElements["test-PRODUCTS"].waitForExistence(timeout: 5000))
    }
  
    func testLockedUserLogin() throws {
      // UI tests must launch the application that they test.
      let app = XCUIApplication()
      app.launch()
      
      // Wait for the login page
      XCTAssert(app.otherElements["test-Login"].waitForExistence(timeout: 5000))
    
      // Sign in
      let userName = app.textFields["test-Username"]
      userName.tap()
      userName.typeText("locked_out_user")
      
      let password = app.secureTextFields["test-Password"]
      password.tap()
      // Add '\n' to hide the keyboard
      password.typeText("secret_sauce\n")
      
      app.buttons["test-LOGIN"].tap()
    
      // Wait for the error message
      XCTAssert(app.otherElements["test-Error message"].waitForExistence(timeout: 5000))
      // and verify it
      XCTAssert(app.staticTexts["Sorry, this user has been locked out."].exists)
    }
  
    func testNoUsernameLogin() throws {
      // UI tests must launch the application that they test.
      let app = XCUIApplication()
      app.launch()
      
      // Wait for the login page
      XCTAssert(app.otherElements["test-Login"].waitForExistence(timeout: 5000))
    
      // Sign in
      app.buttons["test-LOGIN"].tap()
    
      // Wait for the error message
      XCTAssert(app.otherElements["test-Error message"].waitForExistence(timeout: 5000))
      // and verify it
      XCTAssert(app.staticTexts["Username is required"].exists)
    }
  
    func testNoPasswordLogin() throws {
      // UI tests must launch the application that they test.
      let app = XCUIApplication()
      app.launch()
      
      // Wait for the login page
      XCTAssert(app.otherElements["test-Login"].waitForExistence(timeout: 5000))
    
      // Sign in
      let userName = app.textFields["test-Username"]
      userName.tap()
      userName.typeText("standard_user")
      
      app.buttons["test-LOGIN"].tap()
    
      // Wait for the error message
      XCTAssert(app.otherElements["test-Error message"].waitForExistence(timeout: 5000))
      // and verify it
      XCTAssert(app.staticTexts["Password is required"].exists)
    }
  
    func testNoMatchLogin() throws {
      // UI tests must launch the application that they test.
      let app = XCUIApplication()
      app.launch()
      
      // Wait for the login page
      XCTAssert(app.otherElements["test-Login"].waitForExistence(timeout: 5000))
    
      // Sign in
      let userName = app.textFields["test-Username"]
      userName.tap()
      userName.typeText("Sauce Bot")
      
      let password = app.secureTextFields["test-Password"]
      password.tap()
      // Add '\n' to hide the keyboard
      password.typeText("Foo\n")
      
      app.buttons["test-LOGIN"].tap()
    
      // Wait for the error message
      XCTAssert(app.otherElements["test-Error message"].waitForExistence(timeout: 5000))
      // and verify it
      XCTAssert(app.staticTexts["Username and password do not match any user in this service."].exists)
    }
}
