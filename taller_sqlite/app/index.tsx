import { useEffect, useState } from "react";
import { Text } from "react-native";
import { initDB, insertarProgramasIfEmpty } from "../database/database";
import EstudiantesScreen from "../screens/EstudiantesScreen";

export default function Home() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initDB().then(() => insertarProgramasIfEmpty()).then(() => setIsReady(true));
  }, []);

  return isReady ? <EstudiantesScreen /> : <Text style={{ textAlign: 'center', marginTop: 50 }}>Cargando...</Text>;
}