import { User } from '../api/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Details: { user: User };
};

export type StackNavigation = NativeStackScreenProps<RootStackParamList>['navigation'];

export type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
