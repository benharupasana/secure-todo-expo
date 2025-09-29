# Secure TODO (Expo) 

Small React Native (Expo) app demonstrating:
- Authentication gating for add/update/delete using `expo-local-authentication`
- Clean state management with `useReducer` + Context
- Persistence with AsyncStorage
- Unit tests for reducer + basic UI flow

## How to run

1. Clone the repository

    git clone https://github.com/benharupasana/secure-todo-expo.git

2. Install dependencies:

    - cd secure-todo-expo
    - npm install

3. Run the app 

    - npx expo start 
    - Press a to launch Android emulator
    - Or scan the QR code with Expo Go on your device

4. Running Tests 

    Unit tests cover:

        - Reducer logic (ADD, UPDATE, DELETE, INIT)
        - Persistence with AsyncStorage
        - UI flow (Add TODO with successful/failed authentication)

    Run all tests:

        npm test

    Run a single test file:

        npx jest __tests__/todoReducer.test.js


## Authentication Notes

   The app requires biometric authentication  before adding, updating, or deleting todos.

   Android Emulator:
   
        - Open Extended controls → Fingerprint
        - Enroll fingerprint ID = 1
        - When prompt is visible,either:
            Click Touch in the Fingerprint panel, or
            Run in terminal: `adb -s emulator-5554 emu finger touch 1`


