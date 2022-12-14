import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-get-random-values';
import Icon from 'react-native-vector-icons/EvilIcons';
import { v4 } from 'uuid';
SplashScreen.preventAutoHideAsync();

import Fassroller from './assets/fassroller.svg';
import AddDrink from './Components/AddDrink';
import { editObject, readObject } from './Components/Backend';
import BottomMenu from './Components/BottomMenu';
import Drinks from './Components/Drinks';
import EditCount from './Components/EditCount';
import EditDrink from './Components/EditDrink';
import EditHeadLine from './Components/EditHeadLine';
import History from './Components/History';
import Settings from './Components/Settings';
import { blue, dark, light } from './styles.js';


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
        const storedHistory = await readObject('History')

        storedDrinks !== null && setDrinks(storedDrinks)
        storedDooku !== null && setCountDooku(storedDooku)
        storedTitle !== null && setTitle(storedTitle)
        storedBeerArray !== null && setBeerArray(storedBeerArray)
        storedTheme !== null && setStyles(storedTheme)
        storedHistory !== null && setHistory(storedHistory)

        const storedDate = await readObject('Date')
        if(storedDate !== `${new Date()}`.substring(0, 15)) {
          setDrinks(storedDrinks.map(drink => {return({...drink, count: 0})}))
        }
        await editObject('Date', `${new Date()}`.substring(0, 15))
      } catch(e) {
        alert("Oh no, something went wrong (????????????)???????????????")
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
    const payCount = passedDrink.payCount
    const tempDrinks = drinks.map(drink => drink.key === key ? { ...drink, count: count, payCount: payCount } : drink)
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
      await updateHistory(passedDrink, 1)
      return
    }
    const DooSuCountu = countDooku - 1
    setCountDooku(DooSuCountu)
    await editObject('drinks', tempDrinks)
    await editObject('BigDDuddersDooku', DooSuCountu)
    await updateHistory(passedDrink, -1)
  }

  const formatDate = (day) => {
    const str = day.toLocaleDateString()
    return `${str.substring(3,5)}.${str.substring(0,2)}.${str.substring(6)}`
  }

  const updateHistory = async (drink, num) => {
    const date = new Date() //"2022-10-24T23:50:21.817Z"
    const day = formatDate(date)
    console.log(day)
    if (history.filter(item => item.date === day ).length === 0) {
      const temp = [...history, {
        date: day,
        data: [{...drink, count: 1}],
        id: v4(),
      }]
      setHistory(temp)
      await editObject('History', temp)
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
          obj.count = (obj.count + num) < 0 ? 0 : (obj.count) + num
          exists = true
        }
      })
      if (!exists) {
        item.data.push({...drink, count: 1})
      }
      break
    }
    setHistory(temp)
    await editObject('History', temp)
  }

  const reset = async () => {
    const tempDrinks = drinks.map(drink => {return ({...drink, payCount: 0})})
    setDrinks(tempDrinks)
    await editObject('drinks', tempDrinks)
  }

  const save = async (drink) => {
    const tempDrinks = [...drinks, {name: drink.name, price: drink.price, payCount: 0, count: 0, key: v4()}]
    setDrinks(tempDrinks)
    await editObject('drinks', tempDrinks)
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
    const payCount = drink.payCount
    const key = drink.key

    const newDooku = countDooku - countDifference
    const oldDrink = drinks.filter(obj => obj.key === key)[0]
    await updateHistory(drink, -countDifference)
    if (!beerArray.includes(oldDrink.name) && beerArray.includes(name)) {
      setDooku(countDooku + parseInt(count))
    }
    else if (beerArray.includes(oldDrink.name) && !beerArray.includes(name)) {
      setDooku(countDooku - parseInt(count))
    }
    else {    
      setDooku(newDooku)
    }

    const tempDrinks = drinks.map(drink => 
      drink.key === key ? 
        drink = {name: name, price: price, count: count, payCount: payCount, key: key} : drink)
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

  const resetHistory = async () => {
    setHistory([])
    await editObject('History', [])
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
    rippleColor: styles.rippleColor,
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

              
            <View style={{ aspectRatio: 1, marginRight: 10, marginTop: 50, height: 48, borderRadius: 10}}>
              <Pressable onPress={openHistorySheet} 
                android_ripple={{color: '#aaaaaa', borderless: true, radius: 50,}}
              >
                  <Icon name='clock' style={styles.icon}/>
              </Pressable>
            </View>

            <View style={{ aspectRatio: 1, marginRight: 10, marginTop: 50, height: 48, borderRadius: 10}}>
              <Pressable onPress={openSettingsSheet} 
                android_ripple={{color: '#aaaaaa', borderless: true, radius: 50,}}
              >
                  <Icon name='gear' style={{...styles.icon}}/>
              </Pressable>
            </View>

          </View>
          
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>

            <Fassroller width={styles.fassroller.width} height={styles.fassroller.height} fill={styles.fassroller.color}/>

            <View style={{backgroundColor: styles.accentColor, borderRadius: 10, marginTop: 7, marginLeft: 20, 
                          justifyContent: 'center', paddingHorizontal: 20, height: 70 }}
            >
              <Pressable android_ripple={{color: styles === blue ? styles.drinkColor : styles.rippleColor, 
                                          borderless: true, radius: 69}} onLongPress={openCountSheet} delayLongPress={2500}
              >
                <Text style={{...styles.countSudoku, paddingHorizontal: 0, 
                              paddingBottom:0, marginHorizontal: 0, 
                              marginTop: 0, marginBottom: 4,
                              backgroundColor: '#ffffff00'}}
                >
                    {countDooku}
                </Text>
              </Pressable>
            </View> 

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
              <History sheetStyle={sheetStyle} drinks={drinks} history={history} resetHistory={resetHistory}/>
            </View>
          </BottomSheet>

          <StatusBar style={`${styles.name !== 'light' ? 'light' : 'dark'}`} />
        </View>
    </GestureHandlerRootView>
  )
}