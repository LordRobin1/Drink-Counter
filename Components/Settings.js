import { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import { dark, light, blue } from '../styles.js'

const Settings = ({currentStyle, changeStyle}) => {
    const styles = StyleSheet.create({
        container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: currentStyle.sheetColor,
            paddingHorizontal: 40,
          },
          text: {
            textAlign: 'center',
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: 20,
            color: currentStyle.textColor,
          },
          button1 :{
            padding: 20,
            width: 70,
            height: 70,
            backgroundColor: '#151515',
            borderRadius: 50,
          },
          button2 :{
            width: 70,
            height: 70,
            backgroundColor: '#fff',
            borderRadius: 50,
          },
          button3 :{
            width: 70,
            height: 70,
            backgroundColor: '#00417d',
            borderRadius: 50,
          },
          wrapper: {
            marginTop: 35,
            padding: 5,
            borderRadius: 50,
            borderStyle: 'solid',
            borderColor: '#fff',
            borderWidth: 3,
          }
    })
    const [first, setFirst] = useState(true)
    const [second, setSecond] = useState(false)
    const [third, setThird] = useState(false)
    
    useEffect(() => {
        if(currentStyle.name === 'dark') {
            setFirst(true)
            setSecond(false)
            setThird(false)
        }
        else if(currentStyle.name === 'light') {
            setFirst(false)
            setSecond(true)
            setThird(false)
        }
        else {
            setFirst(false)
            setSecond(false)
            setThird(true)
        }
    }, [currentStyle])
    
    const pressFirst = () => {
        changeStyle('dark')
    }
    const pressSecond = () => {
        changeStyle('light')
    }
    const pressThird = () => {
        changeStyle('blue')
    }
    
    return (
    <View style={styles.container}>
        <Text style={styles.text}>Choose Theme</Text>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={first ? styles.wrapper : {marginTop: 40, paddingHorizontal: 8, paddingVertical: 5}}>
                <Pressable style={styles.button1} onPress={pressFirst}/>
            </View>
            <View style={second ? styles.wrapper : {marginTop: 40, paddingHorizontal: 8, paddingVertical: 5}}>
                <Pressable style={styles.button2} onPress={pressSecond}/>
            </View>
            <View style={third ? styles.wrapper : {marginTop: 40, paddingHorizontal: 8, paddingVertical: 5}}>
                <Pressable style={styles.button3} onPress={pressThird}/>
            </View>
        </View>
    </View>
  )
}

export default Settings