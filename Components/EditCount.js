import { useEffect, useState } from 'react'
import { View, StyleSheet, TextInput, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const EditCount = ({count, setDooku, beers, setBeers}) => {
  
    const [sudooku, setSudooku] = useState('')
    const [beerArray, setBeerArray] = useState([])

    useEffect(() => {
        setSudooku(String(count))
        setBeerArray(beers)
    }, [count, beers])

    const onSubmitDooku = () => {
        setDooku(parseInt(sudooku))
    }
    const onResetDooku = () => {
        setDooku(0)
    }
    const Value = () => {
      let value = ''
      beerArray.map(obj => value += `${obj}${beerArray.indexOf(obj) === beerArray.length - 1 ? '' : '/'}`)
      return value
    }
    const beerValue = Value()

    const generateBeers = (text) => {
      setBeerArray(text.split('/'))
    }
    const onSubmitBeers = () => {
        setBeers(beerArray)
    }
    const onResetBeers = () => {
        setBeers(['Pils', 'Urpils', 'Beckers', 'Bier', 'Weizen'])
    }
    return (
    <View style={styles.container}>
        <Text style={styles.text}>Edit Total Beers</Text>
        <TextInput  style={styles.input} value={sudooku} placeholder='Total Beers' placeholderTextColor='#aaaaaa'
                    keyboardType='phone-pad' onChangeText={newText => setSudooku(newText)}/>
        <View style={{alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Icon name='close' onPress={onResetDooku} style={styles.icon}> Reset </Icon>
            <Icon name='check' onPress={onSubmitDooku} style={styles.icon}> Save </Icon>
        </View> 

        <Text style={styles.text}>Edit Beers</Text>
        <TextInput  style={styles.input} value={beerValue} placeholder='Count as Beer' placeholderTextColor='#aaaaaa'
                    onChangeText={newText => generateBeers(newText)}/>

        <View style={{alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Icon name='close' onPress={onResetBeers} style={styles.icon}> Reset </Icon>
            <Icon name='check' onPress={onSubmitBeers} style={styles.icon}> Save </Icon>
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