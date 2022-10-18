import { StyleSheet, Text, Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

const BottomMenu = ({ drinks, onPaid }) => {
    
    const total = (drinks) => {
        let price = 0;
        drinks.map(drink => price += (drink.price * drink.count))
        return price / 100
    }

    return (
    <View style={styles.container}>
        <Text style={styles.text}>
            Total:  {total(drinks)} €
        </Text>
        <View style={{backgroundColor: '#00417d', borderRadius: 10,}}>
            <Pressable android_ripple={{color: '#002669', borderless: true, radius: 69}} onPress={onPaid}>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 5, paddingHorizontal: 10}}>
                    <Icon name='check' style={styles.icon}/>
                    <Text style={styles.text}>Paid</Text>
                </View>               
            </Pressable>
        </View> 
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        textAlignVertical: 'bottom',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 40,
    },
    text: {
        color: '#fff',
        fontSize: 30,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginLeft: 10,
    },
    icon: {
        fontSize: 24,
        color: '#fff',
        textAlignVertical: 'center',
    }
})

export default BottomMenu