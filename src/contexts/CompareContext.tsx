import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { toast } from 'sonner';

interface CompareContextType {
  compareList: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareList, setCompareList] = useLocalStorage<string[]>('cu-pg-compare', []);

  const addToCompare = (id: string) => {
    if (compareList.length >= 3) {
      toast.error('You can compare up to 3 PGs at a time');
      return;
    }
    setCompareList((prev) => [...prev, id]);
    toast.success('Added to compare list');
  };

  const removeFromCompare = (id: string) => {
    setCompareList((prev) => prev.filter((item) => item !== id));
    toast.info('Removed from compare list');
  };

  const isInCompare = (id: string) => compareList.includes(id);

  const toggleCompare = (id: string) => {
    if (isInCompare(id)) {
      removeFromCompare(id);
    } else {
      addToCompare(id);
    }
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, isInCompare, toggleCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
