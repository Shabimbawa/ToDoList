import React, { createContext, useContext, useState, ReactNode } from 'react';

type ToDoItem = {
  title: string;
  details: string;
};

type User = {
  username: string;
  email: string;
  password: string;
};

type ToDoContextType = {
  currentToDo: ToDoItem[];
  completedToDo: ToDoItem[];
  users: User[];
  loggedInUser: User | null;
  addToDo: (task: ToDoItem) => void;
  completeToDo: (task: ToDoItem) => void;
  deleteToDo: (task: ToDoItem) => void;
  addUser: (user: User) => void;
  loginUser: (username: string, email: string, password: string) => boolean;
  logoutUser: () => void;
};

const ToDoContext = createContext<ToDoContextType | undefined>(undefined);

export const ToDoProvider = ({ children }: { children: ReactNode }) => {
  const [currentToDo, setCurrentToDo] = useState<ToDoItem[]>([]);
  const [completedToDo, setCompletedToDo] = useState<ToDoItem[]>([]);

  // Initialize with mock users
  const [users, setUsers] = useState<User[]>([
    { username: 'MarkJohn', email: 'MarkJohn@gmail.com', password: '123456' },
    { username: 'JaneDoe', email: 'JaneDoe@gmail.com', password: '123456' }
  ]);

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const addToDo = (task: ToDoItem) => {
    setCurrentToDo(prev => [...prev, task]);
  };

  const completeToDo = (task: ToDoItem) => {
    setCurrentToDo(prev => prev.filter(t => t.title !== task.title));
    setCompletedToDo(prev => [...prev, task]);
  };

  const deleteToDo = (task: ToDoItem) => {
    setCurrentToDo(prev => prev.filter(t => t.title !== task.title));
  };

  const addUser = (user: User) => {
    setUsers(prev => [...prev, user]);
  };

  const loginUser = (username: string, email: string, password: string) => {
    const user = users.find(u => u.username === username && u.email === email && u.password === password);
    if (user) {
      setLoggedInUser(user);
      return true; // Successful login
    }
    return false; // Failed login
  };

  const logoutUser = () => {
    setLoggedInUser(null);
  };

  return (
    <ToDoContext.Provider
      value={{
        currentToDo,
        completedToDo,
        users,
        loggedInUser,
        addToDo,
        completeToDo,
        deleteToDo,
        addUser,
        loginUser,
        logoutUser
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};

export const useToDo = () => {
  const context = useContext(ToDoContext);
  if (!context) throw new Error('useToDo must be used within a ToDoProvider');
  return context;
};
