import Icon from 'react-native-vector-icons/FontAwesome';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const Drink = ({ drink, change, handleOpen, beerArray }) => {

  const add = () => {
    drink.count++
    change(drink, beerArray.includes(drink.name), true)
  }
  const substract = () => {
    if (drink.count <= 0) return
    drink.count--
    change(drink, beerArray.includes(drink.name), false)
  }
  const drinkLongPress = () => {
    handleOpen(1, false, drink)
  }

  return (
    <View style={{marginVertical: 5, marginHorizontal: 30, borderRadius: 10, backgroundColor: '#252525',}}>
      <Pressable android_ripple={{color: '#aaaaaa', borderless: true, radius: 250,}} onLongPress={drinkLongPress}>
        <View style={style.container}>
          <Text style={style.list}>{drink.name}</Text>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', textAlignVertical: 'center'}}>
            <Pressable onPress={substract} style={{display: 'flex', justifyContent: 'center'}} hitSlop={6}>
              <Icon name='minus' style={style.icon}/>
            </Pressable>

            <Text style={{fontSize: 24, color: 'white', marginHorizontal: 7, textAlignVertical: 'center', paddingBottom: 5,}}>{drink.count}</Text>

            <Pressable onPress={add} style={{display: 'flex', justifyContent: 'center'}} hitSlop={6}>
              <Icon name='plus' style={style.icon}/>
            </Pressable>
          </View>
        </View>
      </Pressable>      
    </View>
  )
}

export default Drink

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  list: {
    fontSize: 20,
    fontWeight: 'normal',
    color: 'white',
    maxWidth: 180,
    textAlignVertical: 'center',
  },
  icon: {
    color: 'white',
    fontSize: 24,
  }
})