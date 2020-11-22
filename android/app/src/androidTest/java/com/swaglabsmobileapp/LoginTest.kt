package com.swaglabsmobileapp

import EspressoViewFinder.waitForDisplayed
import androidx.test.espresso.Espresso
import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.action.ViewActions.*
import androidx.test.espresso.assertion.ViewAssertions.matches
import androidx.test.espresso.matcher.ViewMatchers.*
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.rule.ActivityTestRule
import com.squareup.spoon.Spoon
import org.junit.Test

import org.junit.Rule
import org.junit.runner.RunWith
import androidx.test.rule.GrantPermissionRule

@RunWith(AndroidJUnit4::class)
class LoginTest  {
    @Rule @JvmField
    var activityRule = ActivityTestRule(MainActivity::class.java)

    @Rule @JvmField
    var mRuntimeReadStoragePermissionRule = GrantPermissionRule.grant(android.Manifest.permission.READ_EXTERNAL_STORAGE)

    @Rule @JvmField
    var mRuntimeWriteStoragePermissionRule = GrantPermissionRule.grant(android.Manifest.permission.WRITE_EXTERNAL_STORAGE)

    fun takeActivityScreenshot(tag: String) {
        Spoon.screenshot(activityRule.activity, tag)
    }

    @Test
    @HappyFlow
    fun successfulLogin() {
        waitForDisplayed(withContentDescription("test-Login"))
        takeActivityScreenshot("initial_state")

        // Sign in
        onView(withContentDescription("test-Username"))
                .perform(typeText("standard_user"))
        onView(withContentDescription("test-Password"))
                .perform(typeText("secret_sauce"))
        Espresso.closeSoftKeyboard()
        onView(withContentDescription("test-LOGIN"))
                .perform(click())

        // Wait for the Products page
        waitForDisplayed(withContentDescription("test-PRODUCTS"))
        takeActivityScreenshot("end_state")
    }

    @Test
    @ErrorFlow
    fun lockedUserLogin() {
        // Wait for the screen to be loaded
        waitForDisplayed(withContentDescription("test-Login"))
        takeActivityScreenshot("initial_state")

        // Sign in
        onView(withContentDescription("test-Username"))
                .perform(typeText("locked_out_user"))
        onView(withContentDescription("test-Password"))
                .perform(typeText("secret_sauce"))
        Espresso.closeSoftKeyboard()
        onView(withContentDescription("test-LOGIN"))
                .perform(click())

        // Wait for the error message
        waitForDisplayed(withContentDescription("test-Error message"))
        // and verify it
        onView(withText("Sorry, this user has been locked out.")).check(matches(isDisplayed()))
        takeActivityScreenshot("end_state")
    }

    @Test
    @ErrorFlow
    fun noUsernameLogin() {
        // Wait for the screen to be loaded
        waitForDisplayed(withContentDescription("test-Login"))
        takeActivityScreenshot("initial_state")

        // Sign in
        onView(withContentDescription("test-LOGIN"))
                .perform(click())

        // Wait for the error message
        waitForDisplayed(withContentDescription("test-Error message"))
        // and verify it
        onView(withText("Username is required")).check(matches(isDisplayed()))
        takeActivityScreenshot("end_state")
    }

    @Test
    @ErrorFlow
    fun noPasswordLogin() {
        // Wait for the screen to be loaded
        waitForDisplayed(withContentDescription("test-Login"))
        takeActivityScreenshot("initial_state")

        // Sign in
        onView(withContentDescription("test-Username"))
                .perform(typeText("standard_user"))
        Espresso.closeSoftKeyboard()
        onView(withContentDescription("test-LOGIN"))
                .perform(click())

        // Wait for the error message
        waitForDisplayed(withContentDescription("test-Error message"))
        // and verify it
        onView(withText("Password is required")).check(matches(isDisplayed()))
        takeActivityScreenshot("end_state")
    }

    @Test
    @ErrorFlow
    fun noMatchLogin() {
        // Wait for the screen to be loaded
        waitForDisplayed(withContentDescription("test-Login"))
        takeActivityScreenshot("initial_state")

        // Sign in
        onView(withContentDescription("test-Username"))
                .perform(typeText("Sauce Bot"))
        onView(withContentDescription("test-Password"))
                .perform(typeText("Foo"))
        Espresso.closeSoftKeyboard()
        onView(withContentDescription("test-LOGIN"))
                .perform(click())

        // Wait for the error message
        waitForDisplayed(withContentDescription("test-Error message"))
        // and verify it
        onView(withText("Username and password do not match any user in this service.")).check(matches(isDisplayed()))
        takeActivityScreenshot("end_state")
    }
}
