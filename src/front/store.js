export const initialStore = () => ({
  token: null,
  user: null,
  error: null,
  message: null
});

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'login_success':
      return {
        ...store,
        token: action.payload.token,
        user: action.payload.user,
        error: null,
        message: "Login exitoso"
      };

    case 'login_error':
      return {
        ...store,
        token: null,
        user: null,
        error: action.payload,
        message: null
      };

    case 'add_user_success':
      return {
        ...store,
        error: null,
        message: action.payload
      };

    case 'add_user_error':
      return {
        ...store,
        error: action.payload,
        message: null
      };

    case 'logout':
      return initialStore();

    case 'clear_error':
      return {
        ...store,
        error: null,
        message: null
      };

    default:
      throw Error(`Unknown action: ${action.type}`);
  }
}
