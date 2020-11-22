// Thanks to https://android.jlelse.eu/espresso-testing-react-native-6a66878f4c83
import android.graphics.Rect
import android.view.View
import android.view.ViewGroup
import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.PerformException
import androidx.test.espresso.UiController
import androidx.test.espresso.ViewAction
import androidx.test.espresso.matcher.ViewMatchers
import androidx.test.espresso.matcher.ViewMatchers.isRoot
import androidx.test.espresso.matcher.ViewMatchers.withEffectiveVisibility
import androidx.test.espresso.util.HumanReadables
import androidx.test.espresso.util.TreeIterables
import org.hamcrest.Description
import org.hamcrest.Matcher
import org.hamcrest.TypeSafeMatcher
import java.util.concurrent.TimeoutException

object EspressoViewFinder {

    private const val CHECK_INTERVAL = 50L
    private const val TIMEOUT_MS = 10 * 1000L

    /**
     * Waits for the view referenced in [viewMatcher] to become visible, with a timeout of [timeOut]. If it
     * becomes visible, [onDisplayedHandler] will be invoked.
     *
     * This method is needed because Espresso idling resources are not sufficient in combination with RN;
     * it does not wait on the javascript thread and the bridge.
     *
     * Throws a TimeoutException wrapped in a PerformException when the view is not displayed within [timeOut].
     */
    fun waitForDisplayed(viewMatcher: Matcher<View>,
                         timeOut: Long = TIMEOUT_MS,
                         onDisplayedHandler: ((Matcher<View>) -> Unit)? = null) {

        // wait for view
        onView(isRoot()).perform(createWaitForDisplayedViewAction(viewMatcher, timeOut))

        // call handler
        onDisplayedHandler?.invoke(viewMatcher)
    }

    private fun createWaitForDisplayedViewAction(viewMatcher: Matcher<View>,
                                                 timeOut: Long = TIMEOUT_MS) = object : ViewAction {

        override fun getConstraints(): Matcher<View> {
            return isRoot()
        }

        override fun getDescription(): String {
            return "waitForDisplayed on viewMatcher <$viewMatcher> without timeOut $timeOut ms."
        }

        override fun perform(uiController: UiController, view: View) {

            // wait for idle, so that we don't timeout while waiting on Espresso idling resources:
            uiController.loopMainThreadUntilIdle()

            val found = waitForView(uiController, view)

            if (!found) {
                throw createPerformException(view)
            }
        }

        private fun waitForView(uiController: UiController, view: View): Boolean {

            val timeOutTimeStamp = System.currentTimeMillis() + timeOut
            do {
                // find view with required matcher:
                for (child in TreeIterables.breadthFirstViewTraversal(view)) {
                    if (viewMatcher.matches(child) && isDisplayed(child)) {
                        return true
                    }
                }
                uiController.loopMainThreadForAtLeast(CHECK_INTERVAL)
            } while (System.currentTimeMillis() < timeOutTimeStamp)

            return false
        }

        private fun createPerformException(view: View) = PerformException.Builder()
                .withActionDescription(this.description)
                .withViewDescription(HumanReadables.describe(view))
                .withCause(TimeoutException())
                .build()
    }

    private fun isDisplayed(view: View) = view.getGlobalVisibleRect(Rect()) && withEffectiveVisibility(ViewMatchers.Visibility.VISIBLE).matches(view)

    /**
     * Finds a matcher's view's child at the given index.
     */
    fun childAtIndex(parentMatcher: Matcher<View>, childPosition: Int): Matcher<View> = object : TypeSafeMatcher<View>() {

        override fun describeTo(description: Description) {
            description.appendText("childAtIndex $childPosition of type $parentMatcher")
        }

        override fun matchesSafely(view: View): Boolean {

            if (view.parent !is ViewGroup) {
                return parentMatcher.matches(view.parent)
            }

            val group = view.parent as ViewGroup
            return parentMatcher.matches(view.parent) && group.getChildAt(childPosition) == view
        }
    }
}