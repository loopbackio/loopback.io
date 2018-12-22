# loopback4-example-microservices

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/strongloop/loopback)

How to build scalable microservices using LoopBack.next.

> What's the difference between LoopBack.next and the current version of
> Loopback? See [LoopBack 3 vs LoopBack 4](https://github.com/strongloop/loopback-next/wiki/FAQ#loopback-3-vs-loopback-4).

## Installation

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) >= 8.0.0
- [TypeScript](https://www.typescriptlang.org/index.html#download-links) >= 2.0.0 `npm i -g typescript`
- [TypeScript Node](https://github.com/TypeStrong/ts-node#installation) >= 3.0.0 `npm i -g ts-node`

```shell
# install loopback4-example-microservices
git clone https://github.com/strongloop/loopback4-example-microservices
cd loopback4-example-microservices
npm i
```

## Basic use

```shell
# start all microservices
npm start

# perform GET request to retrieve account summary data
curl localhost:3000/account/summary?accountNumber=CHK52321122 # or npm test

# perform GET request to retrieve account data
curl localhost:3001/accounts?accountNumber=CHK52321122

# stop all microservices
npm stop
```

> Helper scripts for the above commands are in [`/bin`](https://github.com/strongloop/loopback4-example-microservices/tree/master/bin)
directory.

# Team

### Project Architects

|                   Raymond Feng                  |            Miroslav Bajtos            |           Ritchie Martori           |
| :---------------------------------------------: | :-----------------------------------: | :---------------------------------: |
| [![raymondfeng]](http://github.com/raymondfeng) | [![bajtos]](http://github.com/bajtos) | [![ritch]](http://github.com/ritch) |

### Project Maintainers

|                                           |                                             |                                                                                                              |                                       |
| :---------------------------------------: | :-----------------------------------------: | :----------------------------------------------------------------------------------------------------------: | :-----------------------------------: |
|               Taranveer Virk              |                Biniam Admikew               |                                                   Kyu Shim                                                   |               Diana Lau               |
|  [![virkt25]](http://github.com/virkt25)  |  [![b-admike]](http://github.com/b-admike)  | [<img src="https://avatars3.githubusercontent.com/u/18518689?v=3&s=60" height=60>](http://github.com/shimks) | [![dhmlau]](http://github.com/dhmlau) |
|                 Janny Hou                 |                   Simon Ho                  |       Yappa Hage                                                                                                      |                                       |
| [![jannyhou]](http://github.com/jannyHou) | [![superkhau]](http://github.com/superkhau) | [![hacksparrow]](https://github.com/hacksparrow)                                                                                                             |                                       |

[See all contributors](https://github.com/strongloop/loopback4-example-microservices/graphs/contributors)

# Contributing

- [Guidelines](https://github.com/strongloop/loopback-next/wiki/Contributing)
- [Join the team](https://github.com/strongloop/loopback-next/wiki/Contributing#join-the-team)

# License

MIT

[raymondfeng]: https://avatars0.githubusercontent.com/u/540892?v=3&s=60
[bajtos]: https://avatars2.githubusercontent.com/u/1140553?v=3&s=60
[ritch]: https://avatars2.githubusercontent.com/u/462228?v=3&s=60
[b-admike]: https://avatars0.githubusercontent.com/u/13950637?v=3&s=60
[dhmlau]: https://avatars2.githubusercontent.com/u/25489897?v=3&s=60
[jannyhou]: https://avatars2.githubusercontent.com/u/12554153?v=3&s=60
[superkhau]: https://avatars1.githubusercontent.com/u/1617364?v=3&s=60
[loay]: https://avatars3.githubusercontent.com/u/1986928?v=3&s=60
[virkt25]: https://avatars1.githubusercontent.com/u/3311536?v=3&s=60
[hacksparrow]: https://avatars2.githubusercontent.com/u/950112?v=3&s=60
