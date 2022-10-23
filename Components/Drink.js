import Icon from 'react-native-vector-icons/FontAwesome';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const Drink = ({ currentStyle, drink, change, openEdit, beerArray }) => {
  const textColor = currentStyle.name !== 'light' ? currentStyle.textColor : '#fff'
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
      color: textColor,
      maxWidth: 180,
      textAlignVertical: 'center',
      paddingBottom: 3,
    },
    icon: {
      color: '#fff',
      fontSize: 24,
    }
  })

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
    openEdit(drink)
  }

  return (
    <View style={{marginVertical: 5, marginHorizontal: 30, borderRadius: 10, backgroundColor: currentStyle.drinkColor,}}>
      <Pressable android_ripple={{color: currentStyle.rippleColor, borderless: true, radius: 250,}} onLongPress={drinkLongPress}>
        <View style={style.container}>
          <Text style={style.list}>{drink.name}</Text>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', textAlignVertical: 'center'}}>
            <Pressable onPress={substract} style={{display: 'flex', justifyContent: 'center'}} hitSlop={15}>
              <Icon name='minus' style={style.icon}/>
            </Pressable>

            <Text style={{fontSize: 24, color: textColor, marginHorizontal: 12, textAlignVertical: 'center', paddingBottom: 5,}}>
              {drink.count}
            </Text>

            <Pressable onPress={add} style={{display: 'flex', justifyContent: 'center'}} hitSlop={15}>
              <Icon name='plus' style={style.icon}/>
            </Pressable>
          </View>
        </View>
      </Pressable>      
    </View>
  )
}

export default Drink
