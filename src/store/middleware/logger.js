export const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
      return next(action);
    }
  
    console.log("type", action.type);
    console.log("type", action.payload);
    console.log("currentState", store.getState());
  
    next(action);
  
    console.log("next state", store.getState());
  };
  
