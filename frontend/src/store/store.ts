import {create} from "zustand";
import {fetchDataFromServer} from "../services/fetchTodoFromServer.ts";

interface User {
    name: string;
    email: string;
    id: number
}

interface UserState {
    user: User | null;
    setUser: () => Promise<void>;
}

export const userState = create<UserState>((set) => ({
    user: null,
    setUser: async () => {
        try {
            const response = await fetchDataFromServer('http://localhost:3000/users/get-user-data');
            set(
                {
                    user: response as User,

                }
            )
        } catch (error) {
            console.log(error)
        }
    }
}))
export const useUserState = userState
await userState.getState().setUser()
