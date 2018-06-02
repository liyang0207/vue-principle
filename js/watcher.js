class Watcher {
  constructor(vm, expr, callback) {
    this.vm = vm;
    this.expr = expr;           // data中的key值
    this.callback = callback;
    this.value = this.get();    // 将自己添加到Dep
  }
  get() {
    console.log('dep.target2');
    Dependency.target = this;   // 缓存自己,就是这个Watcher实例
    let value = this.vm.$data[this.expr];  // 触发执行Observer中的get函数
    Dependency.target = null;   // 释放自己
    return value;
  }
  update() {
    // 值更新后，Observer的setter就会触发，就会执行dep.notify()，即通过Dep容器通知watcher去update视图
    let newValue = this.vm.$data[this.expr];
    let oldValue = this.value;
    if (newValue !== oldValue) {
      // 新老值不一致，执行回调
      this.callback(newValue);
    }
  }
}