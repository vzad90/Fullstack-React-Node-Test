import { showToast } from '../../../utils/toast';

export async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    
    try {
        const response = await fetch('http://localhost:3000/users/create', {
            body: JSON.stringify(formData),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.errors?.[0]?.message || 'Registration failed');
        }
        
        const ready = await response.json();
        localStorage.setItem('token', ready.token);
        showToast.success('Registration successful!');
        window.location.reload();
    } catch (error) {
        if (error instanceof Error) {
            console.error('Registration error:', error.message);
            showToast.error(error.message);
        } else {
            console.error('Unknown registration error:', error);
            showToast.error('An unexpected error occurred during registration');
        }
        throw error;
    }
} 