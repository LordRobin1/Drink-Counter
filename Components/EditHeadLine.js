import { useState, useEffect} from 'react'
import { View, Text, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const EditHeadLine = ({ sheetStyle, setHL, HL }) => {
  const styles = sheetStyle
    
    const [headLine, setHeadLine] = useState('')

    useEffect(() => {
        setHeadLine(HL)
    }, [HL])

    const onSubmit = () => {
        setHL(headLine)
    }
    const onReset = () => {
        setHL('Drink Counter')
    }
    return (
    <View style={styles.container}>
        <Text style={styles.text}>Edit Title</Text>
        <TextInput  style={styles.input} value={headLine} placeholder='Title' placeholderTextColor='#aaaaaa'
                    onChangeText={newText => setHeadLine(newText)}/>

        <View style={{alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Icon name='close' onPress={onReset} style={styles.icon}> Reset </Icon>
            <Icon name='check' onPress={onSubmit} style={styles.icon}> Save </Icon>
        </View> 
    </View>
  )
}

export default EditHeadLine