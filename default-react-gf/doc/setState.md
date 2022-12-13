## 18.2.0

#### setState

state 的更新可能是异步的

#### 在 18 版本以前是这种结果

所有的都是异步的，不能同步获取，最后是在第二个回调函数中获取

```
    this.setState({
        number:12
    },cb);

```

#### 在 18 版本以前是这种结果

setState 只有在合成时间和生命周期函数中是异步的，在原生事件和 setTimeout 中都是同步的

### 依赖 state 和 props 的更新

不要传递一个对象，而是传递一个函数，函数有两个参数，第一个参数是当前的 state，第二个参数是当前的 prop

```
    this.setState((state, props) => ({
        counter: state.counter + props.increment
    }));

```
