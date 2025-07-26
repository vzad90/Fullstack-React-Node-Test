import LogoutButton from "./components/LogoutButton.tsx";
import {handleLogout} from "./utils/handlers.ts";

export default function LogoutFeature() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Logout</h1>
                    <p className="text-gray-600">Are you sure you want to logout?</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="text-center space-y-6">
                        <div className="text-gray-600">
                            <p>You will be signed out of your account.</p>
                            <p className="text-sm mt-2">All your data will be safely stored.</p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                            <LogoutButton onClick={handleLogout} />
                            <button 
                                onClick={() => window.history.back()}
                                className="inline-flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}