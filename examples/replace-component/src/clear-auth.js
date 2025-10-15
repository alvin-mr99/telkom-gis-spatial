// Auto-clear authentication on development start
// This ensures login page shows by default

if (typeof window !== 'undefined') {
  // Clear auth tokens
  localStorage.removeItem('telkom_gis_auth');
  localStorage.removeItem('telkom_gis_user');
  console.log('🔓 Authentication cleared - Login page will be shown');
}
