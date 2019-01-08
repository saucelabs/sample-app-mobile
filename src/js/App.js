import {createStackNavigator} from 'react-navigation';
import LoginPage from './pages/LoginPage';
import InventoryListPage from './pages/InventoryListPage';
import InventoryItemPage from './pages/InventoryItemPage';
import CartContentsPage from './pages/CartContentsPage';
import CheckoutPageOne from './pages/CheckoutPageOne';
import CheckoutPageTwo from './pages/CheckoutPageTwo';
import CheckoutCompletePage from './pages/CheckoutCompletePage';

const App = createStackNavigator({
  Login: {screen: LoginPage},
  InventoryList: {screen: InventoryListPage},
  InventoryItem: {screen: InventoryItemPage},
  CartContents: {screen: CartContentsPage},
  CheckoutPageOne: {screen: CheckoutPageOne},
  CheckoutPageTwo: {screen: CheckoutPageTwo},
  CheckoutComplete: {screen: CheckoutCompletePage},
},
{
  headerMode: 'none',
});

export default App;
