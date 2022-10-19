import { useState, useEffect} from 'react'
import { View, StyleSheet, Text, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const EditHeadLine = ({setHL, HL}) => {
    
    const [headLine, setHeadLine] = useState('')

    useEffect(() => {
        setHeadLine(HL)
    }, [HL])

    const onSubmit = () => {
        setHL(headLine)
    }
    const onReset = () => {
        setHL('Drink Counter')
    }
    return (
    <View style={styles.container}>
        <Text style={styles.text}>Edit Title</Text>
        <TextInput  style={styles.input} value={headLine} placeholder='Title' placeholderTextColor='#aaaaaa'
                    onChangeText={newText => setHeadLine(newText)}/>

        <View style={{alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Icon name='close' onPress={onReset} style={styles.icon}> Reset </Icon>
            <Icon name='check' onPress={onSubmit} style={styles.icon}> Save </Icon>
        </View> 
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: '#252525',
      paddingHorizontal: 40,
    },
    text: {
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 20,
      color: 'white',
    },
    input: {
      color: 'white',
      fontSize: 20,
      marginVertical: 10,
      padding: 5,
      borderBottomColor: '#00417d',
      borderBottomWidth: 1,
    },
    icon: {
      color: 'white',
      fontSize: 20,
      textAlign: 'center',
      marginVertical: 10,
      backgroundColor: '#1b1b1b',
      padding: 10,
      borderRadius: 10,
    },
})

export default EditHeadLine