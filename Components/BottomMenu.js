import { StyleSheet, Text, Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

const BottomMenu = ({ currentStyle, drinks, onPaid }) => {
    const styles = StyleSheet.create({
        container: {
            textAlignVertical: 'bottom',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 40,
        },
        text: {
            color: currentStyle.textColor,
            fontSize: 30,
            textAlign: 'center',
            textAlignVertical: 'center',
            marginLeft: 10,
            paddingBottom: 3,
        },
        icon: {
            fontSize: 24,
            color: '#fff',
            textAlignVertical: 'center',
        }
    })
    
    const total = (drinks) => {
        let price = 0;
        drinks.map(drink => price += (drink.price * drink.payCount))
        return price / 100
    }

    return (
    <View style={styles.container}>
        <Text style={styles.text}>
            Total:  {total(drinks)} €
        </Text>
        <View style={{backgroundColor: currentStyle.accentColor, borderRadius: 10,}}>
            <Pressable android_ripple={{color: currentStyle.rippleColor, borderless: true, radius: 69}} onPress={onPaid}>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 5, paddingHorizontal: 10}}>
                    <Icon name='check' style={styles.icon}/>
                    <Text style={{...styles.text, color: '#fff'}}>Paid</Text>
                </View>               
            </Pressable>
        </View> 
    </View>
  )
}

export default BottomMenu