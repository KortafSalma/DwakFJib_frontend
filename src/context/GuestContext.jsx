import { createContext, useContext, useState, useCallback } from 'react';

const GuestContext = createContext(null);

function loadSavedReservation() {
  const saved = localStorage.getItem('pending_reservation');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  }
  return null;
}

export const GuestProvider = ({ children }) => {
  const [pendingReservation, setPendingReservation] = useState(loadSavedReservation);
  const [authRequiredAction, setAuthRequiredAction] = useState(null);

  const prepareReservation = useCallback((data) => {
    setPendingReservation(data);
    localStorage.setItem('pending_reservation', JSON.stringify(data));
  }, []);

  const clearReservation = useCallback(() => {
    setPendingReservation(null);
    localStorage.removeItem('pending_reservation');
  }, []);

  const requireAuth = useCallback((action) => {
    setAuthRequiredAction(action);
  }, []);

  const clearAuthAction = useCallback(() => {
    setAuthRequiredAction(null);
  }, []);

  return (
    <GuestContext.Provider value={{
      pendingReservation,
      authRequiredAction,
      prepareReservation,
      clearReservation,
      requireAuth,
      clearAuthAction,
    }}>
      {children}
    </GuestContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGuest = () => {
  const context = useContext(GuestContext);
  if (!context) throw new Error('useGuest must be used within GuestProvider');
  return context;
};

export default GuestContext;
