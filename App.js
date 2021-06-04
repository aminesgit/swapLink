import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  SafeAreaView,
  StyleSheet,
  TextInput,
  View, 
  TouchableOpacity, 
  Text,
  Image,
  Alert,
  Linking
} from 'react-native';
import { Audio } from 'expo-av';
import colors from "./constants/colors"

export default function App() {

  const [urlInput, setUrlInput] = useState("")
  const [durationInput, setDurationInput] = useState("15")
  const [sound, setSound] = useState();
  const [isRun, setIsRun] = useState(false)
  const [counting, setCouting] = useState(0)
  const [linksNumber, setLinksNumber] = useState(0)
  const [runningTimeInS, setRunningTimeInS] = useState(0)

  const playSound = async () => {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('./assets/bellSound.wav')
    );
    setSound(sound);
    await sound.playAsync(); 
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  const clear = () => {
    if (urlInput == ""){
      Alert.alert(`The input already is emply.`);
    } else {
      setUrlInput("")
    }
  }

  const formatTime = (timeInS) => {
    if (timeInS <= 60) { // seconds
      return `${timeInS}s`
    } else if ((timeInS/60) <= 60) { // minutes
      if (timeInS % 60 == 0) {
        return `${parseInt(timeInS / 60)}m`
      } else {
        return `${parseInt(timeInS / 60)}m ${timeInS % 60}s`
      }
    } else  { // hours
      return `${parseInt((timeInS / 60) / 60)}h ${parseInt(timeInS / 60) % 60}m ${timeInS % 60}s`      
    }
  }

  const clickRunningBtn = async (URLsValue, duration) => {
    if (URLsValue == "") {
      Alert.alert(`You forget to put the URLs`);
    } else {
      setIsRun(true)
      const URLs = URLsValue.split("\n")
      setLinksNumber(URLs.length)
      let timeout = duration * URLs.length
      for (let i = 0; i < URLs.length; i++) {
        setRunningTimeInS(timeout)
        await Linking.openURL(URLs[i])
        setCouting(i + 1)
        sleep(duration * 1000);
        timeout -= duration
      }
      setIsRun(false)
      playSound()
      Alert.alert(
        "Looping complete ✓",
        "Do you wanna loop again ?",
        [
          {
            text: "No",
            style: "cancel"
          },
          { text: "Again",
            onPress: () => clickRunningBtn(URLsValue, duration)
          }
        ]
      )
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={colors.white}/>

      <View style={styles.SettingScreen}>
        <View style={styles.URLsInputView} >
          <TextInput
              style={styles.URLsInput}
              multiline={true}
              numberOfLines={10}
              placeholderTextColor="#808080"
              onChangeText={(text) => setUrlInput(text)}
              value={urlInput}
              placeholder="Put your URLs here ..."/>
          <View style={styles.trashIconContainer}>
            <TouchableOpacity style={styles.trashIconView} onPress={clear}>
              <Image source={require("./assets/trashIcon.png")} 
                    style={styles.trashIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={styles.durationView}>
            <Text style={styles.durationViewText}>Duration in S</Text>
            <TextInput style={styles.durationViewInput}
                numberOfLines={1}
                onChangeText={(text) => setDurationInput(text)}
                value={durationInput}
                placeholderTextColor="#2C3037"
                keyboardType="numeric" />  
          </View>      
          <TouchableOpacity style={styles.btnContainer} 
              onPress={() => clickRunningBtn(urlInput, Number(durationInput))}>
              <Text style={styles.btnText}>Run</Text>
          </TouchableOpacity>
        </View> 
      </View>

      { isRun && <View style={styles.RunningScreen}>
          <Text style={styles.linksText}>{counting}/{linksNumber} 🚀</Text>
          <Text style={styles.timeText}>{formatTime(runningTimeInS)}</Text>
      </View>}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },

  // SettingScreen Style
  SettingScreen: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignContent: "center",
  },
  URLsInput: {
    marginTop : 20,
    padding: 10,
    backgroundColor: colors.inputBgColor,
    color: colors.inputContentColor,
    borderRadius : 5,
    fontSize: 16,
    textAlignVertical: 'top',
    height: 400,
    color: "#fa5"
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
    color: colors.white,
    marginRight : 10
  },
  durationViewInput: {
    width: 75,
    backgroundColor : colors.white,
    fontSize : 20,
    padding : 10,
    fontWeight: "bold",
    textAlign: "center",
    borderRadius : 100
  },
  btnContainer: {
    backgroundColor: colors.white,
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 2,
  },
  btnText: {
    fontSize: 30,
    fontWeight : "bold",
    color: colors.bgColor,
    alignSelf: "center"
  },
  trashIconContainer: {
    alignItems: "flex-end",
    paddingTop: 10,
    height: 25,
  },
  trashIconView: {
    width: 40,
    height: 40,
    padding: 5,
    backgroundColor : colors.inputBgColor,
    borderRadius: 100
  },
  trashIcon: {
    width: "100%",
    height: "100%",
  },

  // RunningScreen Style
  RunningScreen: {
    position : "absolute",
    top : 0,
    padding: 20,
    width : "100%",
    height : "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor : "#000b"
  },
  linksText: {
    fontSize : 50,
    color: "#fff",
    fontWeight : "bold"
  },
  timeText: {
    fontSize : 20,
    color: "#fff",
    fontWeight : "bold"
  }
});
