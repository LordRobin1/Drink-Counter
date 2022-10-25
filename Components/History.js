import { useEffect , useState} from 'react'
import { FlatList, View, Text } from 'react-native'
import {v4} from 'uuid'

const History = ({ sheetStyle, drinks, history }) => {
    const styles = sheetStyle
    const [HISTORY, setHISTORY] = useState(history)

    useEffect(() => {
        setHISTORY(history)
    }, [history])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                History
            </Text>
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
        <Text style={{color: styles.text.color, fontSize: 15, textAlign: 'left', fontWeight: 'normal'}}>
            {'    '}- {drink.name}: {drink.count}
        </Text>
    )
}

export default History