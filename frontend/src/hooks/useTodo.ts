import { useEffect, useState } from "react";
import {fetchDataFromServer} from "../services/fetchTodoFromServer.ts";
import { showToast } from "../utils/toast";


export type Todo = {
    id: number;
    title: string;
    description: string;
    status: "IN_PROGRESS" | "DONE";
};

export function useTodo() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

    const fetchTodos = async () => {
        try {
            const data = await fetchDataFromServer<Todo[]>("http://localhost:3000/tasks/user");
            console.log(data);
            setTodos(data);
        } catch (error) {
            showToast.error('Failed to fetch tasks');
            console.error('Error fetching todos:', error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const createTask = async (formData: Record<string, string>) => {
        try {
            await fetchDataFromServer("http://localhost:3000/tasks/create", {
                method: "POST",
                body: JSON.stringify(formData),
            });
            await fetchTodos();
            showToast.success('Task created successfully!');
        } catch (error) {
            showToast.error('Failed to create task');
            throw error;
        }
    };

    const editTask = async (id: number, formData: Record<string, string>) => {
        try {
            await fetchDataFromServer(`http://localhost:3000/tasks/${id}`, {
                method: "PUT",
                body: JSON.stringify(formData),
            });
            await fetchTodos();
            setEditingTodo(null);
            showToast.success('Task updated successfully!');
        } catch (error) {
            showToast.error('Failed to update task');
            throw error;
        }
    };

    const deleteTask = async (id: number) => {
        try {
            await fetchDataFromServer(`http://localhost:3000/tasks/${id}`, {
                method: "DELETE",
            });
            await fetchTodos();
            showToast.success('Task deleted successfully!');
        } catch (error) {
            showToast.error('Failed to delete task');
            throw error;
        }
    };

    const toggleTaskStatus = async (id: number, status: "IN_PROGRESS" | "DONE") => {
        try {
            await fetchDataFromServer(`http://localhost:3000/tasks/${id}`, {
                method: "PUT",
                body: JSON.stringify({ status }),
            });
            await fetchTodos();
            const statusText = status === 'DONE' ? 'completed' : 'marked as in progress';
            showToast.success(`Task ${statusText}!`);
        } catch (error) {
            showToast.error('Failed to update task status');
            throw error;
        }
    };

    return {
        todos,
        editingTodo,
        setEditingTodo,
        fetchTodos,
        createTask,
        editTask,
        deleteTask,
        toggleTaskStatus,
    };
}
