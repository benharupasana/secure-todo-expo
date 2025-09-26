import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'SECURE_TODOS_V1';

export async function loadTodos() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('Failed to load todos', e);
    return [];
  }
}

export async function saveTodos(todos) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(todos));
  } catch (e) {
    console.warn('Failed to save todos', e);
  }
}