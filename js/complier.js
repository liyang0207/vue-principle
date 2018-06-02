class Complier {
  constructor(el, vm) {
    this.vm = vm;
    this.el = document.querySelector(el);
    if (this.el) {
      let fragment = this.nodeToFragment(this.el);    // 使用fragment储存元素，这时候#app内就没有节点了，因为已经被frag删除完了
      this.complie(fragment);                         // 编译fragment
      this.el.appendChild(fragment);                  // 将fragment放回#app内
    }
  }
  complie(node) {
    let nodeList = Array.from(node.childNodes);
    nodeList.forEach((item) => {
      switch (item.nodeType) {
        case 1:
          this.elementComplier(item);break;
        case 3:
          this.textComplier(item);break;
      }
    })
  }
  elementComplier(node) {
    // 元素节点编译器，处理属性v-model，v-text等
    let attrs = Array.from(node.attributes);
    attrs.forEach((attr) => {
      if (attr.name.indexOf('v-') > -1) {
        let type = attr.name.split('-')[1];    // 取到'model',即指令的类型
        complierUnits[type] && complierUnits[type](node, this.vm, attr.value);
      }
    })
  }
  textComplier(node) {
    // 文本节点编译器{{message}},跟v-text共用一个编译方法
    if ((/\{\{(.+)\}\}/).test(node.textContent)) {
      complierUnits.text(node, this.vm, RegExp.$1);
    }
  }
  nodeToFragment(node) {
    let frag = document.createDocumentFragment();
    let child;
    while (child = node.firstChild) {
      // fragment调用appendChild方法会删除node.firstChild节点
      frag.appendChild(child);
    }
    console.log(frag);
    return frag;
  }
}
const complierUnits = {
  model (node, vm, expr) {
    let updateFn = this.updater.modelUpdater;
    // 初始化的时候取一次值填充，渲染页面数据
    updateFn && updateFn(node, vm.$data[expr]);
    // 实例化watcher(调用watcher),将watcher添加到Dep中，同时定义好回调函数（数据变化后干什么）
    new Watcher(vm, expr, function(newValue){
      updateFn && updateFn(node, newValue);
    });
    // 监听input值的变化，从视图到data
    node.addEventListener('input', (event) => {
      vm.$data[expr] = event.target.value;
    })
  },
  text (node, vm, expr) {
    let updateFn = this.updater.textUpdater;
    updateFn && updateFn(node, vm.$data[expr]);
    console.log('dep.target0');
    new Watcher(vm, expr, function(newValue){
      updateFn && updateFn(node, newValue);
    });
  },
  updater: {
    modelUpdater(node, value) {
      node.value = value;
    },
    textUpdater(node, value) {
      node.textContent = value;
    }
  }
};