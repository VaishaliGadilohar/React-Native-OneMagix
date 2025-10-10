
import CustomText from "@/component/CustomText";
import { apiName } from "@/constants/constant";
import { getPosts } from "@/services/service";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

type Post = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: { name: string; catchPhrase: string; bs: string };
  address: { street: string; suite: string; city: string; zipcode: string };
};

const ReactData = () => {
  const { data: posts, error, isLoading, isError, refetch } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: () => getPosts(apiName.getInfo),
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF7A00" />
        <Text style={styles.loadingText}>Loading posts...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error?.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Information</Text>

      <FlatList
        data={posts ?? []}
        keyExtractor={(item) => item.id.toString()}
        refreshing={isLoading}
        onRefresh={() => refetch()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.headerRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {item.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <CustomText style={styles.name}>{item.name}</CustomText>
                <CustomText style={styles.company}>
                  {item.company.name}
                </CustomText>
              </View>
            </View>

            <View style={styles.infoSection}>
              <CustomText style={styles.label}>📧 {item.email}</CustomText>
              <CustomText style={styles.label}>📱 {item.phone}</CustomText>
              <CustomText style={styles.label}>
                🌆 {item.address.city}
              </CustomText>
              <CustomText style={styles.label}>
                🌐 {item.website}
              </CustomText>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ReactData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F2", 
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF7A00",
    textAlign: "center",
    marginVertical: 10,
    letterSpacing: 0.5,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    color: "#FF7A00",
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#FF7A00",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    backgroundColor: "#FF7A00",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
  },
  company: {
    fontSize: 14,
    color: "#FF7A00",
  },
  infoSection: {
    marginTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: "#FFD6A5",
    paddingTop: 6,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginVertical: 2,
  },
});
