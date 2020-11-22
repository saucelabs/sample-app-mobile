package com.swaglabsmobileapp

import EspressoViewFinder.waitForDisplayed
import androidx.test.espresso.Espresso
import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.action.ViewActions
import androidx.test.espresso.action.ViewActions.*
import androidx.test.espresso.matcher.ViewMatchers
import androidx.test.espresso.matcher.ViewMatchers.*
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.rule.ActivityTestRule
import androidx.test.rule.GrantPermissionRule
import com.squareup.spoon.Spoon
import org.junit.Test

import org.junit.Rule
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class SwagLabsFlow  {
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
    fun completeFlow() {
        // Sign in
        waitForDisplayed(withContentDescription("test-Login"))
        onView(withContentDescription("test-Username"))
                .perform(typeText("standard_user"))
        onView(withContentDescription("test-Password"))
                .perform(typeText("secret_sauce"))
        Espresso.closeSoftKeyboard()
        onView(withContentDescription("test-LOGIN"))
                .perform(click())

        // Wait for the Products page, add article and go to cart
        waitForDisplayed(withContentDescription("test-PRODUCTS"))
        // Take a screenshot
        takeActivityScreenshot("happy_flow_products")
        onView(CustomMatchers.withIndex(withContentDescription("test-ADD TO CART"), 1))
                .perform(click())

        // Go to cart and do a checkout
        onView(withContentDescription("test-Cart"))
                .perform(click())
        // This is a bad practice but we just wait for the animation here
        Thread.sleep(750)
        waitForDisplayed(withContentDescription("test-Cart Content"))
        // Take a screenshot
        takeActivityScreenshot("happy_flow_cart")
        onView(withContentDescription("test-CHECKOUT"))
                .perform(scrollTo(), click())

        // checkoutPageOne
        // This is a bad practice but we just wait for the animation here
        Thread.sleep(750)
        waitForDisplayed(withContentDescription("test-Checkout: Your Info"))
        // Take a screenshot
        takeActivityScreenshot("happy_flow_submit_data")
        onView(withContentDescription("test-First Name"))
                .perform(typeText("Sauce"))
        onView(ViewMatchers.isRoot()).perform(ViewActions.closeSoftKeyboard())
        onView(withContentDescription("test-Last Name"))
                .perform(typeText("Bot"))
        onView(ViewMatchers.isRoot()).perform(ViewActions.closeSoftKeyboard())
        onView(withContentDescription("test-Zip/Postal Code"))
                .perform(typeText("1234 BB"))
        onView(ViewMatchers.isRoot()).perform(ViewActions.closeSoftKeyboard())
        onView(withContentDescription("test-CONTINUE"))
                .perform(scrollTo(), click())

        // checkoutPageTwo
        // This is a bad practice but we just wait for the animation here
        Thread.sleep(750)
        waitForDisplayed(withContentDescription("test-CHECKOUT: OVERVIEW"))
        // Take a screenshot
        takeActivityScreenshot("happy_flow_overview")
        onView(withContentDescription("test-FINISH"))
                .perform(scrollTo(), click())

        // checkoutCompletePage
        // This is a bad practice but we just wait for the animation here
        Thread.sleep(750)
        waitForDisplayed(withContentDescription("test-CHECKOUT: COMPLETE!"))
        // Take a screenshot
        takeActivityScreenshot("happy_flow_complete")
        onView(withContentDescription("test-BACK HOME"))
                .perform(scrollTo(), click())
        waitForDisplayed(withContentDescription("test-PRODUCTS"))
        // Take a screenshot
        takeActivityScreenshot("happy_flow_done")
    }
}
