import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';

import { 
  SafeAreaView,
  StyleSheet,
  TextInput,
  View, 
  Linking, 
  TouchableOpacity, 
  Text,
  Alert
} from 'react-native';

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

const run = async (val, dur) => {
  if (val != "") {
    const URLs = val.split("\n")
    // Running button disabled
    for (let i = 0; i < URLs.length; i++) {
      await Linking.openURL(URLs[i])
      sleep(dur * 1000);
    }
    // Running button work
  } else {
    Alert.alert(`You forget to put the URLs`);
  }
}

export default function App(props) {

  const [urlInput, setUrlInput] = useState("")

  const [durationInput, setDurationInput] = useState(10)

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar
        animated={true}
        backgroundColor="#fff"/>

      <TextInput
        style={styles.URLsInput}
        multiline={true}
        numberOfLines={10}
        placeholderTextColor="#808080"
        onChangeText={(text) => setUrlInput(text)}
        value={urlInput}
        placeholder="Put your URLs here . . ."/>

      <View>

        <View style={styles.durationView}>
          <Text style={styles.durationViewText} >Duration</Text>
          <TextInput style={styles.durationViewInput}
            numberOfLines={1}
            onChangeText={(text) => setDurationInput(text)}
            value={durationInput}
            placeholderTextColor="#2C3037"
            keyboardType="numeric" />  
        </View>      

        <TouchableOpacity style={styles.btnContainer} 
            onPress={() => run(urlInput, Number(durationInput))}>
            <Text style={styles.btnText}>Run</Text>
        </TouchableOpacity>

      </View> 
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3037',
    padding: 20
  },
  URLsInput: {
    marginTop : 20,
    padding: 10,
    backgroundColor:"#41464A",
    color: "#808080",
    borderRadius : 5,
    fontSize: 16,
    textAlignVertical: 'top',
    height: 400
  },
  durationView: {
    display: "flex",
    flexDirection: "row",
    justifyContent : "center",
    alignItems : "center",
    marginTop : 20,
    marginBottom : 20
  },
  durationViewText: {
    fontSize: 25,
    fontWeight : "bold",
    color: "#fff",
    marginRight : 10
  },
  durationViewInput: {
    width: 75,
    backgroundColor : "#fff",
    fontSize : 20,
    padding : 10,
    fontWeight: "bold",
    textAlign: "center",
    borderRadius : 100
  },
  btnContainer: {
    backgroundColor: "#fff",
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 2,
  },
  btnText: {
    fontSize: 30,
    fontWeight : "bold",
    color: "#2C3037",
    alignSelf: "center"
  }
});
