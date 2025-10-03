import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { LoginScreenProps } from '../types/navigation';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;
const PRIMARY_COLOR = '#007aff';
const BUTTON_DISABLED_COLOR = '#a3a3a3';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('test@example.com');
  const [password, setPassword] = useState<string>('password123');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const dispatch = useDispatch();

  const validateEmail = (value: string): boolean => {
    if (!EMAIL_REGEX.test(value)) {
      setEmailError('Invalid email address format.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (value: string): boolean => {
    if (value.length < MIN_PASSWORD_LENGTH) {
      setPasswordError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleLogin = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      dispatch(login({ email: email }));
      navigation.replace('Home');
    } else {
      Alert.alert('Validation Error', 'Please correct the errors in the form before logging in.');
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const isFormValid = email && password && !emailError && !passwordError;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to view user directory.</Text>
          
          <TextInput
            style={[styles.input, emailError ? styles.inputError : {}]}
            placeholder="Email Address"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError('');
            }}
            onBlur={() => validateEmail(email)}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <View style={[styles.passwordContainer, passwordError ? styles.inputError : {}]}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError('');
              }}
              onBlur={() => validatePassword(password)}
            />
            <TouchableOpacity 
              onPress={togglePasswordVisibility} 
              style={styles.visibilityToggle}
              activeOpacity={0.7}
            >
              <Text style={styles.visibilityToggleText}>
                {isPasswordVisible ? '👁️' : '🔒'}
              </Text>
            </TouchableOpacity>
          </View>
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          <TouchableOpacity
            style={[styles.button, { backgroundColor: isFormValid ? PRIMARY_COLOR : BUTTON_DISABLED_COLOR }]}
            onPress={handleLogin}
            disabled={!isFormValid}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: PRIMARY_COLOR,
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  // New container style for wrapping password input and icon
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingRight: 15,
  },
  // Style for all text inputs without the icon
  input: {
    height: 50,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  // Input field inside the password container
  passwordInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  inputError: {
    borderColor: '#ff3b30',
    borderWidth: 2,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 13,
    marginBottom: 15,
    marginTop: -10,
    paddingLeft: 5,
    fontWeight: '500',
  },
  visibilityToggle: {
    padding: 5,
  },
  visibilityToggleText: {
    fontSize: 20,
  },
  button: {
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default LoginScreen;