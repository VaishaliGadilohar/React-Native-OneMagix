
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
    Alert,
    Animated,
    Dimensions,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import useTheme from "@/hooks/useTheme";
import {
    addSubtask,
    addTodo,
    deleteSubtask,
    deleteTodo,
    listenSubtasks,
    listenTodos,
    Todo,
    toggleSubtask,
    toggleTodo,
    updateSubtask,
    updateTodo,
} from "../services/firestore";

const screenWidth = Dimensions.get("window").width;

const TodoScreen = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingText, setEditingText] = useState("");

    const [selectedTask, setSelectedTask] = useState<Todo | null>(null);
    const [subtasks, setSubtasks] = useState<Todo[]>([]);
    const [newSubtask, setNewSubtask] = useState("");
    const [editingSubtaskId, setEditingSubtaskId] = useState<string | null>(null);
    const [editingSubtaskText, setEditingSubtaskText] = useState("");

    const [editingTaskInPanel, setEditingTaskInPanel] = useState(false);
    const [panelTaskText, setPanelTaskText] = useState("");

    const slideAnim = useRef(new Animated.Value(screenWidth)).current;
    const { theme } = useTheme();

    // ---------------- LISTENERS ----------------
    useEffect(() => {
        const unsubscribe = listenTodos(setTodos);
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!selectedTask?.id) return;
        setPanelTaskText(selectedTask.title); // initialize panel task text
        const unsub = listenSubtasks(selectedTask.id, setSubtasks);
        return () => unsub();
    }, [selectedTask]);

    // ---------------- TODO HANDLERS ----------------
    const handleAdd = async () => {
        if (!title.trim()) return Alert.alert("Error", "Please enter a todo title.");
        await addTodo(title.trim());
        setTitle("");
    };

    const handleToggle = async (item: Todo) => {
        if (!item.id) return;
        await toggleTodo(item.id, !item.completed);
    };

    const handleEditStart = (item: Todo) => {
        setEditingId(item.id || null);
        setEditingText(item.title);
    };

    const handleEditSave = async (item: Todo) => {
        if (!item.id) return;
        if (!editingText.trim()) return Alert.alert("Error", "Task title cannot be empty.");
        await updateTodo(item.id, editingText.trim());
        setEditingId(null);
        setEditingText("");
    };

    const handleDelete = async (item: Todo) => {
        if (!item.id) return;
        await deleteTodo(item.id);
    };

    const handleSelectTask = (item: Todo) => {
        setSelectedTask(item);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const closePanel = () => {
        Animated.timing(slideAnim, {
            toValue: screenWidth,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setSelectedTask(null);
            setEditingTaskInPanel(false);
        });
    };

    // ---------------- PANEL TASK HANDLERS ----------------
    const handleSavePanelTask = async () => {
        if (!selectedTask?.id) return;
        if (!panelTaskText.trim()) return;
        await updateTodo(selectedTask.id, panelTaskText.trim());
        setEditingTaskInPanel(false);
    };

    // ---------------- SUBTASK HANDLERS ----------------
    const handleAddSubtask = async () => {
        if (!selectedTask?.id || !newSubtask.trim()) return;
        await addSubtask(selectedTask.id, newSubtask.trim());
        setNewSubtask("");
    };

    const startEditingSubtask = (subtask: Todo) => {
        setEditingSubtaskId(subtask.id || null);
        setEditingSubtaskText(subtask.title);
    };

    const handleSaveSubtask = async (subtask: Todo) => {
        if (!selectedTask?.id || !subtask.id) return;
        if (!editingSubtaskText.trim()) return;
        await updateSubtask(selectedTask.id, subtask.id, editingSubtaskText.trim());
        setEditingSubtaskId(null);
        setEditingSubtaskText("");
    };

    const renderItem = ({ item }: { item: Todo }) => (
        <TouchableOpacity onPress={() => handleSelectTask(item)}>
        
            <View style={styles.todoCard}>
                <TouchableOpacity onPress={() => handleToggle(item)}>
                    <Ionicons
                        name={item.completed ? "checkmark-circle" : "ellipse-outline"}
                        size={26}
                        color={item.completed ? "#4CAF50" : "#bbb"}
                        style={{ marginRight: 10 }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.todoTextWrapper}
                    onLongPress={() => handleEditStart(item)}
                    activeOpacity={0.8}
                >
                    {editingId === item.id ? (
                        <TextInput
                            value={editingText}
                            onChangeText={setEditingText}
                            onBlur={() => handleEditSave(item)}
                            onSubmitEditing={() => handleEditSave(item)}
                            style={styles.editInput}
                            autoFocus
                            placeholder="Edit task..."
                        />
                    ) : (
                        <Text
                            style={[
                                styles.todoText,
                                item.completed && { textDecorationLine: "line-through", color: "#aaa" },
                            ]}
                        >
                            {item.title}
                        </Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleDelete(item)}>
                    <Ionicons name="trash-outline" size={22} color="#e74c3c" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
            <View style={[styles.container, {backgroundColor: theme.background}]}>

                <Text style={styles.header}>🔥To-Do</Text>

                {/* Input Bar */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Add a new task..."
                        placeholderTextColor="#aaa"
                        value={title}
                        onChangeText={setTitle}
                        onSubmitEditing={handleAdd}
                    />
                    <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
                        <Ionicons name="add" size={26} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Todo List */}
                <FlatList
                    data={todos}
                    keyExtractor={(item, index) => item.id ?? index.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<Text style={styles.emptyText}>No tasks yet 😴</Text>}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />

                {/* Slide-In Right Panel */}
                {selectedTask && (
                    <Animated.View style={[styles.detailPanel, { transform: [{ translateX: slideAnim }] }]}>
                        <View style={styles.detailHeader}>
                            {editingTaskInPanel ? (
                                <TextInput
                                    value={panelTaskText}
                                    onChangeText={setPanelTaskText}
                                    onBlur={handleSavePanelTask}
                                    onSubmitEditing={handleSavePanelTask}
                                    style={styles.detailTitleInput}
                                    autoFocus
                                />
                            ) : (
                                <Text style={styles.detailTitle}>{selectedTask.title}</Text>
                            )}

                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                {!editingTaskInPanel && (
                                    <TouchableOpacity onPress={() => setEditingTaskInPanel(true)}>
                                        <Ionicons name="pencil-outline" size={20} color="#555" />
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity onPress={closePanel}>
                                    <Ionicons name="close" size={26} color="#333" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Subtasks List */}
                        <FlatList
                            data={subtasks}
                            keyExtractor={(item, index) => item.id ?? index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.subtaskRow}>
                                    <TouchableOpacity
                                        onPress={() => toggleSubtask(selectedTask.id!, item.id!, !item.completed)}
                                    >
                                        <Ionicons
                                            name={item.completed ? "checkmark-circle" : "ellipse-outline"}
                                            size={22}
                                            color={item.completed ? "#4CAF50" : "#bbb"}
                                        />
                                    </TouchableOpacity>

                                    {editingSubtaskId === item.id ? (
                                        <TextInput
                                            value={editingSubtaskText}
                                            onChangeText={setEditingSubtaskText}
                                            onBlur={() => handleSaveSubtask(item)}
                                            onSubmitEditing={() => handleSaveSubtask(item)}
                                            style={styles.editInput}
                                            autoFocus
                                        />
                                    ) : (
                                        <Text
                                            style={[
                                                styles.subtaskText,
                                                item.completed && { textDecorationLine: "line-through", color: "#888" },
                                            ]}
                                        >
                                            {item.title}
                                        </Text>
                                    )}

                                    <TouchableOpacity onPress={() => startEditingSubtask(item)}>
                                        <Ionicons name="pencil-outline" size={18} color="#555" />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => deleteSubtask(selectedTask.id!, item.id!)}>
                                        <Ionicons name="trash-outline" size={18} color="#e74c3c" />
                                    </TouchableOpacity>
                                </View>
                            )}
                            ListEmptyComponent={<Text style={styles.emptyText}>No subtasks yet.</Text>}
                        />

                        {/* Add Subtask Input */}
                        <View style={styles.subtaskInputRow}>
                            <TextInput
                                style={styles.subtaskInput}
                                placeholder="Add subtask..."
                                value={newSubtask}
                                onChangeText={setNewSubtask}
                                onSubmitEditing={handleAddSubtask}
                            />
                            <TouchableOpacity onPress={handleAddSubtask}>
                                <Ionicons name="add" size={24} color="#ff7b00" />
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                )}
            </View>
        </KeyboardAvoidingView>
    );
};

export default TodoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8fafc",
        paddingHorizontal: 20,
        paddingTop: 60
    },
    header: {
        fontSize: 28,
        fontWeight: "700",
        color: "#ff7b00",
        textAlign: "center",
        marginBottom: 20
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        marginBottom: 20,
    },
    input:
    {
        flex: 1,
        fontSize: 16,
        color: "#333",
        paddingVertical: 6
    },
    addBtn: {
        backgroundColor: "#ff7b00",
        borderRadius: 12,
        padding: 10,
        marginLeft: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    todoCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        padding: 15, borderRadius: 14,
        marginBottom: 12, shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2
    },
    todoTextWrapper: { flex: 1 },
    todoText: {
        fontSize: 16,
        color: "#333"
    },
    editInput: {
        fontSize: 16,
        color: "#333",
        paddingVertical: 2,
        borderBottomWidth: 1,
        borderColor: "#ddd"
    },
    emptyText: {
        textAlign: "center",
        color: "#888",
        marginTop: 20
    },
    detailPanel: {
        position: "absolute",
        top: 0,
        right: 0,
        width: "70%",
        height: "100%",
        backgroundColor: "#fff",
        padding: 20,
        borderLeftWidth: 1,
        borderColor: "#ddd",
        elevation: 8
    },
    detailHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20
    },
    detailTitle: {
        fontSize: 20,
        fontWeight: "700", color: "#ff7b00"
    },
    detailTitleInput: {
        fontSize: 20,
        fontWeight: "700",
        color: "#ff7b00",
        borderBottomWidth: 1,
        borderColor: "#ddd",
        flex: 1,
        paddingVertical: 2
    },
    subtaskRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10
    },
    subtaskText: {
        flex: 1,
        marginLeft: 10,
        color: "#333",
        fontSize: 15
    },
    subtaskInputRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
        borderTopWidth: 1,
        borderColor: "#eee",
        paddingTop: 10
    },
    subtaskInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: "#ddd",
        marginRight: 8,
        paddingVertical: 4
    },
});
