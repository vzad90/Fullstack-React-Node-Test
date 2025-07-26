import TaskManager from "./components/TaskManager";
import {useUserState} from "./store/store.ts";

function App() {
    const user = useUserState.getState().user
    return (
        <>
            {
                user ? <TaskManager/> : <h1>Please, sign up</h1>
            }
        </>
    );
}

export default App;
