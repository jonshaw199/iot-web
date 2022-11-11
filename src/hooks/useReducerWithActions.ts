import { useReducer, useCallback, Reducer } from "react";
import { Action, ActionCreators } from "../types";

const useReducerWithActions = <S, A extends ActionCreators>({
  reducer,
  initialState,
  actionCreators,
}: {
  reducer: Reducer<S, Action<any>>;
  initialState: S;
  actionCreators: A;
}) => {
  const [value, dispatch] = useReducer(reducer, initialState);

  const wrappedActionCreators: A = Object.keys(actionCreators).reduce(
    (prev, actionKey) => ({
      ...prev,
      // eslint-disable-next-line react-hooks/rules-of-hooks
      [actionKey]: useCallback(
        async (...args) =>
          Promise.resolve(actionCreators[actionKey](...args)).then(
            (result) => result && dispatch(result)
          ),
        [actionKey]
      ),
    }),
    actionCreators
  );

  return {
    ...value,
    ...wrappedActionCreators,
  };
};

export default useReducerWithActions;
