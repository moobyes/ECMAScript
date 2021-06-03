/*
 * @Description: redux中间件
 * @Author: Moobye
 * @Date: 2021-02-07 19:21:15
 * @LastEditTime: 2021-02-07 19:22:29
 * @LastEditors: Moobye
 */
/**
 * @description: redux的异步解决方案
 * @param {*} extraArgument
 * @return {*}
 */
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  };
}
const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
export default thunk;