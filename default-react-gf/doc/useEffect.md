## 18.2.0

#### useEffect

相当于  `componentDidMount`、 `componentDidUpdate` 和 `componentWillUnmount`


### 无依赖项 无返回函数
相当于 `componentDidUpdate`

### 返回函数
相当于 `componentWillUnmount`要执行返回函数


### 有依赖
依赖值变化才会执行

### 依赖为空数组
相当于 `componentDidMount`
