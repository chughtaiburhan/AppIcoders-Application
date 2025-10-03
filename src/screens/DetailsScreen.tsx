import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

import { DetailsScreenProps } from '../types/navigation';

const PRIMARY_COLOR = '#007aff';
const BACKGROUND_COLOR = '#f0f2f5';
const CARD_COLOR = '#ffffff';
const LABEL_COLOR = '#6c757d';
const DETAIL_COLOR = '#212529';
const SEPARATOR_COLOR = '#e9ecef';

const SECTION_MARGIN_VERTICAL = 25;
const CARD_PADDING_HORIZONTAL = 20;
const CARD_PADDING_VERTICAL = 18;
const BORDER_RADIUS_L = 16;

interface DetailRowProps {
  label: string;
  value: string;
  isLast?: boolean;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value, isLast }) => (
  <View style={styles.detailRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.detail} selectable={true}>{value}</Text>
    {!isLast && <View style={styles.separator} />}
  </View>
);

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  const { user } = route.params;
  const { width } = useWindowDimensions();

  const containerHorizontalPadding = width > 768 ? 40 : 16;

  const renderDetailCard = (title: string, data: { label: string; value: string }[]) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.card}>
        {data.map((item, index) => (
          <DetailRow
            key={item.label}
            label={item.label}
            value={item.value}
            isLast={index === data.length - 1}
          />
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: containerHorizontalPadding },
        ]}
      >
        {renderDetailCard('Personal Information', [
          { label: 'Full Name', value: user.name },
          { label: 'Username', value: user.username },
          { label: 'Email', value: user.email },
          { label: 'Phone', value: user.phone },
          { label: 'Website', value: user.website },
        ])}

        {renderDetailCard('Address', [
          { label: 'Street & Suite', value: `${user.address.street}, ${user.address.suite}` },
          { label: 'City', value: user.address.city },
          { label: 'Zipcode', value: user.address.zipcode },
          {
            label: 'Location (Lat/Lng)',
            value: `${user.address.geo.lat}, ${user.address.geo.lng}`,
          },
        ])}

        {renderDetailCard('Company', [
          { label: 'Name', value: user.company.name },
          { label: 'Catchphrase', value: user.company.catchPhrase },
          { label: 'Business Scope', value: user.company.bs },
        ])}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  scrollContent: {
    paddingVertical: SECTION_MARGIN_VERTICAL,
    paddingBottom: 30,
  },
  sectionContainer: {
    marginBottom: SECTION_MARGIN_VERTICAL,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: PRIMARY_COLOR,
    marginBottom: 10,
    paddingLeft: 4,
    borderLeftWidth: 4,
    borderLeftColor: PRIMARY_COLOR,
  },
  card: {
    backgroundColor: CARD_COLOR,
    paddingHorizontal: CARD_PADDING_HORIZONTAL,
    paddingVertical: CARD_PADDING_VERTICAL,
    borderRadius: BORDER_RADIUS_L,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  detailRow: {
    paddingVertical: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: LABEL_COLOR,
    marginBottom: 4,
  },
  detail: {
    fontSize: 16,
    color: DETAIL_COLOR,
    fontWeight: '500',
    lineHeight: 22,
  },
  separator: {
    height: 1,
    backgroundColor: SEPARATOR_COLOR,
    marginTop: 12,
    marginHorizontal: -CARD_PADDING_HORIZONTAL,
  },
});

export default DetailsScreen;