import { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '../../../components/themed-text';
import { ThemedView } from '../../../components/themed-view';
import { getProgram, getStudentsByProgram } from '../../../lib/database';

interface Student {
  id: number;
  name: string;
  program_id: number;
}

export default function ProgramDetails() {
  const { id } = useLocalSearchParams();
  const [program, setProgram] = useState<any>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const prog = await getProgram(parseInt(id as string));
      setProgram(prog);
      const studs = await getStudentsByProgram(parseInt(id as string));
      setStudents(studs);
    };
    loadData();
  }, [id]);

  const renderStudent = ({ item }: { item: Student }) => (
    <ThemedView style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: 'white' }}>
      <ThemedText lightColor="#000" darkColor="#000">{item.name}</ThemedText>
    </ThemedView>
  );

  if (!program) return <ThemedView><ThemedText>Cargando...</ThemedText></ThemedView>;

  return (
    <ThemedView style={{ flex: 1, backgroundColor: 'white' }}>
      <ThemedText type="title" style={{ padding: 20, color: 'black' }}>{program.name}</ThemedText>
      <TouchableOpacity
        onPress={() => (router.push as any)(`/add-student/${id}`)}
        style={{ padding: 10, backgroundColor: 'green', margin: 10, borderRadius: 5 }}
      >
        <ThemedText style={{ color: 'white', textAlign: 'center' }}>Agregar Estudiante</ThemedText>
      </TouchableOpacity>
      <FlatList
        data={students}
        renderItem={renderStudent}
        keyExtractor={(item) => item.id.toString()}
      />
    </ThemedView>
  );
}