import {createStackNavigator} from 'react-navigation';
import LoginPage from './pages/LoginPage';
import InventoryListPage from './pages/InventoryListPage';
import InventoryItemPage from './pages/InventoryItemPage';

const App = createStackNavigator({
  Login: {screen: LoginPage},
  InventoryList: {screen: InventoryListPage},
  InventoryItem: {screen: InventoryItemPage},
},
{
  headerMode: 'none'
});

export default App;