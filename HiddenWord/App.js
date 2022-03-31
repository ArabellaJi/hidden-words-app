import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, ScrollView, Text, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoryBox from './src/CategoryBox';
import VerseListing from './src/VerseListing';
import MemorizationScreen from './src/MemorizationScreen';

import { getVerseLists } from './src/verselists';

const Stack = createNativeStackNavigator();
let verseLists = getVerseLists();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ 
            title: 'Hidden Word',
            headerStyle: {
              backgroundColor: '#4f6d7a',
            },
            headerTitleStyle: {
              color: '#fff',
            },
            headerRight: () => (
              <Button
                onPress={() => 
                  Alert.alert(
                    "Instructions", 
                    "Welcome to the Hidden Word app! This is a Bible verse memorization app. To get started, select a category to choose a verse from. ",
                    [
                      {
                        text: "Done",
                        style: "cancel",
                      },
                    ]
                  )
                }
                title="Help"
                color="#c0d6df"
              />
            ),
          }}
        />
        <Stack.Screen 
          name="Verses" 
          component={VerseScreen}
          options={({ route }) => ({
            title: route.params.label,
            headerStyle: {
              backgroundColor: '#c0d6df',
            },
            headerRight: () => (
              <Button
                onPress={() => 
                  Alert.alert(
                    "Instructions", 
                    "Press a verse to memorize it.",
                    [
                      {
                        text: "Done",
                        style: "cancel",
                      },
                    ]
                  )
                }
                title="Help"
                color="#4f6d7a"
              />
            ),
          })}
        />
        <Stack.Screen 
          name="Memorization"
          component={MemorizationScreen}
          options={{
          headerStyle: {
            backgroundColor: '#c0d6df',
          },
          headerRight: () => (
            <Button
              onPress={() => 
                  Alert.alert(
                    "Instructions", 
                    "Follow these instructions to memorize your chosen verse:\n\n\t1. Read the verse out loud a few times\n\t2. When you feel ready, click on the “Hide Words” button to remove some words. \n\t3. Read the verse out loud a few times again. It may be harder this time because there are words missing that you will have to remember. \n\t4. Keep repeating the cycle of removing words and then saying the verse out loud until no words are left.\n\t5. Say the verse out loud one more time to ensure you can say the entire verse without any help.\n\t6. After the text box appears, you can type in the entire verse. \n\nNote: If you get stuck and forget a word, you can hit the back button at the top of the page to go and look at the verse in the verse list again. Click on the verse to begin memorizing it again. ",
                    [
                      {
                        text: "Done",
                        style: "cancel",
                      },
                    ]
                  )
                }
                title="Help"
                color="#4f6d7a"
            />
          ),
         }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = (props) => {
  return (
    <SafeAreaView style={styles.home}>
      <ScrollView>
      {
        verseLists.map(list => (
          <CategoryBox
              label={list.label} 
              verses={list.verses}
              navigation={props.navigation}
          />
        ))
      }
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const VerseScreen = (props) => {
  let categoryVerseList = props.route.params.verses;
  return (
    <SafeAreaView style={styles.verse}>
      <ScrollView>
        {
        categoryVerseList.map(verse => (
          <VerseListing 
            verseReference={verse}
            navigation={props.navigation}
          />
        ))
        }
      </ScrollView>
    </SafeAreaView>
  );
};    

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: '#c0d6df',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    marginTop: 43,
  },
  verse: {
    flex: 1,
    backgroundColor:"#eaeaea",
  }
});
