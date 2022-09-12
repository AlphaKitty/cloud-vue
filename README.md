# 看项目方法

1. 看package.json的scripts 一般会分生产启动和本地启动 不是所有项目的启动都是npm run dev 其中可能会有一些自定义启动命令 顺着找会找到一些自定义配置
2. 看package.json的dependencies和devDependencies 前者指定了项目运行所需要的的依赖 后者指定了项目开发所需要的的依赖

        1.6.4 表示安装指定1.6.4版本
        ~1.6.4 表示安装不低于1.6.4但不安装1.7.x及以上的版本
        ^1.6.4 表示安装不低于1.6.4但不安装2.x.x及以上的版本
        latest 表示安装最新版本
        
        package-lock.json文件的作用是避免每次npm install都更新全部依赖的最新版本 可能会出现版本不兼容问题
        也就是说node_modules里的依赖都是lock文件的依赖版本 要想单独升级某个依赖版本需要用npm install packagename@x.x.x指定升级

3. 看vue.index.js 本身是对webpack的增强 里面的内容会替换webpack默认配置 会被@vue/cli-service 自动加载自动加载
4. 看main.js使用了哪些依赖 引入了哪些自定义配置 其中require()是静态引入 require.ensure()和import是动态引入
