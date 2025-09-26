import * as LocalAuthentication from 'expo-local-authentication';
import { useState } from 'react';

// Hook to run authentication (biometric / device passcode)
// Returns { authenticate, isSupported }
export default function useAuthGate() {
  const [isSupported, setIsSupported] = useState(null);

  async function checkSupport() {
    const supported = await LocalAuthentication.hasHardwareAsync();
    setIsSupported(supported);
    return supported;
  }

  // call when we want to ensure user is authenticated before add/edit/delete ops
  async function authenticate(promptMessage = 'Authenticate to proceed') {
    const supported = await LocalAuthentication.hasHardwareAsync();
    console.log("LocalAuthentication.hasHardwareAsync()",supported);
    if (!supported) return false;

    const enrolled = await LocalAuthentication.isEnrolledAsync();
    console.log("LocalAuthentication.isEnrolledAsync()",enrolled)
    if (!enrolled) return false;

    const res = await LocalAuthentication.authenticateAsync({
      promptMessage,
      fallbackLabel: 'Use device passcode'
    });
    return res.success;
  }

  return { isSupported, checkSupport, authenticate };
}