import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useState, useRef, useCallback, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

import BottomMenu from './Components/BottomMenu';
import Drinks from './Components/Drinks';
import AddDrink from './Components/AddDrink';
import EditDrink from './Components/EditDrink';
import EditCount from './Components/EditCount';
import EditHeadLine from './Components/EditHeadLine';
import { editObject, readObject, saveObject } from './Components/Backend';
import Fassroller from './assets/adaptive-icon.png';


export default function App() {
  
  const [drinks, setDrinks] = useState([])
  const [countDooku, setCountDooku] = useState(0)
  const [title, setTitle] = useState('Drink Counter')
  const [beerArray, setBeerArray] = useState(['Pils', 'Urpils', 'Beckers', 'Bier', 'Weizen'])
  const [appIsReady, setAppIsReady] = useState(false);
  
  const sheetRef = useRef(null)
  const csheetRef = useRef(null)
  const hsheetRef = useRef(null)
  const snapPoints = ['40%', '60%']
  const snapPoints1 = ['60%', '85%']
  const [addDrink, setAddDrink] = useState(true)
  const [pressedDrink, setPressedDrink] = useState({});

  useEffect(() => {
    const fetchDrinks = async () => {
      try {  
        const storedTitle = await readObject('Title')
        const storedDrinks = await readObject('drinks')
        const storedDooku = await readObject('BigDDuddersDooku')
        const storedBeerArray = await readObject('BeerArray')
        storedDrinks !== null && setDrinks(storedDrinks)
        storedDooku !== null && setCountDooku(storedDooku)
        storedTitle !== null && setTitle(storedTitle)
        storedBeerArray !== null && setBeerArray(storedBeerArray)
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
    await editObject('drinks', tempDrinks)
    
    if (!countD || (countDooku === 0 && !plusMinus)) {
      return
    }
    if (plusMinus) {
      const DooSuCountu = countDooku + 1
      setCountDooku(DooSuCountu)
      await editObject('BigDDuddersDooku', DooSuCountu)
      return
    }
    const DooSuCountu = countDooku - 1
    setCountDooku(DooSuCountu)
    await editObject('BigDDuddersDooku', DooSuCountu)
  }

  const reset = async () => {
    const tempDrinks = drinks.map(drink => {return ({...drink, count: 0})})
    setDrinks(tempDrinks)
    await editObject('drinks', tempDrinks)
  }

  const save = async (drink) => {
    const tempDrinks = [...drinks, {name: drink.name, price: drink.price, count: 0, key: uuidv4()}]
    setDrinks(tempDrinks)
    await saveObject('drinks', tempDrinks)
    sheetRef.current.close()
  }

  const Delete = async (drink) => {
    const key = drink.key
    const tempDrinks = drinks.filter(drink => drink.key !== key)
    setDrinks(tempDrinks)
    await editObject('drinks', tempDrinks)
    sheetRef.current.close()
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
    sheetRef.current.close()
  }

  const setDooku = async (number) => {
    setCountDooku(number)
    await editObject('BigDDuddersDooku', number)
    csheetRef.current.close()
  }

  const setHeadLine = async (HL) => {
    setTitle(HL)
    // await saveObject('Title', HL)
    await editObject('Title', HL)
    hsheetRef.current.close()
  }
  
  const setBeers = async (beers) => {
    setBeerArray(beers)
    console.log(beers)
    await editObject('BeerArray', beers)
    csheetRef.current.close()
  }
  
  //Bottomsheet
  const handleOpen = async (index, bool, drink) => {
    setPressedDrink(drink)
    setAddDrink(bool)
    csheetRef.current.close()
    hsheetRef.current.close()
    await new Promise(r => setTimeout(r, 0))
    sheetRef.current.snapToIndex(index)
  }

  const openCEdit = () => {
    sheetRef.current.close()
    hsheetRef.current.close()
    csheetRef.current.snapToIndex(1)
  }

  const openHeadLineEdit = () => {
    sheetRef.current.close()
    csheetRef.current.close()
    hsheetRef.current.snapToIndex(1)
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
        <View style={styles.container} onLayout={onLayoutRootView}> 
          <Pressable onLongPress={openHeadLineEdit} delayLongPress={1000}>
            <Text style={styles.text}>{title}</Text>
          </Pressable>

          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <Image style={styles.fassroller} source={Fassroller} fadeDuration={0}/>
            <Pressable onLongPress={openCEdit} delayLongPress={2500}>
              <Text style={styles.countSudoku}>{countDooku}</Text>
            </Pressable>
          </View>
          <View style={styles.content}>
            <Drinks drinks={drinks} change={changeCount} handleOpen={handleOpen} beerArray={beerArray}/>
            <BottomMenu drinks={drinks} onPaid={reset}/>
          </View>

          <BottomSheet
            ref={csheetRef}
            snapPoints={snapPoints1}
            index={-1}
            enableOverDrag
            enablePanDownToClose
            backdropComponent={backDrop}
            backgroundStyle={{backgroundColor: '#252525', borderTopLeftRadius: 20, borderTopRightRadius: 20,}}
            handleStyle={{backgroundColor: '#1b1b1b', borderTopLeftRadius: 20, borderTopRightRadius: 20,}}
            handleIndicatorStyle={{backgroundColor: 'white',}}
          >
            <View style={{backgroundColor: '#1b1b1b',}}>
              <EditCount count={countDooku} setDooku={setDooku} beers={beerArray} setBeers={setBeers}/>
            </View>
          </BottomSheet>
          <BottomSheet
            ref={hsheetRef}
            snapPoints={snapPoints}
            index={-1}
            enableOverDrag
            enablePanDownToClose
            backdropComponent={backDrop}
            backgroundStyle={{backgroundColor: '#252525', borderTopLeftRadius: 20, borderTopRightRadius: 20,}}
            handleStyle={{backgroundColor: '#1b1b1b', borderTopLeftRadius: 20, borderTopRightRadius: 20,}}
            handleIndicatorStyle={{backgroundColor: 'white',}}
          >
            <View style={{backgroundColor: '#1b1b1b',}}>
              <EditHeadLine HL={title} setHL={setHeadLine}/>
            </View>
          </BottomSheet>
          <BottomSheet
            ref={sheetRef}
            snapPoints={snapPoints}
            index={-1}
            enableOverDrag
            enablePanDownToClose
            backdropComponent={backDrop}
            backgroundStyle={{backgroundColor: '#252525', borderTopLeftRadius: 20, borderTopRightRadius: 20,}}
            handleStyle={{backgroundColor: '#1b1b1b', borderTopLeftRadius: 20, borderTopRightRadius: 20,}}
            handleIndicatorStyle={{backgroundColor: 'white',}}
            >
            <View style={{backgroundColor: '#1b1b1b',}}>
              {addDrink ? <AddDrink saveDrink={save} drinks={drinks}/> : <EditDrink Delete={Delete} editDrink={edit} pressedDrink={pressedDrink} beerArray={beerArray}/>}
            </View>
          </BottomSheet>

          <StatusBar style="light" />
        </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2b2b',
  },
  content: {
    flex: 1,
    paddingBottom: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#fff',
    marginTop: 50,
    marginBottom: 15,
    marginHorizontal: 20,
    textAlignVertical: 'center',
  },
  countSudoku: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#fff',
    marginBottom: 25,
    marginTop: 15,
    marginHorizontal: 20,
    backgroundColor: '#00417d',
    borderRadius: 5,
    textAlignVertical: 'center',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  fassroller: {
    width: 85,
    height: 85,
  }
});