class Dependency {
  constructor() {
    this.subs = [];
  }
  addSub(watch) {
    console.log(watch);
    this.subs.push(watch);
    console.log(this.subs);
  }
  notify() {
    console.log(this.subs);
    this.subs.forEach((watch) => {
      watch.update();
    })
  }
}