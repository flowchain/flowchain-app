Flowchain is an ultra light-weight runtime for flow-based IoT programming.

## Getting Started

The simplest way to learn flowchain is to start *console.json*.

```
$ git clone https://github.com/flowchain/flowchain.git
$ npm install
$ ./bin/init.js start graphs/console.json 
[devify] Starting coapBroker server…
WoT/CoAP server is listening at coap://localhost:8000
```

## Paradigm

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

## Programming

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

Finally, you can send a PR to [flowchain](https://github.com/flowchain/flowchain). You flowchain component will also be listed at [flowchain.io](http://flowchain.io).
