import { useEffect, useState } from 'react'
import { View, StyleSheet, TextInput, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const EditCount = ({sheetStyle, count, setDooku, beers, setBeers}) => {
  const styles = sheetStyle
  
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
                    keyboardType='phone-pad' onChangeText={newText => {
                                                            if(Number.isNaN(parseInt(newText))) {
                                                              setSudooku('') 
                                                              return
                                                            }
                                                            parseInt(newText) < 0 ? setSudooku(`${-parseInt(newText)}`) : setSudooku(`${parseInt(newText)}`)
                                                          }}
        />
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

export default EditCount