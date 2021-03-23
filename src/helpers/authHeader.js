export default function authHeader() {
    const auth = JSON.parse(localStorage.getItem('auth'));
    
    if (auth && auth.user.accessToken) {
       return { Authorization: 'Bearer ' + auth.user.accessToken }; 
    } else {
      return {};
    }
  }