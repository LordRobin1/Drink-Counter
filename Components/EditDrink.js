import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const EditDrink = ({ editDrink, Delete, pressedDrink, beerArray }) => {
  
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [count, setCount] = useState('')
    const [lastCount, setLastCount] = useState(0)
    
    useEffect(() => {
      setName(pressedDrink.name)
      setPrice(String(pressedDrink.price))
      setCount(String(pressedDrink.count))
      setLastCount(pressedDrink.count)
    }, [pressedDrink])

    const onEditDrink = () => {
        let key = pressedDrink.key
        const countDifference = beerArray.includes(pressedDrink.name) ?  lastCount - count : 0;
        editDrink({name, price, count, key}, countDifference)
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
                  onChangeText={newText => setPrice(newText)} 
      />
      <TextInput  style={styles.input} placeholder='Count' value={count} placeholderTextColor='#aaaaaa'
                  keyboardType='phone-pad' blurOnSubmit
                  onChangeText={newText => setCount(newText)} 
      />
      <View style={{alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Icon name='close' onPress={onDelete} style={styles.icon}> Delete </Icon>
        <Icon name='check' onPress={onEditDrink} style={styles.icon}> Save </Icon>
      </View>  
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 20,
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

export default EditDrink