import { useEffect , useState} from 'react'
import { FlatList, View, Text } from 'react-native'

const History = ({ sheetStyle, drinks, history }) => {
    const styles = sheetStyle
    const [past, setPast] = useState(history)

    // useEffect(() => {
    //     const day = new Date()
    //     console.log(day)
    // }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                History
            </Text>
            {history.length > 0 &&
            <HistoryElement styles={styles} history={history}/>}
        </View>
  )
}
const HistoryElement = ({ styles, history }) => {
    return(
        <View>
            <Text style={{color: '#fff'}}>{history[0].date}</Text>
            <Text style={{color: '#fff'}}>{history[0].drinks[0].name}: {history[0].drinks[0].count}</Text>
        </View>
    )
}

export default History