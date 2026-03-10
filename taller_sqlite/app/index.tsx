import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../components/themed-text";
import { ThemedView } from "../components/themed-view";
import { deleteProgram, getPrograms, initDatabase } from "../lib/database";

interface Program {
  id: number;
  name: string;
  description: string;
}

export default function Index() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const router = useRouter();

  useEffect(() => {
    const initialize = async () => {
      await initDatabase();
      await loadPrograms();
    };
    initialize();
  }, []);

  const loadPrograms = async () => {
    const progs = await getPrograms();
    setPrograms(progs);
  };

  const handleDelete = async (id: number) => {
    Alert.alert(
      "Eliminar Programa",
      "¿Estás seguro de que quieres eliminar este programa?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteProgram(id);
              loadPrograms();
            } catch (error: any) {
              Alert.alert("Error", error.message);
            }
          },
        },
      ],
    );
  };

  const renderItem = ({ item }: { item: Program }) => (
    <ThemedView
      style={{
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "white",
      }}
    >
      <TouchableOpacity
        onPress={() => (router.push as any)(`/program/${item.id}`)}
      >
        <ThemedText
          type="defaultSemiBold"
          lightColor="#000000"
          darkColor="#000000"
        >
          {item.name}
        </ThemedText>
        <ThemedText lightColor="#000000" darkColor="#000000">
          {item.description}
        </ThemedText>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => (router.push as any)(`/edit-program/${item.id}`)}
        >
          <ThemedText style={{ color: "blue" }}>Editar</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <ThemedText style={{ color: "red" }}>Eliminar</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );

  return (
    <ThemedView style={{ flex: 1, backgroundColor: "white" }}>
      <TouchableOpacity
        onPress={() => router.push("/add-program")}
        style={{
          padding: 10,
          backgroundColor: "green",
          margin: 10,
          borderRadius: 5,
        }}
      >
        <ThemedText style={{ color: "white", textAlign: "center" }}>
          Agregar Programa
        </ThemedText>
      </TouchableOpacity>
      <FlatList
        data={programs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </ThemedView>
  );
}
