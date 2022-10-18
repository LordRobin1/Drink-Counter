import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddDrink = ({ saveDrink, drinks }) => {
  
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

export default AddDrink