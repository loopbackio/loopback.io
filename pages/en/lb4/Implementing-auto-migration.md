---
lang: en
title: 'Implementing Auto-Migration'
keywords: LoopBack 4.0
sidebar: lb4_sidebar
permalink: /doc/en/lb4/Implementing-auto-migration.html 
---

## Overview
In LoopBack, auto-migration helps the user create relational database schemas based on definitions of their models. Auto-migration can facilitate the synchronization of the database and models so that they match, such as in cases where the database needs to be changed in order to match the models. LoopBack offers two ways to do this:

* **Auto-migrate**: Drop existing schema objects if they exist and re-create them based on model definitions. Existing data will be lost. 

* **Auto-update**: Change database schema objects if there is a difference between the objects and model definitions. Existing data will be kept.

## Implementation Example
There are two ways to implement [*automigrate()*](http://apidocs.loopback.io/loopback-datasource-juggler/#datasource-prototype-automigrate) and [*autoupdate()*](http://apidocs.loopback.io/loopback-datasource-juggler/#datasource-prototype-autoupdate), shown below with the [TodoList](https://loopback.io/doc/en/lb4/todo-list-tutorial.html) example.

### First Approach: index.ts
This approach is if you want to have migration centralized in one place.

In **src/index.ts**, add the following import statement and import your models: 

``` ts
import { DataSource, Repository } from '@loopback/repository';
import { Todo, TodoList } from './models';
```

Then get the datasource and your repositories:

``` ts
const ds = await app.get<DataSource>('datasources.db');
const todoRepo = await app.get<Repository<Todo>>('repositories.TodoRepository');
const todoListRepo = await app.get<Repository<TodoList>>('repositories.TodoListRepository');
```

Finally, call *automigrate()* or *autoupdate()*:
```ts
ds.automigrate((err: any) => {
    if (err) throw err;
});
```

This call to automigrate will migrate all your repositories, however if you want to only migrate some of your repositories, add the names of the classes in the first parameter:
```ts
ds.automigrate('Todo', (err: any) => {
    if (err) throw err;
});
```
```ts
ds.automigrate(['Todo', 'TodoList'], (err: any) => {
    if (err) throw err;
});
```

**src/index.ts**
``` ts
import { TodoListApplication } from './application';
import { ApplicationConfig } from '@loopback/core';
import { DataSource, Repository } from '@loopback/repository';
import { Todo, TodoList } from './models';

export { TodoListApplication };

export async function main(options: ApplicationConfig = {}) {
  const app = new TodoListApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);

  const ds = await app.get<DataSource>('datasources.db');
  const todoRepo = await app.get<Repository<Todo>>('repositories.TodoRepository');
  const todoListRepo = await app.get<Repository<TodoList>>('repositories.TodoListRepository');

  ds.automigrate((err: any) => {
    if (err) throw err;
  });
  return app;
}
```

### Second Approach: Individual Repositories
This approach is if you want to handle migration separately in each repository.

In **src/repositories/todo-list.repository.ts**, add the migrate/update call in the constructor:

```ts
import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  juggler,
  repository,
} from '@loopback/repository';
import {Todo, TodoList} from '../models';
import {TodoRepository} from './todo.repository';

export class TodoListRepository extends DefaultCrudRepository<
  TodoList,
  typeof TodoList.prototype.id
> {
  public readonly todos: HasManyRepositoryFactory<
    Todo,
    typeof TodoList.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: juggler.DataSource,
    @repository.getter(TodoRepository)
    protected todoRepositoryGetter: Getter<TodoRepository>,
  ) {
    super(TodoList, dataSource);
    this.todos = this._createHasManyRepositoryFactoryFor(
      'todos',
      todoRepositoryGetter,
    );
    
    // Calling autoupdate()
    dataSource.autoupdate('TodoList', err => {
        if (err) throw err;
    });
  }

  public findByTitle(title: string) {
    return this.findOne({where: {title}});
  }
}
```
