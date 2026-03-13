import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import FormEstudiante from "../components/FormEstudiante";
import { getEstudiantes } from "../database/database";
import ProgramasScreen from "./ProgramasScreen";

export default function EstudiantesScreen() {
  const [estudiantes, setEstudiantes] = useState<any[]>([]);

  const load = async () => {
    const data = await getEstudiantes();
    setEstudiantes(data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "position"}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Gestión de Estudiantes</Text>

        <FormEstudiante onSaved={load} />

        <Text style={styles.subTitle}>Estudiantes registrados</Text>
        {estudiantes.map((item) => (
          <View key={item.id} style={styles.item}>
            <Text style={styles.itemText}>
              {item.codigo} - {item.nombre}
            </Text>
            <Text style={styles.subText}>
              {item.email} · {item.programa_nombre ?? "—"}
            </Text>
          </View>
        ))}
        {estudiantes.length === 0 && <Text>No hay estudiantes.</Text>}
        {/* Lista de programas rápida */}
        <ProgramasScreen />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 8, marginTop: 20 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  subTitle: { fontSize: 14, fontWeight: "600", marginTop: 12, marginBottom: 6 },
  item: { paddingVertical: 6, borderBottomWidth: 1, borderColor: "#eee" },
  itemText: { fontSize: 14 },
  subText: { color: "#555", fontSize: 12 },
});