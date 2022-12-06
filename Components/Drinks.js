import Icon from 'react-native-vector-icons/FontAwesome'
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import Drink from './Drink';


const Drinks = ({ currentStyle, drinks, change, openAdd, openEdit, beerArray }) => {

  const styles = StyleSheet.create({
    plus: {
    backgroundColor: currentStyle.drinkColor,
    marginVertical: 5,
    marginHorizontal: 30,
    borderRadius: 10,
    },
    icon: {
      textAlign: 'center',
      color: '#fff',
      fontSize: 24,
      margin: 20,
    }
  })

  return (
    <ScrollView fadingEdgeLength={100}>
        {
          drinks.map( (drink) => {
              return (
                <Drink currentStyle={currentStyle} drink={drink} change={change} openEdit={openEdit} beerArray={beerArray} key={drink.key}/>
              )
            }                
          )
        }
        <View style={styles.plus}>
          <Pressable android_ripple={{color: currentStyle.rippleColor, borderless: true, radius: 250}} onPress={openAdd}>
            <Icon name='plus' style={styles.icon}/>
          </Pressable>
        </View>
    </ScrollView>
    
    )
}

export default Drinks