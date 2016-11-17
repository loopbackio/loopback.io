# loopback-example-kv-connectors

KeyValue connector examples.

- [Usage](https://github.com/strongloop/loopback-example-kv-connectors#usage)
- [Examples list](https://github.com/strongloop/loopback-example-kv-connectors#examples-list)

## Usage

Examples are written in the form of tests. Ensure everything is working
correctly by running the tests before using the code as reference.

For example, to try out the KeyValue-memory connector:

```shell
git clone https://github.com/strongloop/loopback-example-kv-connectors.git
cd loopback-example-kv-connectors/kv-memory-lb2x/
npm install
npm test
```

Then [review the tests](kv-memory-lb2x/test) to understand how to use the
connector.

### Third party connectors

You will need to start the corresponding servers on your local machine using
default application ports before running tests.

For example, to try out the Redis KeyValue connector:

```shell
git clone https://github.com/strongloop/loopback-example-kv-connectors.git
cd loopback-example-kv-connectors/redis-lb2x/
npm install
redis-server --daemonize yes # starts redis in the background
npm start
```

Then [review the tests](redis-lb2x/test) accordingly. To stop the Redis
background process, find its process id and kill it:

```shell
ps aux | grep redis-server
# ...find the process id (ie. 12345)
kill 12345
```

> We intentionally skip over configuration details like setting up data sources
> and models as these topics are already covered in [our tutorials](http://github.com/strongloop/loopback-example#tutorials).

## Examples list

LoopBack|Connector
:-:|:--
2.x|[KeyValue-memory](kv-memory-lb2x/test)
2.x|[Redis](redis-lb2x/test)
3.x|[KeyValue-memory](kv-memory-lb3x/test)
3.x|[Redis](redis-lb3x/test)

---

[More LoopBack examples](https://github.com/strongloop/loopback-example)
