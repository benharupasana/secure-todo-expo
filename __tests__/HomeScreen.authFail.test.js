import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { TodoProvider } from '../src/context/TodoProvider';
import HomeScreen from '../src/screens/HomeScreen';
import { Alert } from 'react-native';

jest.mock('expo-local-authentication', () => ({
  hasHardwareAsync: jest.fn(async () => true),
  isEnrolledAsync: jest.fn(async () => true),
  authenticateAsync: jest.fn(async () => ({ success: false, error: 'AUTH_FAILED' })),
}));

// silence alert
jest.spyOn(Alert, 'alert').mockImplementation(() => {});

test('does not add todo when auth fails', async () => {
  const { getByText, getByPlaceholderText, queryByText } = render(
    <TodoProvider>
      <HomeScreen />
    </TodoProvider>
  );

  fireEvent.press(getByText('Add TODO'));
  const input = getByPlaceholderText('Enter todo');
  fireEvent.changeText(input, 'Should not add');
  fireEvent.press(getByText('Add'));

  // give some time for auth promise to resolve
  await waitFor(() => {
    expect(queryByText('Should not add')).toBeNull();
  });
});