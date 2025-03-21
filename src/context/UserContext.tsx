import { createContext, ReactNode, useState } from "react";
import { User } from "../types/UserType";

interface IUserContext {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const userContext = createContext<IUserContext | undefined>(undefined);

function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}

export default UserProvider;
