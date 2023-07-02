import { useContext,createContext } from '@builder.io/qwik';
const AuthStateContext = createContext<{ token: string }>('auth-state');

export const useAuthState = () => {
  return useContext(AuthStateContext);
};