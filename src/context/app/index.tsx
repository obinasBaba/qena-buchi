import React, { FC, useMemo, useReducer, useState } from 'react';

export interface State {
  filters: {
    type?: string;
    age?: string;
    gender?: string;
    size?: string;
    page?: string;
    good_with_children?: boolean;
  } | null;
}

const initialState = {
  filters: null,
};

type Action = {
  type:
    | 'SET_TYPE'
    | 'SET_AGE'
    | 'SET_GENDER'
    | 'SET_SIZE'
    | 'SET_GOOD_WITH_CHILDREN';
};

export const AppContext = React.createContext<State | any>(initialState);

AppContext.displayName = 'UIContext';

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    /*case 'SET_TYPE': {
      return {
        ...state,
        filters: {
          ...state.filters,
          type: action.type,
        },
      };
    }
*/
    default:
      return state;
  }
}

const AppProvider: FC<{ children: React.ReactElement }> = (props) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);
  const [filters, setFilters] = useState<State['filters']>(null);

  // const showNavBar = () => dispatch({ type: 'SHOW_NAV_BAR' });

  const value = useMemo(
    () => ({
      filters,
      setFilters,
    }),
    [filters, setFilters],
  );

  return <AppContext.Provider value={value} {...props} />;
};

export default AppProvider;

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }

  return context as {
    filters: State['filters'];
    setFilters: Function;
  };
};
