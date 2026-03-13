import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Button,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { addEstudiante, getProgramas } from "../database/database";

export default function FormEstudiante({ onSaved }: { onSaved?: () => void }) {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [programas, setProgramas] = useState<Array<{id: number, codigo: string, nombre: string}>>([]);
  const [programaId, setProgramaId] = useState<number | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const p = await getProgramas();
      setProgramas(p);
      if (p.length > 0 && programaId === undefined) setProgramaId(p[0].id);
    })();
  }, []);

  const save = async () => {
    if (!codigo.trim() || !nombre.trim() || !email.trim() || !programaId) {
      Alert.alert("Faltan datos");
      return;
    }
    await addEstudiante(codigo.trim(), nombre.trim(), email.trim(), programaId);
    setCodigo("");
    setNombre("");
    setEmail("");
    if (onSaved) onSaved();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Agregar estudiante</Text>

      <TextInput
        placeholder="Código estudiante"
        style={styles.input}
        value={codigo}
        onChangeText={setCodigo}
      />
      <TextInput
        placeholder="Nombre completo"
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={{ marginBottom: 6 }}>Programa</Text>
      <View style={styles.pickerWrap}>
        <Picker
          selectedValue={programaId}
          onValueChange={(v: string | number) => setProgramaId(Number(v))}
        >
          {programas.map((p) => (
            <Picker.Item key={p.id} label={`${p.codigo} - ${p.nombre}`} value={p.id} />
          ))}
        </Picker>
      </View>

      <Button title="Guardar estudiante" onPress={save} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 6 },
  label: { fontWeight: "600", marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 6,
    marginBottom: 6,
  },
  pickerWrap: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    marginBottom: 6,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
});