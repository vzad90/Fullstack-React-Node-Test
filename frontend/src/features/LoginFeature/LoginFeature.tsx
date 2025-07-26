import LoginForm from "./components/LoginForm.tsx";
import {onSubmit} from "./utils/handlers.ts";

export default function LoginFeature() {
    return (
        <LoginForm onSubmit={onSubmit}/>
    )
}