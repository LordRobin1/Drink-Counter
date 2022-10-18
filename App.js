import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useState, useRef, useCallback, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import BottomMenu from './Components/BottomMenu';
import Drinks from './Components/Drinks';
import AddDrink from './Components/AddDrink';
import EditDrink from './Components/EditDrink';
import EditCount from './Components/EditCount';
import { editObject, readObject, saveObject } from './Components/Backend';
import Fassroller from './assets/adaptive-icon.png';

export default function App() {
  
  const [drinks, setDrinks] = useState([])
  const [countDooku, setCountDooku] = useState(0)
  const beerArray = ['Pils', 'Urpils', 'Beckers', 'Bier', 'Weizen']
  
  const sheetRef = useRef(null)
  const csheetRef = useRef(null)
  const snapPoints = ['40%', '60%']
  const [addDrink, setAddDrink] = useState(true)
  const [pressedDrink, setPressedDrink] = useState({});

  useEffect(() => {
    const fetchDrinks = async () => {
      const storedDrinks = await readObject('drinks')
      const storedDooku = await readObject('BigDDuddersDooku')
      storedDrinks !== null && setDrinks(storedDrinks)
      storedDooku !== null && setCountDooku(storedDooku)
    }
    fetchDrinks()
  }, [])


  //drink functions
  const changeCount = async (passedDrink, countD, plusMinus) => {
    const key = passedDrink.key
    const count = passedDrink.count
    const tempDrinks = drinks.map(drink => drink.key === key ? { ...drink, count: count } : drink)
    setDrinks(tempDrinks)
    await editObject('drinks', tempDrinks)
    
    if (!countD) {
      return
    }
    if (plusMinus) {
      const DooSuCountu = countDooku + 1
      setCountDooku(DooSuCountu)
      await editObject('BigDDuddersDooku', DooSuCountu)
      return
    }
    let DooSuCountu = countDooku - 1
    setCountDooku(DooSuCountu)
    await editObject('BigDDuddersDooku', DooSuCountu)
  }
  const reset = async () => {
    const tempDrinks = drinks.map(drink => {return ({...drink, count: 0})})
    setDrinks(tempDrinks)
    await editObject('drinks', tempDrinks)
  }
  const save = async (drink) => {
    const tempDrinks = [...drinks, {name: drink.name, price: drink.price, count: 0, key: drinks.length}]
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
    const newDooku = countDooku - countDifference
    setCountDooku(newDooku)
    await editObject('BigDDuddersDooku', newDooku)
    
    const name = drink.name
    const price = drink.price
    const count = drink.count
    const key = drink.key
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
  
  //Bottomsheet
  const handleOpen = async (index, bool, drink) => {
    setPressedDrink(drink)
    setAddDrink(bool)
    csheetRef.current.close()
    await new Promise(r => setTimeout(r, 0))
    sheetRef.current.snapToIndex(index)
  }
  const openCEdit = () => {
    sheetRef.current.close()
    csheetRef.current.snapToIndex(1)
  }
  const backDrop = useCallback(
    props => (
      <BottomSheetBackdrop {...props} appearsOnIndex={1} disappearsOnIndex={0} enableTouchThrough={true}/>
    ), []
  )

  return (
    <GestureHandlerRootView style={{flex: 1}}>
        <View style={styles.container}> 
          <Text style={styles.text}>Drink Counter</Text>
          
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <Image style={styles.fassroller} source={Fassroller}/>
            <Pressable onLongPress={openCEdit} delayLongPress={5000}>
              <Text style={styles.countSudoku}>{countDooku}</Text>
            </Pressable>
          </View>
          <View style={styles.content}>
            <Drinks drinks={drinks} change={changeCount} handleOpen={handleOpen} beerArray={beerArray}/>
            <BottomMenu drinks={drinks} onPaid={reset}/>
          </View>

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
          <BottomSheet
            ref={csheetRef}
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
              <EditCount count={countDooku} setDooku={setDooku}/>
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
    marginBottom: 25,
    marginHorizontal: 20,
    textAlignVertical: 'center',
  },
  countSudoku: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#fff',
    marginBottom: 25,
    marginTop: 9,
    marginHorizontal: 20,
    backgroundColor: '#00417d',
    borderRadius: 5,
    textAlignVertical: 'center',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  fassroller: {
    width: 75,
    height: 75,
  }
});