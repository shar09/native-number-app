# native-number-app
Time for React Naatiive!

Some Key Points for refernce:

- expo init app-name
- Width 100% for flex-box
- Add background color for box shadow
- Add styles to View instead of button or text

-------------------------------------------
**Alert**

import { Alert } from ‘react-native’;

-------------------------------------------
**Fonts**

In App.js
```
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
```

- React Native supports adding fontWeight but Expo does not. We need to import different weighted fonts.
- We cannot set fontFamily to ‘view’. We can only set it to ‘text’.
- Instead of setting style on every text element, we can either create a wrapper component or create a default stylesheet and import it.

-------------------------------------------
**Image**
```
<Image source={require(‘../assets/filename} />
<Image source={require({uri: ’link’}) />
```

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
- FlatList takes in a data prop, renderItem prop (callback), keyExtractor prop.

-------------------------------------------
**Icons**

https://icons.expo.fyi/
	Go to the above to view all available icons and their code.
- https://docs.expo.io/guides/icons/#expovector-icons

-------------------------------------------

## Responsiveness

{
   width: ’80%’,
   maxWidth: ’95%’,
   minWidth: 300
}

**Dimensions API**

Dimensions.get(‘window’).width , .height

Ex: 
- marginTop: Dimensions.get(‘window’).height > 600 ? 20 : 5
- style = { Dimensions.get(‘window’).height > 600 ? styles.className1 : styles.className2 }

Also we can use if conditions for better readability.
	
  ```
  let listContainerStyle = styles.listContainerBig
  
	if (Dimensions.get(‘window’).width < 350) 
		listContainerStyle = styles.listContainer
    
	// Add listContainerStyle to element.
  
  ```

-------------------------------------------
**Device Orientation**

In app.json

orientation: default, portrait, landscape

-------------------------------------------
**Avoid covering input field by Keypad**

```
<KeyboardAvoidingView behaviour=“position” keyboardVerticalOffset={30}>
```

-------------------------------------------
**Listening to orientation changes**

- Having a fixed width (style) for elements (Ex: buttonsContainer) makes the layout look less pretty for different orientations.
- For this reason, we need to listen to device orientation changes and set styles dynamically. 

```
const [buttonWidth, setButtonWidth] = useState(Dimensions.get(‘window’).width/4);

useEffect( ( ) => {
  const updateLayout = ( ) => {
	setButtonWidth(Dimensions.get(‘window’).width / 4);	
  };
  Dimensions.addEventListener(‘change’, updateLayout);
  ( ) => {
	Dimensions.removeEventListener(‘change’, updateLayout)   }
}, [])

// This buttonWidth should be used as inline style.
      
    style={{width: buttonWidth, …styles.buttonContainer }}
    
```

-------------------------------------------
**Platform API**

- Platform.OS === ‘android’ , ’iOS’

- Platform Select

```
style={{
     …styles.headerBase,	
     …Platform.select({
	ios: styles.headerIOS,
	android: styles.headerAndroid	
     })
}}
```

- Different touchable feedback based on platform

```
let ButtonComponent = TouchableOpacity;

if (Platform.OS === ‘android’ && Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
}

return (
     <View style={styles.buttonContainer}>
 	<ButtonComponent>
		…
	</ButtonComponent>
     </View>
)

// styles
buttonContainer : {
    borderRadius: 25,
    overflow: ‘hidden'
}

// This style ensures ripple effect (square) doesn’t overflow on android.
```

- If there are lot of changes in code depending on platform, use two different files:
	  ComponentName.android.js, ComponentName.ios.js
	  import ComponenetName from ‘…’ //without extension

- Platform.Version

-------------------------------------------
**SafeAreaView**

- Ensures your app is not cut off by device widgets like notification bar, etc..
