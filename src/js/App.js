import {createStackNavigator} from 'react-navigation';
import LoginPage from './pages/LoginPage';
import InventoryListPage from './pages/InventoryListPage';
import InventoryItemPage from './pages/InventoryItemPage';
import CartContentsPage from './pages/CartContentsPage';

const App = createStackNavigator({
  Login: {screen: LoginPage},
  InventoryList: {screen: InventoryListPage},
  InventoryItem: {screen: InventoryItemPage},
  CartContents: {screen: CartContentsPage}
},
{
  headerMode: 'none'
});

export default App;