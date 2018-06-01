class MVVM {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
    // 当视图存在时
    if (this.$el) {
      // 将属性添加进Observer，劫持数据
      new Observer(this.$data);
    }
  }
}