Serverless IoT server in a simpilicy way.

**Flowchain** is a **Graph Server** based upon [devify-server](https://github.com/DevifyPlatform/devify-server). It's a new programming model for IoT serverless server.

# Flowchain

Flowchain is JavaScript runtime to run serverless IoT application server. You can write IoT serverless server (running at localhost) with Flowchain.

Unlike the legacy monolithic application programming model. Flowchain is the flow-based programming model.

With flowchain, you're drawing the *Graph* and writing the graph in the form of JSON. Flowchain can run the graph as a service process (server) at your IoT devices.

## Quickstart

```
$ git clone https://github.com/flowchain/flowchain.git
$ npm install
$ ./bin/init.js start graphs/console.json 
[devify] Starting coapBroker server...
WoT/CoAP server is listening at coap://localhost:8000
```

## Programing IoT device

The simplest way to send sensor data to flowchain IoT server via CoAP is using NodeMCU and Lua programming language.

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

## Internals

* Flowchain has a ultra light-weight flow-based runtime called **fb0**. *fb0* is tiny with 300+ lines code.

* Flowchain has CoAP/WebSocket URI-based protocol servers for interoperating with IoT devices.



## Credits

Flowchain open source project is heavily inspired by [J. Paul Morrison](http://www.jpaulmorrison.com/) and FBP-like  [NoFlo](https://github.com/noflo/noflo).

*fb0* is a *FBP-like* system and is a JavaScript system motivated by [J. Paul Morrison](http://www.jpaulmorrison.com/), and which uses a number of the same terms and concepts.

## License

Flowchain is released under the [MIT License](http://www.opensource.org/licenses/MIT).
