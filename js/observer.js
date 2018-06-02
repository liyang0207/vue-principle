class Observer {
  constructor(data) {
    this.observer(data);
  }
  observer(data) {
    if (!data || typeof data !== 'object') {
      return false;
    } else {
      Object.keys(data).forEach((key) => {
        this.defineReactive(data, key, data[key]);
      })
    }
  }
  defineReactive(obj, key, value) {
    let dep = new Dependency();
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: false,
      get() {
        if (Dependency.target) {
          console.log('dep.target1')
          dep.addSub(Dependency.target);    // 添加订阅者watcher,应该是整个实例Watcher
        }
        return value;
      },
      set(newValue) {
        // 值未变化return回去
        if (newValue === value) { return false; }
        value = newValue;
        // 数据变化，通知dep里所有的watcher
        dep.notify();
      }
    })
  }
}
Dependency.target = null;