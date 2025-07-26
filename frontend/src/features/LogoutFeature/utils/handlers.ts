import { showToast } from '../../../utils/toast';

export function handleLogout() {
    localStorage.removeItem('token')
    showToast.success('Logged out successfully!');
    window.location.reload()
}