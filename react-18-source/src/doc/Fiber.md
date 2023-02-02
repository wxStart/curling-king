### fiberNode


+ return  指向父亲的fiberNode
+ child 指向第一个孩子的fiberNode，child的sibling 指向第二个孩子的fiberNode，依次访问siblig就可以访问所有的孩子
+ sibling 指向下一个兄弟的fiberNode

+ alternate 也是一个fiberNode  
+ tag  组件的类型  0 是函数组件  1是clase组件 等等有很多值 `ReactWorkTags 文件中`