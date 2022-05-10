# Provider

## react入口文件使用redux
```
import * as React from 'react';
import { Provider } from 'react-redux'
import store from 'src/store'
// ...

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

```

源码
```

import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ReactReduxContext } from './Context';
import Subscription from '../utils/Subscription';

<!-- 传入store <Provider store={store}> -->
function Provider(_ref) {
  var store = _ref.store, // 获取组件绑定的store
      context = _ref.context,
      children = _ref.children;

  // contextValue的值为{store， subscription}
  var contextValue = useMemo(function () {
    var subscription = new Subscription(store);
    subscription.onStateChange = subscription.notifyNestedSubs;
    return {
      store: store,
      subscription: subscription
    };
  }, [store]);
  var previousState = useMemo(function () {
    return store.getState();
  }, [store]);
  useEffect(function () {
    var subscription = contextValue.subscription;
    subscription.trySubscribe();

    if (previousState !== store.getState()) {
      subscription.notifyNestedSubs();
    }

    return function () {
      subscription.tryUnsubscribe();
      subscription.onStateChange = null;
    };
  }, [contextValue, previousState]);
  var Context = context || ReactReduxContext;
   // 利用 context 传递store和订阅实例
  return React.createElement(Context.Provider, {
    value: contextValue
  }, children);
}

if (process.env.NODE_ENV !== 'production') {
  Provider.propTypes = {
    store: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired
    }),
    context: PropTypes.object,
    children: PropTypes.any
  };
}

export default Provider;
```

### 参考

[React-Redux 源码解读(一): Provider与Subscription](https://zhuanlan.zhihu.com/p/199153052)