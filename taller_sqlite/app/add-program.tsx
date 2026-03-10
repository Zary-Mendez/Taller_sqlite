import { useState } from 'react';
import { TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '../components/themed-text';
import { ThemedView } from '../components/themed-view';
import { addProgram } from '../lib/database';

export default function AddProgram() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'El nombre es obligatorio');
      return;
    }
    try {
      await addProgram(name, description);
      router.back();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ThemedView style={{ flex: 1, padding: 20 }}>
      <ThemedText type="title">Agregar Programa</ThemedText>
      <TextInput
        placeholder="Nombre del programa"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <TextInput
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
        multiline
      />
      <TouchableOpacity
        onPress={handleSave}
        style={{ padding: 10, backgroundColor: 'blue', borderRadius: 5, marginTop: 20 }}
      >
        <ThemedText style={{ color: 'white', textAlign: 'center' }}>Guardar</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}