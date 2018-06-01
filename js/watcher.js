class Watcher {
  constructor(vm, expr, callback) {
    this.vm = vm;
    this.expr = expr;
    this.callback = callback;
    this.value = this.get();    // 将自己添加到Dep
  }
  get() {
    Dependency.target = this;   // 缓存自己
    let value = this.vm.$data[this.expr];  // 触发执行Observer中的get函数
    Dependency.target = null;   // 释放自己
    return value;
  }
  update() {
    // 值更新后，Observer的setter通过Dep容器通知watcher去update视图
    let newValue = this.vm.$data[this.expr];
    let oldValue = this.value;
    if (newValue !== oldValue) {
      // 新老值不一致，执行回调
      this.callback(newValue);
    }
  }
}