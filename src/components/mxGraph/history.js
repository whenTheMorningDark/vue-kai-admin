/* eslint-disable eol-last */
// const fakeUUID = () => `${+new Date()}${Math.random()}`

class History {
  constructor(maxSnapshots = 20) {
    this.maxSnapshots = maxSnapshots
    this.snapshots = {}
    this.cursor = -1
  }

  get canUndo() {
    return this.cursor > 0
  }

  get canClear() {
    return this.snapshots.length
  }

  get canRedo() {
    const snapshotKey = Object.keys(this.snapshots)
    console.log(snapshotKey)
    // return this.snapshots.length > this.cursor + 1
    return snapshotKey.length > this.cursor
  }

  record(snapshot) {
    // if (this.checkRepeat(snapshot)) {
    //   return false
    // }
    while (this.cursor < this.snapshots.length - 1) {
      this.snapshots.pop()
    }

    // 生成唯一的 id，确保在列表渲染时不会重用 DOM
    // 这样生成的动画更好的表现新旧历史记录的替换
    // snapshot.uuid = fakeUUID()
    // this.snapshots.push(this.snapshots[this.snapshots.length].concat(snapshot))

    if (this.snapshots.length === 0) {
      this.snapshots[0] = snapshot
      this.cursor = 1
    } else {
      const snapshotKey = Object.keys(this.snapshots)
      const currentLen = snapshotKey.length + 1
      this.snapshots[currentLen] = snapshot
      this.cursor = currentLen
      // const prevSnapShots = JSON.parse(JSON.stringify(this.snapshots[this.snapshots.length - 1]))
      // console.log(prevSnapShots)
      // console.log(this.snapshots[0])
      // prevSnapShots[this.cursor].push(snapshot)
      // // prevSnapShots.push(snapshot)
      // this.snapshots.push(prevSnapShots)
      // console.log(this.snapshots)
    }
    // 确保历史记录条数限制
    // if (snapshotKey.length > this.maxSnapshots) {
    //   const keys = this.snapshotKey.shift()
    //   delete this.snapshots[keys]
    // }
    // this.cursor = snapshotKey.length - 1
    // this.cursor = snapshotKey.length - 1
  }

  undo() {
    if (this.canUndo) {
      this.cursor -= 1
      return this.snapshots[this.cursor]
    }
    return null
  }

  redo() {
    if (this.canRedo) {
      this.cursor += 1
      console.log(this.cursor)
      return this.snapshots[this.cursor]
    }
    return null
  }

  move(cursor) {
    if (this.snapshots.length > cursor) {
      this.cursor = cursor
      return this.snapshots[this.cursor]
    }
  }

  clear() {
    this.cursor = -1
    this.snapshots = []
  }

  checkRepeat(snapshot) {
    const next = snapshot
    let prev
    if (this.cursor >= 0) {
      prev = this.snapshots[this.cursor]
    } else {
      prev = ''
    }
    // 如果更复杂的对象建议使用 deep equal 库
    if (typeof prev !== 'object' || typeof next !== 'object') {
      return false
    }
    let diffFound = false;
    ['x', 'y', 'w', 'h', 'r'].find(k => {
      diffFound = prev[k] !== next[k]
      return diffFound
    })
    return !diffFound
  }
}

export default History