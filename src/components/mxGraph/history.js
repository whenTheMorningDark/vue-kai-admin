
class History {
  constructor(maxSnapshots = 20) {
    this.maxSnapshots = maxSnapshots;
    this.snapshots = {};
    this.cursor = 0;
  }

  get canUndo () {
    return this.cursor > 1;
  }

  get canClear () {
    return this.snapshots.length;
  }

  get canRedo () {
    const snapshotKey = Object.keys(this.snapshots);
    return snapshotKey.length > this.cursor;
  }

  record (snapshot) {
    // if (this.checkRepeat(snapshot)) {
    //   return false
    // }
    // while (this.cursor < Object.keys(this.snapshots).length) {
    //   // this.snapshots.pop();
    // }
    let len = Object.keys(this.snapshots).length;
    if (this.cursor < len) {
      for (let i = this.cursor; i < len; i++) {
        delete this.snapshots[i + 1];
      }
    }

    // 生成唯一的 id，确保在列表渲染时不会重用 DOM
    // 这样生成的动画更好的表现新旧历史记录的替换
    // snapshot.uuid = fakeUUID()
    this.cursor++;
    this.snapshots[this.cursor] = snapshot;
    // 确保历史记录条数限制
    // if (snapshotKey.length > this.maxSnapshots) {
    //   const keys = this.snapshotKey.shift()
    //   delete this.snapshots[keys]
    // }
  }

  undo () {
    if (this.canUndo) {
      this.cursor -= 1;
      return this.snapshots[this.cursor];
    }
    return null;
  }

  redo () {
    if (this.canRedo) {
      this.cursor += 1;
      return this.snapshots[this.cursor];
    }
    return null;
  }

  move (cursor) {
    if (this.snapshots.length > cursor) {
      this.cursor = cursor;
      return this.snapshots[this.cursor];
    }
  }

  clear () {
    this.cursor = -1;
    this.snapshots = [];
  }

  checkRepeat (snapshot) {
    const next = snapshot;
    let prev;
    if (this.cursor >= 0) {
      prev = this.snapshots[this.cursor];
    } else {
      prev = "";
    }
    // 如果更复杂的对象建议使用 deep equal 库
    if (typeof prev !== "object" || typeof next !== "object") {
      return false;
    }
    let diffFound = false;
    ["x", "y", "w", "h", "r"].find(k => {
      diffFound = prev[k] !== next[k];
      return diffFound;
    });
    return !diffFound;
  }
}

export default History;