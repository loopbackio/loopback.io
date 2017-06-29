# loopback-example-connector.soap

## Usage

### Example 1

Get stock quotes by symbols:

```
node stock-ws.js
```

### Example 2

Get Periodic Table element information:

```
node periodictable-rest.js
```

### Example 3

To expose REST APIs to proxy the SOAP web services, run:

```
node periodictable-ws.js
```

then browse to [http://localhost:3000/explorer](http://localhost:3000/explorer)

In API explorer's operations list, select `GET /PeriodictableServices/GetAtomicNumber` or `GET /PeriodictableServices/GetAtomicWeight`, then enter `elementName` and click on `Try it out`. 


---

[More LoopBack examples](https://loopback.io/doc/en/lb3/Tutorials-and-examples.html)
