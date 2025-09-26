import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import { TodoContext } from '../context/TodoProvider';
import TodoItem from '../components/TodoItem';
import AddTodoModal from '../components/AddTodoModal';
import useAuthGate from '../hooks/useAuthGate';

export default function HomeScreen() {
  const { state, dispatch } = useContext(TodoContext);
  const [modalVisible, setModalVisible] = useState(false);
  // { id, text } or null
  const [editingTodo, setEditingTodo] = useState(null); 
  const auth = useAuthGate();

  // wrapper to require authentication before actions that chage state
  async function guardedMutate(actionFn) {
    const ok = await auth.authenticate('Authenticate to change your TODOs');
    if (!ok) {
      Alert.alert('Authentication failed', 'You must authenticate to modify TODOs.');
      return;
    }
    actionFn();
  }

  function addTodo(text) {
    const id = `${Date.now()}-${Math.floor(Math.random() * 100000)}`; 
    const newTodo = { id, text, done: false, createdAt: Date.now() };
    dispatch({ type: 'ADD', payload: newTodo });
  }

  function updateTodo(id, newText) {
    dispatch({ type: 'UPDATE', payload: { id, updates: { text: newText } } });
  }

  function onAddRequested(text) {
    if (editingTodo) {
      // Edit flow
      guardedMutate(() => updateTodo(editingTodo.id, text));
      setEditingTodo(null);
    } else {
      // Add flow
      guardedMutate(() => addTodo(text));
    }
    setModalVisible(false);
  }

  function onEdit(item) {
    setEditingTodo(item);
    setModalVisible(true);
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Add TODO" onPress={() => { setEditingTodo(null); setModalVisible(true); }} />
      <FlatList
        data={state.todos}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onDelete={() => guardedMutate(() => dispatch({ type: 'DELETE', payload: item.id }))}
            onToggle={() => guardedMutate(() => dispatch({ type: 'TOGGLE', payload: item.id }))}
            onEdit={() => onEdit(item)}
          />
        )}
      />
      <AddTodoModal
        visible={modalVisible}
        onClose={() => { setModalVisible(false); setEditingTodo(null); }}
        onAdd={onAddRequested}
        initialText={editingTodo ? editingTodo.text : ''}
      />
    </View>
  );
}
