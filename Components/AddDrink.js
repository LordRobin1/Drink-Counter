import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddDrink = ({ sheetStyle, saveDrink, drinks }) => {
  const styles = sheetStyle
  
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  
  const onAddDrink = () => {
      saveDrink({name, price})
      setName('')
      setPrice('')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add a Drink</Text>
      <TextInput  style={styles.input} placeholder='Name' value={name} placeholderTextColor='#aaaaaa'
                  onChangeText={newText => setName(newText)} blurOnSubmit
      />
      <TextInput  style={styles.input} placeholder='Price (cents)' value={price} placeholderTextColor='#aaaaaa'
                  keyboardType='phone-pad' onChangeText={newText => setPrice(newText)} blurOnSubmit
      />
      <View style={{alignItems: 'center'}}>
        <Icon name='check' onPress={onAddDrink} style={styles.icon}> Save </Icon>
      </View>  
    </View>
  )
}


export default AddDrink