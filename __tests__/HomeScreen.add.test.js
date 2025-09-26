import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { TodoProvider } from '../src/context/TodoProvider';
import HomeScreen from '../src/screens/HomeScreen';

// Mock local-auth to succeed
jest.mock('expo-local-authentication', () => ({
  hasHardwareAsync: jest.fn(async () => true),
  isEnrolledAsync: jest.fn(async () => true),
  authenticateAsync: jest.fn(async () => ({ success: true })),
}));

test('adds todo when authentication succeeds', async () => {
  const { getByText, getByPlaceholderText } = render(
    <TodoProvider>
      <HomeScreen />
    </TodoProvider>
  );

  // Open add modal
  fireEvent.press(getByText('Add TODO'));

  // Find input (placeholder in AddTodoModal should be "Enter todo")
  const input = getByPlaceholderText('Enter todo');

  fireEvent.changeText(input, 'Buy milk');
  fireEvent.press(getByText('Add')); // submit button in modal

  await waitFor(() => {
    expect(getByText('Buy milk')).toBeTruthy();
  });
});