import React, { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet, TextInput } from 'react-native';

/**
 * MemorizationScreen component displays a verse and controls
 * functionality that erases words to enable users to memorize 
 * the verse.
 */
export default function MemorizationScreen(props) {
    let [verseReference, setVerseReference] = useState(props.route.params.verseReference);
    let [originalVerseText, setOriginalVerseText] = useState(props.route.params.verseText);
    let [verseText, setVerseText] = useState(props.route.params.verseText);
    let [indexesOfRemovedWords, setIndexesOfRemovedWords] = useState([]);
    let [showInputBox, setShowInputBox] = useState(false);
    let [finalAnswer, setFinalAnswer] = useState();
    
    /** Replaces each character in a string with an underscore
     * 
     * @param {*} word 
     * @returns string of underscores with same length as word
     */
    function replaceWordWithUnderscores(word) {
        let blankWord = '';
        for (let i = 0; i < word.length; i++) {
            blankWord += '_';
        }
        return blankWord;
    }

    /** Removes three random words in verseText and replaces
     *  them with blank spaces. 
     */
    function removeThreeRandomWords() {
        let verseTextCopy = verseText;
        let verseWordArray = verseTextCopy.split(" ");
        let indexesOfRemovedWordsCopy = indexesOfRemovedWords;
        
        let randomIndex;
        let randomIndexes = [];
        for (let i = 0; i < 3; i++) {
            // Keep generating a random index of a word in the verse
            // as long as the index has not already been chosen
            randomIndex = Math.floor(Math.random() * verseWordArray.length);
            while (indexesOfRemovedWordsCopy.includes(randomIndex)) {
                randomIndex = Math.floor(Math.random() * verseWordArray.length);
            }
            indexesOfRemovedWordsCopy.push(randomIndex);
            randomIndexes[i] = randomIndex;
        }

        // Update the state variable indexesOfRemovedWords to include
        // the new indices chosen
        setIndexesOfRemovedWords(indexesOfRemovedWordsCopy);

        // Replace each word at the random indexes with blanks
        randomIndexes.map(index => {
            let currentWordInArray = verseWordArray[index];
            verseWordArray[index] = replaceWordWithUnderscores(currentWordInArray);;
        })

        // If all words have been removed...
        if (verseWordArray.length === indexesOfRemovedWords.length) {
            // Show input text box to allow user to test their 
            // knowledge and type in the entire verse from memory
            setShowInputBox(true);
        } else {
            // Update the displayed text to show the blanks
            setVerseText(verseWordArray.join(" "));
        }
    }

    /** Handles press of "Hide Words" button.
     */
    function handleHideWordsButton(e) {
        removeThreeRandomWords();
    }

    /** Handles press of "Check" button that is 
     *  displayed after all words are hidden.
     */
    function handleCheckButton(e) {
        let answerIsCorrect = false;
        console.log(originalVerseText);
        console.log(finalAnswer);
        if (finalAnswer == originalVerseText) {
            answerIsCorrect = true;
        }
        console.log(answerIsCorrect);
    }
    
    return (
        <View style={[styles.container]}>
          <View style={[styles.box]}>
            <View style={[styles.text]}>
                <Text style={{
                                fontWeight:"bold", 
                                textAlignVertical: "center",
                                textAlign: "center",
                                color: "#fff",
                                fontSize: 20,
                                margin: 5}}>
                    {verseReference}
                </Text>
                {showInputBox
                    ? <TextInput 
                        style={styles.input}
                        onChangeText={setFinalAnswer}
                        value={finalAnswer}
                        placeholder="Enter the verse"
                      />
                    : <Text style={{
                                    textAlignVertical: "center",
                                    textAlign: "center",
                                    color: "#fff",
                                    fontSize: 15,}}>
                            {verseText}{"\n"}
                      </Text>
                }
                {showInputBox
                    ? <Button 
                        title="Check"
                        onPress={(e) => handleCheckButton(e)}
                        color="#c0d6df"
                      />
                    : <Button
                        title="Hide Words"
                        onPress={(e) => handleHideWordsButton(e)}
                        color="#c0d6df"
                      />
                }
            </View>
          </View>
          {showInputBox
            ? <Text style={{
                margin: 24,
                fontSize: 12,}}>
                *After entering the entire verse, 
                you can press the "CHECK" button and our system will record and check your answer. 
                However, you can't see it yet. 
                You can press the arrow in the upper left corner to go back and select another verse. 
                </Text>
            : <Text style={{
                margin: 24,
                fontSize: 12,}}>
                *Read the verse out loud and press the "HIDE WORDS" button to hide some words.
                When all the words are gone, you will be asked to enter the entire verse.
                </Text>
          }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eaeaea',
        alignItems: 'center',
        justifyContent: 'center',
      },
    box: {
        backgroundColor:"#4f6d7a",
        width: "90%",
    },
    text: {
        margin: 10,
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: '90%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: "#c0d6df",
        color: "#c0d6df",
        textAlignVertical: "top"
    },
  });