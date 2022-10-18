import { useEffect, useState } from 'react'
import { View, StyleSheet, TextInput, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const EditCount = ({count, setDooku}) => {
  
    const [sudooku, setSudooku] = useState('')

    useEffect(() => {
        setSudooku(String(count))
    }, [count])

    const onSubmit = () => {
        setDooku(parseInt(sudooku))
    }
    const onReset = () => {
        setDooku(0)
    }
    return (
    <View style={styles.container}>
        <Text style={styles.text}>Edit Total Beers</Text>
        <TextInput  style={styles.input} value={sudooku} placeholder='Total Beers' placeholderTextColor='#aaaaaa'
                    keyboardType='phone-pad' onChangeText={newText => setSudooku(newText)}/>

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

export default EditCount