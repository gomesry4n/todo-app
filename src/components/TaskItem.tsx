import { Task } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface TaskItenProps {
  task: Task;
  onRemove: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export function TaskItem({ task, onRemove, onEdit }: TaskItenProps) {
  // Estado para controlar se a tarefa está em modo de edição
  const [isEditing, setIsEditing] = useState(false);

  // Estado para guardar o texto temporário da tarefa enquanto está sendo editada
  const [editedText, setEditedText] = useState(task.text);

  const handleSave = () => {
    if (editedText.trim() === "") return;

    onEdit(task.id, editedText.trim());
    setIsEditing(false);
  };

  return (
    <View style={styles.taskCard}>
      {isEditing ? (
        <TextInput
          style={styles.editInput}
          value={editedText}
          onChangeText={setEditedText}
          autoFocus
        />
      ) : (
        <Text style={styles.taskText}>{task.text}</Text>
      )}

      <View style={styles.actionContainer}>
        {/*Botão Editar e Salvar*/}
        {isEditing ? (
          <TouchableOpacity
            style={[styles.actionButton, styles.saveButton]}
            onPress={handleSave}
            activeOpacity={0.7}
          >
            <Ionicons name="checkmark" size={20} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => {
              setIsEditing(true);
              setEditedText(task.text);
            }}
            activeOpacity={0.7}
          >
            <Ionicons name="pencil" size={17} color="#fff" />
          </TouchableOpacity>
        )}

        {/*Botão Excluir */}
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => onRemove(task.id)}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eaecef",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  taskText: {
    fontSize: 16,
    color: "#252a34",
    flex: 1,
    marginRight: 12,
    fontWeight: "500",
  },

  editInput: {
    flex: 1,
    fontSize: 16,
    color: "#252a34",
    borderBottomWidth: 2,
    borderBottomColor: "#6366f1",
    padding: 0,
    marginRight: 12,
  },

  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  actionButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  editButton: {
    backgroundColor: "#6366f1",
  },

  saveButton: {
    backgroundColor: "#16a34a",
  },

  deleteButton: {
    backgroundColor: "#ef4444",
  },
});
