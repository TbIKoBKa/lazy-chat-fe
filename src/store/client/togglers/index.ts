// Core
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

// Tools
import { useSelector } from '../../../tools/hooks';

const initialState = {};

// Types
export type TTogglersState = typeof initialState;
export type TogglersKeys = keyof typeof initialState;
export type Options = { type: TogglersKeys; value: boolean };

// Slice
export const togglersSlice = createSlice({
  name: 'togglers',
  initialState,
  reducers: {
    toggleCreatorAction: (state, action: PayloadAction<Options>) => ({
      ...state,
      [action.payload.type]: action.payload.value,
    }),
    resetTogglersToInitialAction: (_, action: PayloadAction<TTogglersState>) =>
      action.payload,
  },
});

// Interfaces
const togglersActions = togglersSlice.actions;
export default togglersSlice.reducer;

export const useTogglers = () => {
  const togglers = useSelector(({ togglers }) => togglers);
  const dispatch = useDispatch();

  const setToggle = useCallback(
    (options: Options) => {
      void dispatch(togglersActions.toggleCreatorAction(options));
    },
    [dispatch]
  );

  const resetTogglers = useCallback(
    (state?: TTogglersState) => {
      void dispatch(
        togglersActions.resetTogglersToInitialAction(state || initialState)
      );
    },
    [dispatch]
  );

  return {
    togglersState: togglers,
    setToggle,
    resetTogglers,
  };
};

// Used ./src/tools/helpers/makeRequest
export const toggleCreatorAction = togglersActions.toggleCreatorAction;
