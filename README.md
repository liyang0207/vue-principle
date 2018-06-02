# vue-principle
vue双向数据绑定原理，简单实现。

![原理图](/two-ways-binding.png)

实现流程：

1. 首先通过一个`Observer`（监听器或者劫持器）去劫持`data`对象中的所有属性，方法就是使用`Object.defineProperty()`中的`getter/setter`，在属性`set`的时候通知`Dependency`（订阅器/容器）发布变化；
2. 实现一个`Watcher`（订阅者），这个`Watcher`就是说我收到数据变化的通知后，应该去执行什么操作（重新填充列表，填充值等等，即更新视图），一个data.message数据可能对应多个使用场景，比如`v-model="message"`、`v-text="message"`、`{{message}}`等等，所以`Watcher`不止一个；
3. 上面说到`Watcher`不止一个，所以我们可以实现一个容器`Dependency`，里面存放data.message对应的所有`Watcher`，这样当`Observer`的`Setter`改变时，调用`Dependency`的`notify`方法，逐条去通知所有的`Watcher`；
4. 实现一个编译器`Complier`，编译器的作用是扫描和解析每一个节点`node`，先将节点转换为`fragment`（性能优化，一次性append所有节点至目标element内），再根据不同的节点类型`nodeType`，针对`v-model`、`v-text`、`{{message}}`做不同的处理，完成第一次的数据`message`填充（即初始化视图）；同时编译器还担当着初始化`Watcher`的任务，将`Watcher`添加到`Dependency`中去；

流程总结：实例化MVVM时，先使用Object.defineProperty劫持每一个data数据，为每一个属性实例化一个Dependency；在编译页面的时候为每一个需要更新message的地方添加一个Watcher，即v-model="message"、v-text="message"和{{message}}，有一个算一个，将这些Watcher添加到Dependency中进行统一管理；在编译的时候我们还要为input添加一个事件监听addEventListener，这样input的输入值变化时，触发setter，在setter内调用Dep的notify()方法，循环调用每一个Watcher的update更新我们的视图（执行回调函数）。