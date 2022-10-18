import Icon from 'react-native-vector-icons/FontAwesome'
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import Drink from './Drink';


const Drinks = ({ drinks, change, handleOpen, beerArray }) => {

  const open = () => {
    handleOpen(1, true)
  }
  return (
    <ScrollView fadingEdgeLength={100}>
        {
          drinks.map( (drink) => {
              return (<Drink drink={drink} change={change} handleOpen={handleOpen} beerArray={beerArray} key={drink.key}/>)
            }                
          )
        }
        <View style={styles.plus}>
          <Pressable android_ripple={{color: '#aaaaaa', borderless: true, radius: 250}} onPress={open}>
            <Icon name='plus' style={styles.icon}/>
          </Pressable>
        </View>
    </ScrollView>
    
  )
}
const styles = StyleSheet.create({
  plus: {
    backgroundColor: '#252525',
    marginVertical: 5,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  icon: {
    textAlign: 'center',
    color: 'grey',
    fontSize: 24,
    margin: 20,
  }
})

export default Drinks