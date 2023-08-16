### Loader

#### 分类根据执行时机
+ pre 
+ normal
+ inline
+ post

配置 enforce 决定执行的顺序
#### 执行书序
1. 四类：pre -> normal -> inline -> post     
2. 同类别loader执行顺序  先右后左，先下后上



### 本质
1. loader 就是一个函数
2. 接受文件的内容参数，返回内容回去