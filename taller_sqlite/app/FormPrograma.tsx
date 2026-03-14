import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { addPrograma } from "../database/database";

export default function FormPrograma({ onAdded }: { onAdded?: () => void }) {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");

  const save = async () => {
    console.log('Save pressed, codigo:', codigo, 'nombre:', nombre);
    if (!codigo.trim() || !nombre.trim()) {
      console.log('Fields empty, not saving');
      return;
    }
    console.log('Saving programa...');
    await addPrograma(codigo.trim(), nombre.trim());
    console.log('Programa saved, clearing fields');
    setCodigo("");
    setNombre("");
    console.log('Calling onAdded');
    if (onAdded) onAdded();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Agregar programa</Text>
      <TextInput
        placeholder="Código (ej. SIS)"
        style={styles.input}
        value={codigo}
        onChangeText={setCodigo}
        autoCapitalize="characters"
      />
      <TextInput
        placeholder="Nombre del programa"
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
      />
      <Button title="Guardar programa" onPress={save} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 8 },
  label: { fontWeight: "600", marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 6,
    marginBottom: 6,
  },
});