import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TodoProvider } from './src/context/TodoProvider';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <TodoProvider>
      <StatusBar />
      <SafeAreaView style={{ flex: 1 }}>
        <HomeScreen />
      </SafeAreaView>
    </TodoProvider>
  );
}

