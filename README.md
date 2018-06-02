# vue-principle
vue双向数据绑定原理，简单实现。

流程总结：实例化MVVM时，先使用Object.defineProperty劫持每一个data数据，为每一个属性实例化一个Dependency；在编译页面的时候为每一个需要更新message的地方添加一个Watcher，即v-model="message"、v-text="message"和{{message}}，有一个算一个，将这些Watcher添加到Dependency中进行统一管理；在编译的时候我们还要为input添加一个事件监听addEventListener，这样input的输入值变化时，触发setter，在setter内调用Dep的notify()方法，循环调用每一个Watcher的update更新我们的视图（执行回调函数）。