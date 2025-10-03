import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, Button, useWindowDimensions } from 'react-native';
import { HomeScreenProps } from '../types/navigation';
import { User } from '../api/types';
import NetworkStatusBanner from '../components/NetworkStatusBanner';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { RootState } from '../store/store';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const PRIMARY_COLOR = '#007aff';
const ACCENT_COLOR = '#34c759';
const BACKGROUND_COLOR = '#f0f2f5';
const CARD_COLOR = '#ffffff';
const TEXT_DARK = '#212529';
const TEXT_MUTED = '#6c757d';
const BORDER_RADIUS_L = 14;
const SCREEN_PADDING = 20;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const userEmail = useSelector((state: RootState) => state.auth.user?.email);
  const { width } = useWindowDimensions();

  const horizontalPadding = width > 768 ? 40 : SCREEN_PADDING;
  const listPadding = { paddingHorizontal: horizontalPadding, paddingVertical: 15 };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: User[] = await response.json();
      setUsers(data);
    } catch (err: any) {
      console.error("API Fetch Error:", err);
      setError('Failed to fetch users. Check network connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            dispatch(logout());
            navigation.replace('Login');
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderLoading = () => (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={PRIMARY_COLOR} />
      <Text style={styles.infoText}>Fetching user directory...</Text>
    </View>
  );

  const renderError = () => (
    <View style={[styles.center, styles.error]}>
      <Text style={styles.errorText}>⚠️ {error}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={fetchUsers}>
        <Text style={styles.retryButtonText}>Retry Fetch</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }: { item: User }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('Details', { user: item })}
    >
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.itemDetails}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.username}>@{item.username}</Text>
        <Text style={styles.email}>📧 {item.email}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return renderLoading();
  }

  if (error) {
    return renderError();
  }

  return (
    <View style={styles.container}>
      <NetworkStatusBanner />

      <View style={[styles.header, { paddingHorizontal: horizontalPadding }]}>
        <View>
          <Text style={styles.headerTitle}>User Directory</Text>
          <Text style={styles.loggedInAs}>Logged in as: {userEmail}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[styles.listContent, listPadding]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  infoText: {
    marginTop: 15,
    fontSize: 16,
    color: TEXT_MUTED,
  },
  error: {
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: PRIMARY_COLOR,
    marginBottom: 20,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: CARD_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: TEXT_DARK,
  },
  loggedInAs: {
    fontSize: 13,
    color: TEXT_MUTED,
    marginTop: 2,
  },
  logoutButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: PRIMARY_COLOR,
  },
  logoutButtonText: {
    color: CARD_COLOR,
    fontWeight: '600',
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 30,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD_COLOR,
    padding: 18,
    borderRadius: BORDER_RADIUS_L,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: CARD_COLOR,
    fontSize: 24,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_DARK,
    marginBottom: 2,
  },
  username: {
    fontSize: 14,
    color: PRIMARY_COLOR,
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: TEXT_MUTED,
  },
  retryButton: {
    backgroundColor: ACCENT_COLOR,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 15,
  },
  retryButtonText: {
    color: CARD_COLOR,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default HomeScreen;