// Auto-clear authentication on development start
// This ensures login page shows by default
// DISABLED: Keep auth persistent across refreshes

// if (typeof window !== 'undefined') {
//   // Clear auth tokens
//   localStorage.removeItem('telkom_gis_auth');
//   localStorage.removeItem('telkom_gis_user');
//   console.log('🔓 Authentication cleared - Login page will be shown');
// }

console.log('✅ Auth persistence enabled - Login state will persist across page refreshes');
