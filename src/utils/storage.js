import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveJSON = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('saveJSON error', e);
  }
};

export const loadJSON = async (key, defaultValue) => {
  try {
    const s = await AsyncStorage.getItem(key);
    return s ? JSON.parse(s) : defaultValue;
  } catch (e) {
    console.warn('loadJSON error', e);
    return defaultValue;
  }
};

export const removeKey = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.warn('removeKey error', e);
  }
};
