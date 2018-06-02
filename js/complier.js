class Complier {
  constructor(el, vm) {
    this.vm = vm;
    this.el = document.querySelector(el);
    if (this.el) {
      let fragment = this.nodeToFragment(this.el);
      this.complie(fragment);
    }
  }
  complie(node) {
    let nodeList = Array.from(node.childNodes);
    console.log(nodeList);
    nodeList.forEach((item) => {
      switch (item.nodeType) {
        case 1:
          this.elementComplier(item);
          break;
        case 3:
          this.textComplier(item);
      }
    })
  }
  elementComplier() {
    // 元素节点编译器

  }
  textComplier() {
    // 文本节点编译器
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