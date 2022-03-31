import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

/**
 * CategoryBox component displays a single category word.
 */
const CategoryBox = (props) => {
  return (
    <View>
      <TouchableOpacity 
        style={[styles.card]}
        delayPressIn={800}
        onPress={() => props.navigation.navigate('Verses', { label: props.label, verses: props.verses })}
      >
        <Text style={[styles.box]}>
          {props.label}
        </Text>
        <Text style={[styles.category]}>
          {props.label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

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

export default CategoryBox;
