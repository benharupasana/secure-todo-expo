import { saveTodos, loadTodos } from '../src/storage/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

describe('storage', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });

  test('saveTodos persists and loadTodos retrieves', async () => {
    const todos = [{ id: '1', text: 'hi' }];
    await saveTodos(todos);
    const loaded = await loadTodos();
    expect(loaded).toEqual(todos);
  });

  test('loadTodos returns [] when nothing saved', async () => {
    const loaded = await loadTodos();
    expect(loaded).toEqual([]);
  });
});