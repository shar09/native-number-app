# native-number-app
Time for React Naatiive!

Some Key Points for refernce:

**Alert**

import { Alert } from ‘react-native’;

-------------------------------------------
**Fonts**

In App.js

expo install expo-app-loading

import * as Font from 'expo-font';
import AppLoading from ‘expo-app-loading‘;

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans-bold': require('./assets/fonts/OpensSans-Bold.ttf'),
    'open-sans': require('./assets/fonts/OpensSans-Regular.ttf')
  })
} 

  const [dataLoaded, setDataLoaded] = useState(false);
  
  if (!dataLoaded) {
    return (
      <AppLoading 
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={ err => console.log(err)}
      />
    ) 
  }


- React Native supports adding fontWeight but Expo does not. We need to import different weighted fonts.
- We cannot set fontFamily to ‘view’. We can only set it to ‘text’.
- Instead of setting style on every text element, we can either create a wrapper component or create a default stylesheet and import it.

-------------------------------------------
**Image**

<Image source={require(‘../assets/filename} />
<Image source={require({uri: ’link’}) />

- We should always set width and height to image loaded from uri.

-------------------------------------------
**Text**

- ‘Views’ can be nested inside ‘Text’ in React-native but can lead to bugs in iOS and android.

- ‘Text’ nested inside ‘Text’ inherits style from parent.

-------------------------------------------
**Touchable** - Native Feedback, Opacity, Without Feedback

-------------------------------------------
**ScrollView, FlatList**

- To style a scroll view or flat list we should ‘contentContainerStyle’ attribute.
- Using style for scrollView/FlatList doesn’t allow us to align content in the list.

- https://stackoverflow.com/questions/46805135/scrollview-with-flex-1-makes-it-un-scrollable

- In scrollView we use map function to render the list
-FlatList takes in a data prop, renderItem prop (callback), keyExtractor prop.