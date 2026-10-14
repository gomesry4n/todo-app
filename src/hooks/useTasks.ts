import { Task } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const TASKS_KEY = "@task_key";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // 1. Carregar dados ao Iniciar
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem(TASKS_KEY);
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
        }
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      } finally {
        setIsInitialLoad(false);
      }
    };
    loadTasks();
  }, []);

  // 2. Salvar dados ao Alterar
  useEffect(() => {
    if (isInitialLoad) return; // Evita salvar durante o carregamento inicial

    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.error("Erro ao salvar tarefas:", error);
      }
    };
    saveTasks();
  }, [tasks, isInitialLoad]);

  // Função para adicionar uma nova tarefa
  const addTasks = (text: string) => {
    if (text.trim() === "") return; // Evita adicionar tarefas vazias
    const newTask: Task = {
      id: Date.now().toString(),
      text,
    };
    // Atualiza o estado das tarefas com a nova tarefa
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Função para remover uma tarefa pelo ID
  const removeTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Função para editar uma tarefa pelo ID
  const editTask = (id: string, newText: string) => {
    if (newText.trim() === "") return; // Evita salvar tarefas vazias
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task,
      ),
    );
  };

  return { tasks, addTasks, removeTask, editTask };
}
