![](https://raw.githubusercontent.com/flowchain/flowchain.github.io/master/images/logo-text%40128.png)

Flowchain-app is an ultra light-weight runtime for flow-based IoT programming.

# Flowchain

You can write IoT server, serverless server or localhost server with Flowchain in flow-based programming.

<img src="https://raw.githubusercontent.com/flowchain/flowchain/master/screenshots/usage0.gif?v0.1" border="1" />

In the flowchain-app, IoT applications are described by a *Graph* in the JSON format. Flowchain-app can execute the graph as a service process (server) on various hardware, e.g., resource-constrained devices, single-board computers and desktops.

## Usage

A easy way to start using flowchain-app is trying *console.json*.

```
$ git clone https://github.com/flowchain/flowchain.git
$ cd flowchain
$ npm install
$ export HOST=192.168.0.100
$ ./bin/init.js start graphs/console.json 
[devify] Starting coapBroker server...
WoT/CoAP server is listening at coap://192.168.0.100:8000
```

Flowchain-app is now listening at the host assigned by ```HOST``` environment variable. You can also export the ```PORT``` variable to specify the listening port.

### Programing IoT device

It is out of scope of flowchain-app. However, there is an example showing a sample in which send sensor data to flowchain-app over CoAP. The following example uses a NodeMCU (aka ESP8266) device with Lua programming language.

```
-- Configure the ESP as a station (client)
wifi.setmode(wifi.STATION)  
wifi.sta.config("<SSID>", "<PASSWORD>")  
wifi.sta.autoconnect(1)

-- Create a CoAP client
cc = coap.Client()

-- Make a POST request
uri="coap://192.168.0.100:8000/object/12345678/send"

-- Setup a timer to send ADC data
tmr.alarm(0, 1000, 1, function() 
    buf = 
          "{" ..
          "\"quality\":" ..
          adc.read(0) ..
          "}"
    
    cc:post(uri, buf)
    print(buf)
end)
```

## Programming Paradigm

### Graph

Flowchain-app will execute the *console.json* file. The *console.json* is a sample graph described in JSON format.

```
{
    "author": "jollen",
    "type": "coapBroker",
    "connections": [
        {
            "upproc": "io.flowchain.console",
            "upport": "out",
            "downproc": "io.flowchain.fs",
            "downport": "in"
        }
    ]
}
```

The visual graph diagram is also shown as following.

![](https://cloud.githubusercontent.com/assets/1126021/17215664/409fd6ec-5510-11e6-80fb-371b6c3a724e.png)

### Component

Flowchain-app components could be published as npm modules. One existing component is ```io.flowchain.console``` and accessible at [io.flowchain.console](https://www.npmjs.com/package/io.flowchain.console).

## Development Notes

### Write Your Graph

There are several [flowchain graph examples](https://github.com/flowchain/flowchain/tree/master/graphs).

### Add a New Component

1. To develop custom components, please fork this example [io.flowchain.console](https://github.com/flowchain/io.flowchain.console).

2. Publish your component to npm.

3. Update package.json by ```npm install <your-package> --save```.

4. Open ```lib/main.js``` file and require (include) your component into flowchain.

```
var components =[
  ...
  require('io.flowchain.console')
];
```

You could send a PR to [flowchain](https://github.com/flowchain/flowchain). All flowchain-app components will also be listed at the [flowchain.io](http://flowchain.io) website.

## Why and What

* Instead of the classical monolithic application programming model. Flowchain-app is the flow-based programming.

* Flowchain-app is a flow-based runtime for JavaScript IoT application server. 

* Flowchain-app is a better approach to write IoT application servers. 

* Flowchain-app is based on [devify-server](https://github.com/DevifyPlatform/devify-server). 

* Flowchain-app is one-way data flow design.

## Internals

* Flowchain-app has a ultra-lightweight flow-based runtime called **fb0**. *fb0* is tiny with 300+ lines code.

* Flowchain-app has CoAP/WebSocket URI-based protocol servers for interoperating with IoT devices.

## Credits

Flowchain-app project is heavily inspired by [J. Paul Morrison](http://www.jpaulmorrison.com/) and FBP-like  [NoFlo](https://github.com/noflo/noflo).

*fb0* is a *FBP-like* system and is a JavaScript system motivated by [J. Paul Morrison](http://www.jpaulmorrison.com/), and which uses a number of the same terms and concepts.

## Roadmap

* [2017] Building flowchain-app on [JerryScript](https://github.com/Samsung/jerryscript), an ultra-lightweight JavaScript engine for the Internet of Things.

* [2017] React component binding with state stores and Flux pattern.

* [2017] Serverless IoT in a simpilicy way. 

## License

Flowchain-app is released under the [MIT License](http://www.opensource.org/licenses/MIT).
