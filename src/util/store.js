import React, { createContext, useState } from 'react';


export const StoreContext = createContext(null);
export default ({ children }) => {
  const [globalWidthState, setGlobalWidth] = useState(1);
  const store = {
    globalWidth: [globalWidthState, setGlobalWidth],
  };
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
};