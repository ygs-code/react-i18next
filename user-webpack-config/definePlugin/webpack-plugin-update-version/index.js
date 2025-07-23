const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

let {
  NODE_ENV, // 环境参数
} = process.env; // 环境参数

// https://juejin.cn/post/6844903991508205576
class WebpackPluginRouter {
  constructor(options = {}) {
    this.options = options;
    this.routesConfigs = [];
    this.startTime = null;
    this.timer = null;
    this.writeFile();
  }
  removeLine(string) {
    return string
      .replace(/\/{2,}/g, '/')
      .replace(/\\/g, '/')
      .trim();
  }
  writeFile(compilation) {
    let {
      // 定义目标目录路径
      uotDir = path.join(process.cwd(), '/src/static/file'),
      uotFile,
    } = this.options;
    uotFile = uotFile || path.join(uotDir, '/version.json');

    // 检查目录是否存在
    if (!fs.existsSync(uotDir)) {
      // 如果不存在，则创建目录
      fs.mkdirSync(uotDir, { recursive: true });
      console.log(`目录已创建: ${uotDir}`);
    } else {
      console.log(`目录已存在: ${uotDir}`);
    }

    let content = `{
      "code": 200,
      "resultObj": {
          "version": "${uuid.v4()}"
      }
    }`;
    fs.writeFileSync(this.removeLine(uotFile), content, 'utf-8');
  }
  compilerFile(compilation) {
    this.writeFile();
  }
  //   做兼容
  hook(compiler, hookName, pluginName, fn) {
    if (arguments.length === 3) {
      fn = pluginName;
      pluginName = hookName;
    }
    if (compiler.hooks) {
      compiler.hooks[hookName].tap(pluginName, fn);
    } else {
      compiler.plugin(pluginName, fn);
    }
  }

  apply(compiler) {
    // webpack  处理webpack选项的条目配置后调用。 只编译一次
    // if (NODE_ENV === "production") {
    // compiler.hooks.emit.tapAsync('entryOption', (compilation, callback) => {
    //   this.compilerFile(compilation);
    //   callback();
    // });
    // return false;
    // }
    // this.hook(compiler, "watchRun", (compilation) => {
    //   this.writeFile(compilation);
    // });
    // compiler.hooks.emit.tapAsync(
    //   "WebpackPluginRouter",
    //   (compilation, callback) => {
    //     this.compilerFile(compilation);
    //     callback();
    //   }
    // );
    // compiler.plugin("make", (compilation, callback) => {
    //     this.compilerFile(compilation);
    //     callback();
    // });
    // this.hook(compiler, "done", (stats) => {
    //     if (stats.compilation.errors && stats.compilation.errors.length) {
    //         );
    //         // process.exit(1);
    //     }
    // });
  }
}

module.exports = WebpackPluginRouter;
