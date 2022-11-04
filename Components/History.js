import { useEffect , useState} from 'react'
import { FlatList, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import {v4} from 'uuid'

const History = ({ sheetStyle, history, resetHistory }) => {
    const styles = sheetStyle
    const [HISTORY, setHISTORY] = useState(history)

    useEffect(() => {
        setHISTORY(history)
    }, [history])

    const reset = () => {
        resetHistory()
    }

    return (
        <View style={styles.container}>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                <Text style={{...styles.text, marginLeft: '35%', marginRight: 15}}>
                    History
                </Text>
                <View style={{ borderRadius:10, backgroundColor: styles.icon.backgroundColor, marginTop: 17}}>
                    <Pressable android_ripple={{color: styles.rippleColor, borderless: true, radius: 250,}} onLongPress={reset} delayLongPress={5000} >
                        <Icon name='notebook-remove-outline' style={{...styles.icon, backgroundColor: 'none', marginVertical:0}}> Delete </Icon>
                    </Pressable>
                </View>
            </View>
            <FlatList
                data={HISTORY}
                renderItem={({item}) => <HistoryElement item={item} styles={styles}/>}
                keyExtractor={() => v4()}
                ListEmptyComponent={
                    <Text style={{...styles.text, fontSize: 15, fontWeight: 'normal'}}>
                        No recent drinks found :/
                    </Text>
                }
            />
        </View>
  )
}
const HistoryElement = ({ styles, item }) => {
    return(
        item.data.filter(obj => obj.count > 0).length !== 0 && 
        <View>
            <Text style={{...styles.text, fontSize: 15, marginBottom: 5, textAlign: 'left',}}>{item.date}</Text>
            <FlatList
                data={item.data}
                renderItem={({item}) => <DrinkElement drink={item} styles={styles}/>}
                keyExtractor={() => v4()}
                ListEmptyComponent={<Text>No drinks that day</Text>}
            />
        </View>
    )
}
const DrinkElement = ({ drink, styles }) => {
    return(
        drink.count > 0 &&
        <Text style={{color: styles.text.color, fontSize: 15, textAlign: 'left', fontWeight: 'normal'}}>
            {'    '}- {drink.name}: {drink.count}
        </Text>
    )
}

export default History