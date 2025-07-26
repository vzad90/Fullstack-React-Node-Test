import {Link} from "react-router";
import { useGenericForm } from "../../../hooks/useGenericForm";
import { validateName, validateEmail, validatePassword, validateRegisterForm } from "../../../utils/validation";

export default function RegisterForm({onSubmit}: {onSubmit: (e: React.FormEvent<HTMLFormElement>) => void}) {
    const {
        formData,
        isSubmitting,
        getFieldError,
        handleInputChange,
        handleBlur,
        handleSubmit,
    } = useGenericForm({
        initialData: { name: '', email: '', password: '' },
        fieldValidators: {
            name: validateName,
            email: validateEmail,
            password: (val) => validatePassword(val, false),
        },
        formValidator: validateRegisterForm,
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
        return `${baseClasses} border-gray-300 focus:ring-green-500 focus:border-green-300`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                    <p className="text-gray-600">Join us and get started</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input 
                                type="text" 
                                name="name" 
                                id="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                placeholder="Enter your full name"
                                className={getInputClasses('name')}
                                required
                            />
                            {getFieldError('name') && (
                                <p className="mt-1 text-sm text-red-600">{getFieldError('name')}</p>
                            )}
                        </div>
                        
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
                                placeholder="Create a strong password"
                                className={getInputClasses('password')}
                                required
                            />
                            {getFieldError('password') ? (
                                <p className="mt-1 text-sm text-red-600">{getFieldError('password')}</p>
                            ) : (
                                <p className="mt-1 text-xs text-gray-500">
                                    Password must be at least 8 characters with uppercase, lowercase, and number
                                </p>
                            )}
                        </div>

                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>
                    
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to={'/login'} className="font-medium text-green-600 hover:text-green-500 transition-colors duration-200">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
} 