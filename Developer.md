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

## Graph

Flowchain will execute the *console.json* graph which is called *Flowchain Application*. And *console.json* is simplely a graph described in JSON format.

```
{
    “author”: “jollen”,
    “type”: “coapBroker”,
    “connections”: [
        {
            “upproc”: “io.devify.fs”,
            “upport”: “out”,
            “downproc”: “io.devify.console”,
            “downport”: “in”
        }
    ]
}
```

The visual graph diagram is as following.

![](https://cloud.githubusercontent.com/assets/1126021/17215664/409fd6ec-5510-11e6-80fb-371b6c3a724e.png)
