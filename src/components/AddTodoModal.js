

import React, { useState, useEffect } from 'react';
import { Modal, View, TextInput, Button, Text } from 'react-native';

export default function AddTodoModal({ visible, onClose, onAdd, initialText = '' }) {
  const [text, setText] = useState(initialText);

  // reset / prefill when modal opens/closes or initialText changes
  useEffect(() => {
    setText(initialText || '');
  }, [visible, initialText]);

  function submit() {
    if (!text || !text.trim()) return;
    // onAdd now acts as submit for both add & edit
    onAdd(text.trim()); 
    setText('');
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={{ padding: 20, flex: 1 }}>
        <Text style={{ marginBottom: 8 }}>{initialText ? 'Edit TODO' : 'Add a new TODO'}</Text>
        <TextInput
          placeholder="Enter todo"
          value={text}
          onChangeText={setText}
          autoFocus={true}
          style={{ borderWidth: 1, padding: 8, marginBottom: 16 }}
        />
        <Button title={initialText ? 'Save' : 'Add'} onPress={submit} />
        <View style={{ height: 8 }} />
        <Button title="Cancel" color="gray" onPress={onClose} />
      </View>
    </Modal>
  );
}