
import firestore from "@react-native-firebase/firestore";

export type Todo = {
  id?: string;
  title: string;
  completed: boolean;
};

// ---------------- TODOS ----------------


//  Get Todos
export const listenTodos = (setTodos: (todos: Todo[]) => void) => {
  return firestore()
    .collection("todos")
    //.orderBy("createdAt", "desc")
    .orderBy("title")
    .onSnapshot((snapshot) => {
      const todos: Todo[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Todo),
      }));
      setTodos(todos);
    });
};



//Add Todo
export const addTodo = async (title: string) => {
  try {
    await firestore().collection("todos").add({
      title,
      completed: false,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};




// Toggle completed

export const toggleTodo = async (id: string, completed: boolean) => {
  try {
    await firestore().collection("todos").doc(id).update({ completed });
    
    //     console.log(" Todo updated!");

  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

// Update Todo title

export const updateTodo = async (id: string, newTitle: string) => {
  try {
    await firestore().collection("todos").doc(id).update({ title: newTitle });
  } catch (error) {
    console.error("Error updating todo title:", error);
  }
};


// Delete Todo
export const deleteTodo = async (id: string) => {
  try {
    await firestore().collection("todos").doc(id).delete();
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};

// ---------------- SUBTASKS ----------------

// Real-time listener

export const listenSubtasks = (
  todoId: string,
  setSubtasks: (tasks: Todo[]) => void
) => {
  return firestore()
    .collection("todos")
    .doc(todoId)
    .collection("subtasks")
    //     .orderBy("title")
    .orderBy("createdAt", "desc")
    .onSnapshot((snapshot) => {
      const tasks: Todo[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Todo),
      }));
      setSubtasks(tasks);
    });
};

// Add Subtask

export const addSubtask = async (todoId: string, title: string) => {
  try {
    await firestore()
      .collection("todos")
      .doc(todoId)
      .collection("subtasks")
      .add({ title, completed: false, createdAt: firestore.FieldValue.serverTimestamp() });
  } catch (error) {
    console.error("Error adding subtask:", error);
  }
};

// Toggle Subtask

export const toggleSubtask = async (todoId: string, subtaskId: string, completed: boolean) => {
  try {
    await firestore()
      .collection("todos")
      .doc(todoId)
      .collection("subtasks")
      .doc(subtaskId)
      .update({ completed });
  } catch (error) {
    console.error("Error toggling subtask:", error);
  }
};


// Update Subtask
export const updateSubtask = async (todoId: string, subtaskId: string, newTitle: string) => {
  try {
    await firestore()
      .collection("todos")
      .doc(todoId)
      .collection("subtasks")
      .doc(subtaskId)
      .update({ title: newTitle });
  } catch (error) {
    console.error("Error updating subtask:", error);
  }
};


// Delete Subtask
export const deleteSubtask = async (todoId: string, subtaskId: string) => {
  try {
    await firestore()
      .collection("todos")
      .doc(todoId)
      .collection("subtasks")
      .doc(subtaskId)
      .delete();
  } catch (error) {
    console.error("Error deleting subtask:", error);
  }
};


// const getNextId = async (counterName: string) => {
//   const counterRef = firestore().collection("counters").doc(counterName);

//   return firestore().runTransaction(async (t) => {
//     const doc = await t.get(counterRef);
//     const lastId = doc.exists() ? doc.data()?.lastId || 0 : 0; // ✅ call as function
//     const newId = lastId + 1;

//     t.set(counterRef, { lastId: newId });
//     return newId;
//   });
// };

// export const addTodo = async (title: string) => {
//   try {
//     const newId = await getNextId("todosCounter"); // ✅ CALLING the function

//     await firestore().collection("todos").doc(newId.toString()).set({
//       id: newId,
//       title,
//       completed: false,
//       createdAt: firestore.FieldValue.serverTimestamp(),
//     });
//   } catch (error) {
//     console.error("Error adding todo:", error);
//   }
// };



