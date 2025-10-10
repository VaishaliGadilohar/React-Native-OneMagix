

import CustomText from '@/component/CustomText';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const ReactQuery = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.github.com/repos/TanStack/query').then((res) =>
        res.json()
      ),
  });

  if (isPending)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF8C42" />
        <CustomText style={styles.loadingText}>Loading data...</CustomText>
      </View>
    );

  if (error)
    return (
      <View style={styles.center}>
        <CustomText style={styles.errorText}>
          ⚠️ Oops! {(error as Error).message}
        </CustomText>
      </View>
    );

  return (
    <View style={styles.container}>
      {/* Decorative background circles */}
      <View style={styles.orangeCircleTop} />
      <View style={styles.orangeCircleBottom} />

      <View style={styles.card}>
        <CustomText style={styles.title}>{data.name}</CustomText>
        <CustomText style={styles.description}>{data.description}</CustomText>

        <View style={styles.divider} />

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <CustomText style={styles.icon}>👀</CustomText>
            <CustomText style={styles.statNumber}>{data.subscribers_count}</CustomText>
            <CustomText style={styles.statLabel}>Watchers</CustomText>
          </View>

          <View style={styles.statItem}>
            <CustomText style={styles.icon}>✨</CustomText>
            <CustomText style={styles.statNumber}>{data.stargazers_count}</CustomText>
            <CustomText style={styles.statLabel}>Stars</CustomText>
          </View>

          <View style={styles.statItem}>
            <CustomText style={styles.icon}>🍴</CustomText>
            <CustomText style={styles.statNumber}>{data.forks_count}</CustomText>
            <CustomText style={styles.statLabel}>Forks</CustomText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReactQuery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6F0', // light orange background
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  orangeCircleTop: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#FFD6A5',
    top: -70,
    right: -80,
    opacity: 0.45,
  },
  orangeCircleBottom: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#FFB677',
    bottom: 40,
    left: -50,
    opacity: 0.4,
  },
  card: {
    width: '88%',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FF6B00',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#6B6B6B',
    textAlign: 'center',
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: '#FFE0C2',
    marginVertical: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF6B00',
    marginTop: 6,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B6B6B',
    marginTop: 4,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF6F0',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#FF6B00',
  },
  errorText: {
    color: '#e74c3c',
    textAlign: 'center',
    paddingHorizontal: 20,
    fontSize: 16,
  },
});
