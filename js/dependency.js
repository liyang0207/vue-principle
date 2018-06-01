class Dependency {
  constructor() {
    this.subs = [];
  }
  addSub(watch) {
    this.subs.push(watch);
  }
  notify() {
    this.subs.forEach((watch) => {
      watch.update();
    })
  }
}