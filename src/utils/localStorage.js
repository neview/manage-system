/**
 * 本地缓存
 * localCache.set(名字,值,秒数)
 * localCache.get(yy_ + 名字,返回值) 需要加前缀 yy_
 */

const localCache = {
  nowTime: new Date().getTime(),
  prefix: "yy_",
  set: function (name, value, expire = null) {
    name = this.prefix + name;
    // 处理缓存值
    if (typeof value !== "string" && typeof value === "object") {
      value = JSON.stringify(value);
    }
    // 处理缓存时间
    expire = Number(expire) > 0 ? this.nowTime + Number(expire) : null;
    // 合并
    const data = JSON.stringify({
      expire,
      value,
    });
    localStorage.setItem(name, data);

    return true;
  },
  get: function (name, def = null) {
    name = this.prefix + name;
    const value = localStorage.getItem(name);
    if (null === value) return def;
    try {
      // 检测是否为对象
      let obj = JSON.parse(value);

      if (typeof obj === "object") {
        if (!obj.expire) return obj.value;
        if (!obj.value) return def;
        // 校验过期时间
        if (obj.expire < this.nowTime) {
          localStorage.removeItem(name);
          return def;
        } else {
          try {
            let objValue = JSON.parse(obj.value);
            return typeof objValue === "object" ? objValue : obj.value;
          } catch (e) {
            return obj.value;
          }
        }
      } else {
        return def;
      }
    } catch (e) {
      return def;
    }
  },
};
export default localCache;
