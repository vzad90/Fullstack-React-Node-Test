import RegisterForm from "./components/RegisterForm";
import { onSubmit } from "./utils/handlers";

export default function RegisterFeature() {
    return (
        <RegisterForm onSubmit={onSubmit} />
    );
} 