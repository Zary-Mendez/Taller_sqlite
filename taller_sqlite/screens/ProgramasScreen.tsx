import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getProgramas } from "../database/database";
import FormPrograma from "./FormPrograma";

export default function ProgramasScreen() {
  const [programas, setProgramas] = useState<any[]>([]);

  const load = async () => {
    const data = await getProgramas();
    setProgramas(data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Programas</Text>

      <FormPrograma onAdded={load} />

      {programas.map((item) => (
        <View key={item.id} style={styles.item}>
          <Text style={styles.itemText}>
            {item.codigo} - {item.nombre}
          </Text>
        </View>
      ))}
      {programas.length === 0 && <Text>No hay programas.</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 8, marginTop: 20 },
  title: { fontSize: 16, fontWeight: "700", marginBottom: 8 },
  item: { paddingVertical: 6, borderBottomWidth: 1, borderColor: "#eee" },
  itemText: { fontSize: 14 },
});