# 一、项目说明
node-express-swagger

## 描述
这是一个示例项目

# 二、Swagger目录结构说明
## 1.api
> controllers
接口控制器（controller）文件夹，控制器为标准的express控制器加上swagger封装，swagger封装主要提现在get和post等方法参数获取上，swagger会根据swagger.yaml文件描述，对参数进行验证并组合成对象。
    1）获取query的name参数
    var name = req.swagger.params.name.value
    2）获取body的name参数参数
    var body = req.swagger.params.body.value
    var name = body.name

> fittings
swagger过滤器中间件文件夹，目前使用全局错误过滤器，对所有未处理错误进行捕获，并返回统一错误格式，错误格式如：
    {"error":{"code":999,"message":"this is error message"}}

> helpers
服务所需的部分方法封装在此目录。

> mocks
存放模拟数据生成相关代码。

> db
存放数据模型定义

> swagger/swagger.yaml
swagger （https://swagger.io/）接口描述文件，对接口路径、输入输出等进行规范描述，同时通过swagger-ui生成可视化接口文档。

## 2.config
配置文件目录

> config.json
默认采用的配置文件。

> config.dev.json
使用NODE_ENV=dev参数运行时采用的配置文件，使用于开发环境。

> config.production.json
使用NODE_ENV=production参数运行时采用的配置文件，使用于生产环境。

> config.release.json
采用NODE_ENV=release参数运行是采用的配置文件，当前是发布到公司内网的release环境需要的配置文件。

> config.test.json
采用NODE_ENV=test参数运行是采用的配置文件，当前是发布到test性能测试环境需要的配置文件。

> default.yaml
swagger配置文件，一般使用默认配置，配置参考地址：
    https://github.com/swagger-api/swagger-node/blob/master/docs/configuration.md

> dict.json
业务错误代码字典配置文件，业务错误返回通过CustomError(code)返回，错误代码配置会在后面章节做出说明。

> index.js
配置文件入口，require引用配置文件是只需要require到config/index.js文件，系统会根据NODE_ENV配置，选择对应的配置文件。

## 3.test
单元测试目录，系统早期有写单元测试，后期没有对单元测试进行维护，目前单元测试大部分没发跑通。

## 4.app.js
服务执行入口，服务初始化、服务监听、服务注册。

# 三、后端服务业务错误代码配置说明
## 1.业务错误代码配置文件
文件位置：config/dict.json

    {
        "biz": {
            "name": "gateway",      //业务服务名称
            "code": 40001,          //业务服务代码，作为业务错误编码的前缀
            "errors": {
                "001": "未知错误",  //业务错误代码和错误简介键值对
                "002": "账户不存在",
                "999": "内部错误"
            }
        }
    }
    
举例：如biz.code为40001，代码中返回code为001的错误编码，接口返回code为-40001001，message为biz.errors.001的值。

## 2.返回业务错误说明
> 1）初始化，加载配置文件

    //初始化字典文件
    var dictFile = path.join(__dirname, './config/dict.json');
    debug(`loading ${dictFile}`);

    var dict = require('ms-framework/vessel/utils/dict');
    dict.init(dictFile);

> 2）代码中返回业务错误

业务错误统一使用CustomError对象（ms-framework/vessel/utils/customError）返回，JSON相关接口可调用CustomError对象的toJSON()方法转换成json数据返回。

    var CustomError=require(ms-framework/vessel/utils/customError);
    var err=new CustomError("001");//001为配置文件中配置的错误代码
    return res.json(err.toJSON());