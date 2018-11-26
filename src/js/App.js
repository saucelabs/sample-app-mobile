import {createStackNavigator} from 'react-navigation';
import LoginPage from './pages/LoginPage';
import InventoryListPage from './pages/InventoryListPage';

const App = createStackNavigator({
  Login: {screen: LoginPage},
  InventoryList: {screen: InventoryListPage},
},
{
  headerMode: 'none'
});

export default App;