import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const EditDrink = ({ sheetStyle, editDrink, Delete, pressedDrink, beerArray }) => {
  const styles = sheetStyle
  
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [payCount, setPayCount] = useState('')
  const [lastPayCount, setLastPayCount] = useState(0)
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    setName(pressedDrink.name)
    setPrice(String(pressedDrink.price))
    setPayCount(String(pressedDrink.payCount))
    setLastPayCount(pressedDrink.payCount)
    setCount(pressedDrink.count)
  }, [pressedDrink])

  const onEditDrink = () => {
      let key = pressedDrink.key
      const countDifference = beerArray.includes(pressedDrink.name) ?  lastPayCount - parseInt(payCount) : 0;
      const newCount = count + (parseInt(payCount) - lastPayCount)
      editDrink({name, price, payCount: payCount, count: newCount, key}, countDifference)
  }
  const onDelete = () => {
      Delete(pressedDrink);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit your Drink</Text>
      <TextInput  style={styles.input} placeholder='Name' value={name} placeholderTextColor='#aaaaaa'
                  onChangeText={newText => setName(newText)} blurOnSubmit
      />
      <TextInput  style={styles.input} placeholder='Price (cents)' value={price} placeholderTextColor='#aaaaaa'
                  keyboardType='phone-pad' blurOnSubmit
                  onChangeText={newText => {
                                if(Number.isNaN(parseInt(newText))) {
                                  setPrice('') 
                                  return
                                }
                                parseInt(newText) < 0 ? setPrice(`${-parseInt(newText)}`) : setPrice(`${parseInt(newText)}`)
                              }}
      />
      <TextInput  style={styles.input} placeholder='Count' value={payCount} placeholderTextColor='#aaaaaa'
                  keyboardType='phone-pad' blurOnSubmit
                  onChangeText={newText => {
                                if(Number.isNaN(parseInt(newText))) {
                                  setPayCount('') 
                                  return
                                }
                                parseInt(newText) < 0 ? setPayCount(`${-parseInt(newText)}`) : setPayCount(`${parseInt(newText)}`)
                              }}
      />
      <View style={{alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Icon name='close' onPress={onDelete} style={styles.icon}> Delete </Icon>
        <Icon name='check' onPress={onEditDrink} style={styles.icon}> Save </Icon>
      </View>  
    </View>
  )
}


export default EditDrink