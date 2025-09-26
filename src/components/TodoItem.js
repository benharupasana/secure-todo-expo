
import React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';

export default function TodoItem({ item, onDelete, onToggle, onEdit }) {
  return (
    <View style={{ padding: 12, borderBottomWidth: 1, borderColor: '#eee', flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={onToggle} style={{ flex: 1 }}>
        <Text style={{ textDecorationLine: item.done ? 'line-through' : 'none' }}>{item.text}</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Button title="Edit" onPress={() => onEdit(item)} />
        <Button title="Delete" onPress={onDelete} />
      </View>
    </View>
  );
}