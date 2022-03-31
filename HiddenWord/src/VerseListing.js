import React, { useState, useEffect } from "react";
import { Divider, useTheme } from 'react-native-elements';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * VerseListing component display a single verse. The verse
 * reference is passed in as a prop and then is used to fetch
 * the verse text from the Bible API. 
 */
export default function VerseListing(props) {
  let [verseReference, setVerseReference] = useState(props.verseReference);
  let [bookName, setBookName] = useState((props.verseReference.split(" "))[0]);
  let [chapterAndVerse, setChapterAndVerse] = useState((props.verseReference.split(" "))[1]);
  let [verseText, setVerseText] = useState("Loading..");

  /** Update "verseText" state with verse text received from API
  */
  async function getVerse() {
    fetch("https://labs.bible.org/api/?passage=" + bookName + "%20" + chapterAndVerse + "&type=json")
    .then(res => res.json())
    .then(
        (result) => {
            let verses = ""   
            result.map(verse => (
                verses += verse.text + " "
            ))
            setVerseText(verses);
        },
        (error) => {
            console.log(error);
        }
    );
  }

  useEffect(() => {
    getVerse();
  }, []);
  
  return (
    <View>
      <TouchableOpacity style={{margin: 10, elevation: 20}}
        delayPressIn={800}
        onPress={() => props.navigation.navigate('Memorization', { verseReference: verseReference, verseText: verseText })}
      >
        <Text style={{fontWeight:"bold"}}>{verseReference}</Text>
        <Text>{verseText}{"\n"}</Text>
        <Divider color={"black"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 350, 
    marginTop: 10, 
    backgroundColor: '#4f6d7a',
  },
  category: {
    height: 25,
    color: '#eaeaea',
    fontSize: 15,
    fontFamily: 'serif',
    textAlignVertical: "center",
    marginLeft: 5, 
  },
  box: {
    width: 350, 
    height: 150,
    textAlignVertical: "center",
    textAlign: "center",
    backgroundColor: '#eaeaea',
    fontSize: 50,
    fontFamily: 'sans-serif-medium',
    color: '#4f6d7a',
  }
});