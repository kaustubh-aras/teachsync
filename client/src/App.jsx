import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './screens/navigation/RootNavigation';

const App = () => {
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
};

export default App;