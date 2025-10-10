

import CustomText from '@/component/CustomText';
import useTheme from '@/hooks/useTheme';
import { Link, useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useAuthStore } from '../../../store/authStrore';
import useStore from '../../../store/useStore';

const HomeScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { count } = useStore();
  const user = useAuthStore((state) => state.user);

  const handlePress = () => {
    router.push("/contact");
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <CustomText style={styles.title}>🏡 Welcome Home</CustomText>

      <CustomText style={styles.subtitle}>
        Current Count: <CustomText style={styles.highlight}>{count}</CustomText>
      </CustomText>

      {user ? (
        <View style={styles.profileCard}>
          <Image source={{ uri: user.picture }} style={styles.avatar} />
          <CustomText style={styles.name}>{user.name}</CustomText>
          <CustomText style={styles.email}>{user.email}</CustomText>
        </View>
      ) : (
        <CustomText style={styles.noUser}>No user logged in</CustomText>
      )}

      <View style={styles.linksContainer}>
        <Link href="/about" style={styles.cardLink}>
          <CustomText style={styles.cardText}>📖 About</CustomText>
        </Link>

        <Link href="/login" asChild>
          <Pressable style={styles.cardLink}>
            <CustomText style={styles.cardText}>🔑 Login</CustomText>
          </Pressable>
        </Link>

        <Link href="/details" style={styles.cardLink}>
          <CustomText style={styles.cardText}>📂 Details</CustomText>
        </Link>

        <Link href="/register" style={styles.cardLink}>
          <CustomText style={styles.cardText}>📝 Register</CustomText>
        </Link>

        <Link href="/todo" style={styles.cardLink}>
          <CustomText style={styles.cardText}>📝 ToDo</CustomText>
        </Link>
      </View>

      <Pressable style={styles.contactBtn} onPress={handlePress}>
        <CustomText style={styles.contactText}>📩 Contact Us</CustomText>
      </Pressable>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#4A90E2",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 25,
    textAlign: "center",
  },
  highlight: {
    fontWeight: "bold",
    color: "#FF8C42",
  },
  profileCard: {
    width: '90%',
    backgroundColor: '#F9F9F9',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: '#888',
  },
  noUser: {
    fontSize: 16,
    color: '#E74C3C',
    marginVertical: 15,
  },
  linksContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  cardLink: {
    backgroundColor: '#FFFFFF',
    width: '42%',
    marginVertical: 8,
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: 'center', // center icon/text
    justifyContent: 'center', // vertically center
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cardText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center', // text center
  },
  contactBtn: {
    backgroundColor: '#FFB347',
    paddingVertical: 18,
    paddingHorizontal: 35,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 50,
  },
  contactText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
