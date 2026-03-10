import { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '../../../components/themed-text';
import { ThemedView } from '../../../components/themed-view';
import { getPrograms, updateProgram } from '../../../lib/database';

interface Program {
  id: number;
  name: string;
  description: string;
}

export default function EditProgram() {
  const { id } = useLocalSearchParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loadProgram = async () => {
      const programs = await getPrograms();
      const program = programs.find((p: Program) => p.id === parseInt(id as string));
      if (program) {
        setName(program.name);
        setDescription(program.description);
      }
    };
    loadProgram();
  }, [id]);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'El nombre es obligatorio');
      return;
    }
    try {
      await updateProgram(parseInt(id as string), name, description);
      router.back();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ThemedView style={{ flex: 1, padding: 20 }}>
      <ThemedText type="title">Editar Programa</ThemedText>
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