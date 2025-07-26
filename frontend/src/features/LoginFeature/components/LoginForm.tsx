import {Link} from "react-router";
import { useGenericForm } from "../../../hooks/useGenericForm";
import { validateEmail, validatePassword, validateLoginForm } from "../../../utils/validation";

export default function LoginForm({onSubmit}: {onSubmit: (e: React.FormEvent<HTMLFormElement>) => void}) {
    const {
        formData,
        isSubmitting,
        getFieldError,
        handleInputChange,
        handleBlur,
        handleSubmit,
    } = useGenericForm({
        initialData: { email: '', password: '' },
        fieldValidators: {
            email: validateEmail,
            password: (val) => validatePassword(val, true),
        },
        formValidator: validateLoginForm,
        onSubmit: async (_formData, e) => {
            await onSubmit(e);
        },
    });

    const getInputClasses = (fieldName: string) => {
        const error = getFieldError(fieldName);
        const baseClasses = "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200";
        if (error) {
            return `${baseClasses} border-red-300 focus:ring-red-500 focus:border-red-300`;
        }
        return `${baseClasses} border-gray-300 focus:ring-blue-500 focus:border-blue-300`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to your account</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                placeholder="Enter your email"
                                className={getInputClasses('email')}
                                required
                            />
                            {getFieldError('email') && (
                                <p className="mt-1 text-sm text-red-600">{getFieldError('email')}</p>
                            )}
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                placeholder="Enter your password"
                                className={getInputClasses('password')}
                                required
                            />
                            {getFieldError('password') && (
                                <p className="mt-1 text-sm text-red-600">{getFieldError('password')}</p>
                            )}
                        </div>
                        
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to={'/register'} className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}