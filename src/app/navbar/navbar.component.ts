isLoggedIn(): boolean {
  return !!localStorage.getItem('jwt');
}
