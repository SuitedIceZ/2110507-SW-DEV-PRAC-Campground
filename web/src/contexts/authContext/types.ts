export interface IAuthContext {
    name: string;
    setName: (name: string) => void;
    role: string;
    setRole: (role: string) => void;
    id: string;
    setId: (id: string) => void;
    token: string;
    setToken: (token: string) => void;
    logout: () => void;
  }