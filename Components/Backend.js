import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveObject = async (key, object) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(object))
    } catch (err) {
        return alert(`An error occured while saving: \n(╯‵□′)╯︵┻━┻\n ${err}`)
    }
}
export const readObject= async (key) => {
    try {
        const file = await AsyncStorage.getItem(key)
        return file != null ? JSON.parse(file) : null
    } catch (err) {
        return alert(`An error occured while reading: \n(╯‵□′)╯︵┻━┻\n ${err}`)
    }
}
export const deleteObject = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (err) {
        return alert(`An error occured while deleting: \n(╯‵□′)╯︵┻━┻\n ${err}`)
    }
}
export const editObject = async (key, newObject) => {
    await deleteObject(key)
    await saveObject(key, newObject)
}

export const getAllKeys = async () => {
    let keys = []
    try {
        keys = await AsyncStorage.getAllKeys()
    } catch(err) {
        return alert(`An error occured while reading the keys: \n(╯‵□′)╯︵┻━┻\n ${err}`)
    }
    return keys
}
