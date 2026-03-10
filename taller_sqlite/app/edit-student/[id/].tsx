import { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '../../../components/themed-text';
import { ThemedView } from '../../../components/themed-view';
import { getStudent, updateStudent } from '../../../lib/database';

export default function EditStudent() {
  const { id } = useLocalSearchParams();
  const [name, setName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loadStudent = async () => {
      const student = await getStudent(parseInt(id as string));
      setName(student.name);
    };
    loadStudent();
  }, [id]);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'El nombre es obligatorio');
      return;
    }
    try {
      await updateStudent(parseInt(id as string), name);
      router.back();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ThemedView style={{ flex: 1, padding: 20 }}>
      <ThemedText type="title">Editar Estudiante</ThemedText>
      <TextInput
        placeholder="Nombre del estudiante"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
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