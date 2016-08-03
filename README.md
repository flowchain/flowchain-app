Flowchain is an ultra light-weight runtime for flow-based IoT programming.

# Flowchain

You can write IoT server, serverless server or localhost server with Flowchain in flow-based programming.

<img src="https://raw.githubusercontent.com/flowchain/flowchain/master/screenshots/usage.gif" border="1" />

With flowchain, you're drawing the *Graph* in the form of JSON. Flowchain can run the graph as a service process (server) at your IoT devices or desktops.

## Usage

The simplest way to learn flowchain is to start *console.json*.

```
$ git clone https://github.com/flowchain/flowchain.git
$ npm install
$ ./bin/init.js start graphs/console.json 
[devify] Starting coapBroker server...
WoT/CoAP server is listening at coap://localhost:8000
```

### Programing IoT device

This is out of scope of flowchain. However, there is an example to show the simplest way to send sensor data to flowchain application via CoAP. The following example uses NodeMCU/ESP8266 device and Lua programming language.

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

Flowchain will execute the *console.json* graph which is called *Flowchain Application*. And *console.json* is simplely a graph described in JSON format.

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

The visual graph diagram is as following.

![](https://cloud.githubusercontent.com/assets/1126021/17215664/409fd6ec-5510-11e6-80fb-371b6c3a724e.png)

### Component

Flow components are published as npm module. One of the components is ```io.flowchain.console``` which can be found at [io.flowchain.console](https://www.npmjs.com/package/io.flowchain.console).

## Development Notes

### Write Your Graph

There are [flowchain graph examples](https://github.com/flowchain/flowchain/tree/master/graphs).

### Add a New Component

1. Custom component can be developed by forking this example [io.flowchain.console](https://github.com/flowchain/io.flowchain.console).

2. Publish your component to npm.

3. Update package.json by ```npm install <your-package> --save```.

4. Open ```lib/main.js``` file. and require (include) your component to flowchain.

```
var components =[
  ...
  require('io.flowchain.console')
];
```

You could send a PR to [flowchain](https://github.com/flowchain/flowchain). You flowchain component will also be listed at [flowchain.io](http://flowchain.io).

## Why and What

* Instead of the classical monolithic application programming model. Flowchain is the flow-based programming.

* Flowchain is a flow-based runtime for JavaScript IoT application server. 

* Flowchain is a better approach to write IoT application servers. 

* Flowchain is based on [devify-server](https://github.com/DevifyPlatform/devify-server). 

* Flowchain is one-way data flow design.

## Internals

* Flowchain has a ultra-lightweight flow-based runtime called **fb0**. *fb0* is tiny with 300+ lines code.

* Flowchain has CoAP/WebSocket URI-based protocol servers for interoperating with IoT devices.

## Credits

Flowchain open source project is heavily inspired by [J. Paul Morrison](http://www.jpaulmorrison.com/) and FBP-like  [NoFlo](https://github.com/noflo/noflo).

*fb0* is a *FBP-like* system and is a JavaScript system motivated by [J. Paul Morrison](http://www.jpaulmorrison.com/), and which uses a number of the same terms and concepts.

## Roadmap

* [2016] Building Flowchain on [JerryScript](https://github.com/Samsung/jerryscript), an ultra-lightweight JavaScript engine for the Internet of Things.

* [2016] React component binding with state stores and Flux pattern.

* [2016] Serverless IoT in a simpilicy way. 

## License

Flowchain is released under the [MIT License](http://www.opensource.org/licenses/MIT).
