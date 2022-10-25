import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useState, useRef, useCallback, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/EvilIcons'
import 'react-native-get-random-values';
import { v4 } from 'uuid';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

import BottomMenu from './Components/BottomMenu';
import Drinks from './Components/Drinks';
import AddDrink from './Components/AddDrink';
import EditDrink from './Components/EditDrink';
import EditCount from './Components/EditCount';
import EditHeadLine from './Components/EditHeadLine';
import Settings from './Components/Settings';
import History from './Components/History';
import { editObject, readObject, saveObject } from './Components/Backend';
import { dark, light, blue } from './styles.js';
import Fassroller from './assets/favicon.png';


export default function App() {
  
  const [drinks, setDrinks] = useState([])
  const [countDooku, setCountDooku] = useState(0)
  const [title, setTitle] = useState('Drink Counter')
  const [beerArray, setBeerArray] = useState(['Pils', 'Urpils', 'Beckers', 'Bier', 'Weizen'])
  const [appIsReady, setAppIsReady] = useState(false);
  const [styles, setStyles] = useState(dark)
  const [history, setHistory] = useState([])

  const addSheetRef = useRef(null)
  const editSheetRef = useRef(null)
  const countSheetRef = useRef(null)
  const HLSheetRef = useRef(null)
  const settingsSheetRef = useRef(null)
  const historySheetRef = useRef(null)

  const snapPoints = ['40%', '60%']
  const snapPoints_1 = ['60%', '85%']
  const [pressedDrink, setPressedDrink] = useState(dark);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const storedTitle = await readObject('Title')
        const storedDrinks = await readObject('drinks')
        const storedDooku = await readObject('BigDDuddersDooku')
        const storedBeerArray = await readObject('BeerArray')
        const storedTheme = await readObject('Theme')
        storedDrinks !== null && setDrinks(storedDrinks)
        storedDooku !== null && setCountDooku(storedDooku)
        storedTitle !== null && setTitle(storedTitle)
        storedBeerArray !== null && setBeerArray(storedBeerArray)
        storedTheme !== null && setStyles(storedTheme)
      } catch(e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)       
      }
    }
    fetchDrinks()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const backDrop = useCallback(
    props => (
      <BottomSheetBackdrop {...props} appearsOnIndex={1} disappearsOnIndex={0} enableTouchThrough={true}/>
      ), []
  )
  if (!appIsReady) {
    return null;
  }
      
  //drink functions
  const changeCount = async (passedDrink, countD, plusMinus) => {
    const key = passedDrink.key
    const count = passedDrink.count
    const tempDrinks = drinks.map(drink => drink.key === key ? { ...drink, count: count } : drink)
    setDrinks(tempDrinks)
    
    if (!countD || (countDooku === 0 && !plusMinus)) {
      await editObject('drinks', tempDrinks)
      return
    }
    if (plusMinus) {
      const DooSuCountu = countDooku + 1
      setCountDooku(DooSuCountu)
      await editObject('drinks', tempDrinks)
      await editObject('BigDDuddersDooku', DooSuCountu)
      updateHistory(passedDrink, 1)
      return
    }
    const DooSuCountu = countDooku - 1
    setCountDooku(DooSuCountu)
    await editObject('drinks', tempDrinks)
    await editObject('BigDDuddersDooku', DooSuCountu)
    updateHistory(passedDrink, -1)
  }

  const updateHistory = (drink, num) => {
    const date = new Date("2022-10-24T23:50:21.817Z")
    const day = `${date}`.substring(0, 14)

    if (history.filter(item => item.date === day ).length === 0) {
      setHistory([...history, {
          date: day,
          data: [{...drink}],
          id: v4(),
        }]
      )
      return
    }

    const temp = Array.from(history)
    for (const item of temp) {
      if (item.date !== day) {
        continue
      }
      let exists
      item.data.map(obj => {
        if (obj.name === drink.name) {
          obj.count += num
          exists = true
        }
      })
      if (!exists) {
        item.data.push(drink)
      }
      break
    }
    setHistory(temp)
    // await saveObject('History', history)
  }

  const reset = async () => {
    const tempDrinks = drinks.map(drink => {return ({...drink, count: 0})})
    setDrinks(tempDrinks)
    await editObject('drinks', tempDrinks)
  }

  const save = async (drink) => {
    const tempDrinks = [...drinks, {name: drink.name, price: drink.price, count: 0, key: v4()}]
    setDrinks(tempDrinks)
    await saveObject('drinks', tempDrinks)
    addSheetRef.current.close()
  }

  const Delete = async (drink) => {
    const key = drink.key
    const tempDrinks = drinks.filter(drink => drink.key !== key)
    setDrinks(tempDrinks)
    await editObject('drinks', tempDrinks)
    editSheetRef.current.close()
  }

  const edit = async (drink, countDifference) => {
    const name = drink.name
    const price = drink.price
    const count = drink.count
    const key = drink.key

    const newDooku = countDooku - countDifference
    const oldDrink = drinks.filter(obj => obj.key === key)[0]
    if (!beerArray.includes(oldDrink.name) && beerArray.includes(name)) {
      setDooku(countDooku + parseInt(count))
    }
    else if (beerArray.includes(oldDrink.name) && !beerArray.includes(name)) {
      setDooku(countDooku - parseInt(count))
    }
    else {    
      setDooku(newDooku)
    }

    const tempDrinks = drinks.map(drink => drink.key === key ? drink = {name: name, price: price, count: count, key: key} : drink)
    setDrinks(tempDrinks)
    await editObject('drinks', tempDrinks)
    editSheetRef.current.close()
  }

  const setDooku = async (number) => {
    setCountDooku(number)
    await editObject('BigDDuddersDooku', number)
    countSheetRef.current.close()
  }

  const setHeadLine = async (HL) => {
    setTitle(HL)
    await editObject('Title', HL)
    HLSheetRef.current.close()
  }
  
  const setBeers = async (beers) => {
    setBeerArray(beers)
    console.log(beers)
    await editObject('BeerArray', beers)
    countSheetRef.current.close()
  }

  const changeStyle = async (style) => {
    if (style === 'dark') {
      setStyles(dark)
      await editObject('Theme', dark)
    }
    else if (style === 'light') {
      setStyles(light)
      await editObject('Theme', light)
    }
    else {
      setStyles(blue)
      await editObject('Theme', blue)
    }
  }
  
  //Bottomsheet
  const openAddSheet = async () => {
    addSheetRef.current.snapToIndex(1)
    editSheetRef.current.close()
    HLSheetRef.current.close()
    settingsSheetRef.current.close()
    countSheetRef.current.close()
    historySheetRef.current.close()
  }
  const openEditSheet = async (drink) => {
    setPressedDrink(drink)
    editSheetRef.current.snapToIndex(1)
    addSheetRef.current.close()
    countSheetRef.current.close()
    HLSheetRef.current.close()
    settingsSheetRef.current.close()
    historySheetRef.current.close()
  }

  const openCountSheet = () => {
    countSheetRef.current.snapToIndex(1)
    addSheetRef.current.close()
    editSheetRef.current.close()
    HLSheetRef.current.close()
    settingsSheetRef.current.close()
    historySheetRef.current.close()
  }

  const openHeadLineSheet = () => {
    HLSheetRef.current.snapToIndex(1)
    addSheetRef.current.close()
    editSheetRef.current.close()
    countSheetRef.current.close()
    settingsSheetRef.current.close()
    historySheetRef.current.close()
  }
  
  const openSettingsSheet = () => {
    settingsSheetRef.current.snapToIndex(1)
    addSheetRef.current.close()
    editSheetRef.current.close()
    countSheetRef.current.close()
    HLSheetRef.current.close()
    historySheetRef.current.close()
  }
  const openHistorySheet = () => {
    historySheetRef.current.snapToIndex(1)
    settingsSheetRef.current.close()
    addSheetRef.current.close()
    editSheetRef.current.close()
    countSheetRef.current.close()
    HLSheetRef.current.close()
  }
  

  const sheetStyle = StyleSheet.create({
    container: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: styles.sheetColor,
      paddingHorizontal: 40,
    },
    text: {
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 20,
      color: styles.textColor,
    },
    input: {
      color: styles.textColor,
      fontSize: 20,
      marginVertical: 10,
      padding: 5,
      borderBottomColor: '#00417d',
      borderBottomWidth: 1,
    },
    icon: {
      color: styles.textColor,
      fontSize: 20,
      textAlign: 'center',
      marginVertical: 10,
      backgroundColor: styles.sheetHandleColor,
      padding: 10,
      borderRadius: 10,
    },
  })

  return (

    <GestureHandlerRootView style={{flex: 1}}>

        <View style={styles.container} onLayout={onLayoutRootView}> 

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Pressable onLongPress={openHeadLineSheet} delayLongPress={1000}>
              <Text style={styles.text}>{title}</Text>
            </Pressable>
            <Pressable onPress={openHistorySheet}>
              <Icon name='clock' style={styles.icon}/>
            </Pressable>
            <Pressable onPress={openSettingsSheet}>
              <Icon name='gear' style={{...styles.icon, marginRight: 15}}/>
            </Pressable>
          </View>
          
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <Image style={styles.fassroller} source={Fassroller} fadeDuration={0}/>
            <Pressable onLongPress={openCountSheet} delayLongPress={2500}>
              <Text style={styles.countSudoku}>{countDooku}</Text>
            </Pressable>
          </View>

          <View style={styles.content}>
            <Drinks currentStyle={styles} drinks={drinks} change={changeCount} openAdd={openAddSheet}
                    openEdit={openEditSheet} beerArray={beerArray}/>
            <BottomMenu currentStyle={styles} drinks={drinks} onPaid={reset}/>
          </View>

          <BottomSheet
            ref={countSheetRef}
            snapPoints={snapPoints_1}
            index={-1}
            enableOverDrag
            enablePanDownToClose
            backdropComponent={backDrop}
            backgroundStyle={{backgroundColor: styles.sheetColor, borderTopLeftRadius: 20, borderTopRightRadius: 20,}}
            handleStyle={{backgroundColor: styles.sheetHandleColor, borderTopLeftRadius: 20, borderTopRightRadius: 20,}}
            handleIndicatorStyle={{backgroundColor: styles.sheetHandleIndicatorColor,}}
          >
            <View style={{backgroundColor: styles.sheetHandleColor,}}>
              <EditCount sheetStyle={sheetStyle} count={countDooku} setDooku={setDooku} 
                         beers={beerArray} setBeers={setBeers}
              />
            </View>
          </BottomSheet>

          <BottomSheet
            ref={HLSheetRef}
            snapPoints={snapPoints}
            index={-1}
            enableOverDrag
            enablePanDownToClose
            backdropComponent={backDrop}
            backgroundStyle={{backgroundColor: styles.sheetColor, borderTopLeftRadius: 20, borderTopRightRadius: 20,}}
            handleStyle={{backgroundColor: styles.sheetHandleColor, borderTopLeftRadius: 20, borderTopRightRadius: 20,}}
            handleIndicatorStyle={{backgroundColor: styles.sheetHandleIndicatorColor,}}
          >
            <View style={{backgroundColor: styles.sheetHandleColor,}}>
              <EditHeadLine sheetStyle={sheetStyle} HL={title} setHL={setHeadLine}/>
            </View>
          </BottomSheet>

          <BottomSheet
            ref={addSheetRef}
            snapPoints={snapPoints}
            index={-1}
            enableOverDrag
            enablePanDownToClose
            backdropComponent={backDrop}
            backgroundStyle={{backgroundColor: styles.sheetColor, borderTopLeftRadius: 20, borderTopRightRadius: 20,}}
            handleStyle={{backgroundColor: styles.sheetHandleColor, borderTopLeftRadius: 20, borderTopRightRadius: 20,}}
            handleIndicatorStyle={{backgroundColor: styles.sheetHandleIndicatorColor,}}
            >
            <View style={{backgroundColor: styles.sheetHandleColor,}}>
              <AddDrink sheetStyle={sheetStyle} saveDrink={save} drinks={drinks}/>
            </View>
          </BottomSheet>

          <BottomSheet
            ref={editSheetRef}
            snapPoints={snapPoints}
            index={-1}
            enableOverDrag
            enablePanDownToClose
            backdropComponent={backDrop}
            backgroundStyle={{backgroundColor: styles.sheetColor, borderTopLeftRadius: 20, borderTopRightRadius: 20,}}
            handleStyle={{backgroundColor: styles.sheetHandleColor, borderTopLeftRadius: 20, borderTopRightRadius: 20,}}
            handleIndicatorStyle={{backgroundColor: styles.sheetHandleIndicatorColor,}}
            >
            <View style={{backgroundColor: styles.sheetHandleColor,}}>
              <EditDrink sheetStyle={sheetStyle} Delete={Delete} editDrink={edit} 
                  pressedDrink={pressedDrink} beerArray={beerArray}
              />
            </View>
          </BottomSheet>

          <BottomSheet
            ref={settingsSheetRef}
            snapPoints={snapPoints}
            index={-1}
            enableOverDrag
            enablePanDownToClose
            backdropComponent={backDrop}
            backgroundStyle={{backgroundColor: styles.sheetColor, borderTopLeftRadius: 20, borderTopRightRadius: 20,}}
            handleStyle={{backgroundColor: styles.sheetHandleColor, borderTopLeftRadius: 20, borderTopRightRadius: 20,}}
            handleIndicatorStyle={{backgroundColor: styles.sheetHandleIndicatorColor,}}
            >
            <View style={{backgroundColor: styles.sheetHandleColor,}}>
              <Settings currentStyle={styles} changeStyle={style => changeStyle(style)}/>
            </View>
          </BottomSheet>

          <BottomSheet
            ref={historySheetRef}
            snapPoints={snapPoints_1}
            index={-1}
            enableOverDrag
            enablePanDownToClose
            backdropComponent={backDrop}
            backgroundStyle={{backgroundColor: styles.sheetColor, borderTopLeftRadius: 20, borderTopRightRadius: 20,}}
            handleStyle={{backgroundColor: styles.sheetHandleColor, borderTopLeftRadius: 20, borderTopRightRadius: 20,}}
            handleIndicatorStyle={{backgroundColor: styles.sheetHandleIndicatorColor,}}
            >
            <View style={{backgroundColor: styles.sheetHandleColor,}}>
              <History sheetStyle={sheetStyle} drinks={drinks} history={history}/>
            </View>
          </BottomSheet>

          <StatusBar style={`${styles.name !== 'light' ? 'light' : 'dark'}`} />
        </View>
    </GestureHandlerRootView>
  )
}