# loopback-example-relations

```
$ git clone https://github.com/strongloop/loopback-example-relations.git
$ cd loopback-example-relations
$ npm install
$ node .
```

In this example, we create a simple web app to demonstrate model relation
concepts. The app consists of a single web page with a list of links to help us
query and filter sample data via REST.

## Prerequisites

Before starting this tutorial, you must install:
- Node.js
- LoopBack CLI tools; see [lb](http://loopback.io/doc/en/lb3/Installation.html)

### Tutorials

- [Getting started with LoopBack](https://github.com/strongloop/loopback-getting-started)
- [Tutorial series - Step 1](https://github.com/strongloop/loopback-getting-started/tree/step1)

### Knowledge

- [LoopBack boot scripts](http://docs.strongloop.com/display/LB/Defining+boot+scripts)
- [LoopBack models](http://docs.strongloop.com/display/LB/Defining+models)
- [Loopback model relations](http://docs.strongloop.com/display/LB/Define+model+relations)
- [Creating loopback model relations](https://docs.strongloop.com/display/public/LB/Creating+model+relations)

## Procedure

### Create the application

#### Application information

- Name: `loopback-example-relations`
- Directory to contain the project: `loopback-example-relations`

```
$ lb app loopback-example-relations
... # follow the prompts
$ cd loopback-example-relations
```

### Create the datasource

- Name: `transient`
- Connector: `other`
  - Name: `transient`

```
$ lb datasource
... # follow the prompts, choose `other` to define custom connector
```

### Create the models

#### Model information

- Name: `Customer`
  - Data source: `db (memory)`
  - Base class: `PersistedModel`
  - Expose over REST: `Yes`
  - Custom plural form: *Leave blank*
  - Properties:
    - `name`
      - String
      - Not Required
    - `age`
      - number
      - Not Required
- Name: `Order`
  - Data source: `db (memory)`
  - Base class: `PersistedModel`
  - Expose over REST: `Yes`
  - Custom plural form: *Leave blank*
  - Properties:
    - `description`
      - String
      - Not Required
    - `date`
      - date
      - Not Required
- Name: `Account`
  - Data source: `db (memory)`
  - Base class: `PersistedModel`
  - Expose over REST: `No`
  - Custom plural form: *Leave blank*
  - Properties:
    - `name`
      - String
      - Not Required
    - `date`
      - date
      - Not Required
- Name: `Address`
  - Data source: `transient`
  - Base class: `Model`
  - Expose over REST: `No`
  - Custom plural form: *Leave blank*
  - Properties:
    - `street`
      - String
      - Not Required
    - `city`
      - String
      - Not Required
    - `state`
      - String
      - Not Required
    - `zipCode`
      - String
      - Not Required
- Name: `Author`
  - Data source: `db (memory)`
  - Base class: `PersistedModel`
  - Expose over REST: `No`
  - Custom plural form: *Leave blank*
  - Properties:
    - `name`
      - String
      - Not Required
- Name: `Book`
  - Data source: `db (memory)`
  - Base class: `PersistedModel`
  - Expose over REST: `Yes`
  - Custom plural form: *Leave blank*
  - Properties:
    - `name`
      - String
      - Not Required
- Name: `EmailAddress`
  - Data source: `transient`
  - Base class: `PersistedModel`
  - Expose over REST: `No`
  - Custom plural form: *Leave blank*
  - Properties:
    - `label`
      - String
      - Not Required
    - `address`
      - String
      - Not Required
- Name: `Link`
  - Data source: `transient`
  - Base class: `Model`
  - Expose over REST: `No`
  - Custom plural form: *Leave blank*
  - Properties:
    - `id`
      - number
      - Required
      > Please set `"id": true` manually for this property, like [link.json](/common/models/link.json#L8)
    - `name`
      - String
      - Not Required
    - `notes`
      - String
      - Not Required
- Name: `Reader`
  - Data source: `db (memory)`
  - Base class: `PersistedModel`
  - Expose over REST: `No`
  - Custom plural form: *Leave blank*
  - Properties:
    - `name`
      - String
      - Not Required
- Name: `Shipment`
  - Data source: `db (memory)`
  - Base class: `PersistedModel`
  - Expose over REST: `No`
  - Custom plural form: *Leave blank*
  - Properties:
    - `date`
      - Date
      - Not Required
    - `description`
      - String
      - Not Required

```
$ lb model Customer
... # follow the prompts, repeat for other models
```
> Upper-case in model's name would be interpreted as '-' in model's file name, eg: EmailAddress has `email-address.json`

### Configure server-side views

> LoopBack comes preconfigured with EJS out-of-box. This means we can use
> server-side templating by simply setting the proper view engine and a
> directory to store the views.

Create a [`views` directory](https://github.com/strongloop/loopback-example-relations/blob/master/server/views) to store server-side templates.

```
$ mkdir server/views
```

Create [`index.ejs` in the views directory](https://github.com/strongloop/loopback-example-relations/blob/master/server/views/index.ejs).
Create [`account.ejs` in the views directory](https://github.com/strongloop/loopback-example-relations/blob/master/server/views/account.ejs).
Create [`email.ejs` in the views directory](https://github.com/strongloop/loopback-example-relations/blob/master/server/views/email.ejs).
Create [`address.ejs` in the views directory](https://github.com/strongloop/loopback-example-relations/blob/master/server/views/address.ejs).

[Configure `server.js`](https://github.com/strongloop/loopback-example-relations/blob/master/server/server.js#L5-L11) to use server-side
templating. Remember to import the [`path`](https://github.com/strongloop/loopback-example-relations/blob/master/server/server.js#L3) package.

### Replace root

Replace the default `root.js` with [a new one](https://github.com/strongloop/loopback-example-relations/blob/master/server/boot/root.js) which passes a given customer's id to template engine.

### Add sample data

Create six boot scripts:

- [`sample-customers.js`](https://github.com/strongloop/loopback-example-relations/blob/master/server/boot/sample-customers.js)
- [`z-book-people.js`](https://github.com/strongloop/loopback-example-relations/blob/master/server/boot/z-book-people.js)
- [`z-customer-accounts.js`](https://github.com/strongloop/loopback-example-relations/blob/master/server/boot/z-customer-accounts.js)
- [`z-customer-address.js`](https://github.com/strongloop/loopback-example-relations/blob/master/server/boot/z-customer-address.js)
- [`z-customer-emails.js`](https://github.com/strongloop/loopback-example-relations/blob/master/server/boot/z-customer-emails.js)

> We add z- in front of the boot script names to make sure they load last since LoopBack boot loads boot scripts alphabetically.

### Create model relations

#### Model relation information

- `Customer`
  - has many
    - `Order`
      - Property name for the relation: `orders`
      - Custom foreign key: `customerId`
      - Require a through model: No
    - `Other Relations: `(please add them manually)

      ```
      "address": {
        "type": "embedsOne",
        "model": "Address",
        "property": "billingAddress",
        "options": {
          "validate": true,
          "forceId": false
        }
      },
      "emails": {
        "type": "embedsMany",
        "model": "EmailAddress",
        "property": "emailList",
        "options": {
          "validate": true,
          "forceId": false
        }
      },
      "accounts": {
        "type": "referencesMany",
        "model": "Account",
        "property": "accountIds",
        "options": {
          "validate": true,
          "forceId": false
        }
      },
      ```

- `Book`(please add them manually)

  ```
  "people": {
      "type": "embedsMany",
      "model": "Link",
      "scope": {
        "include": "linked"
      }
  }
  ```

- `Link`(please add them manually)

  ```
  "linked": {
    "type": "belongsTo",
    "polymorphic": {
      "idType": "number"
    },
    "properties": {
      "name": "name"
    },
    "options": {
      "invertProperties": true
    }
  }
  ```
- `Order`
  - belongs to
    - `Customer`
      - Property name for the relation: *Leave blank - defaults to `customer`*
      - Custom foreign key: *Leave blank*
  - has many
      - `Shipment`
        - Property name for the relation: *Leave blank - defaults to `shipments`*
        - Custom foreign key: *Leave blank*

- `Shipment`
  - belongs to
    - `Order`
      - Property name for the relation: *Leave blank - defaults to `order`*
      - Custom foreign key: *Leave blank*

```
$ lb relation
? Select the model to create the relationship from:
...
> Customer
... # follow the prompts, repeat for other models
```

> Some relations are not available in `lb`, please add them in `model-name.json` manually.
> LoopBack [automatically derives](http://docs.strongloop.com/display/LB/BelongsTo+relations#BelongsTorelations-Overview)
> relation and foreign key names when you leave the values empty.

### Try the API

Start the application with `node .` and browse to [`localhost:3000`][localhost].
You should see various links. Each endpoint is defined as follows:

#### hasMany
- [/api/customers](http://localhost:3000/api/customers)
  - List all customers
- [/api/customers/4](http://localhost:3000/api/customers/4)
  - Look up a customer by ID
- [/api/customers/youngFolks](http://localhost:3000/api/customers/youngFolks)
  - List a predefined scope named *youngFolks*
- [/api/customers/4/orders](http://localhost:3000/api/customers/4/orders)
  - List a given customer's orders
- [/api/customers?filter[include]=orders](http://localhost:3000/api/customers?filter[include]=orders)
  - List all customers including their orders
- [/api/customers?filter[include][orders]=customer](http://localhost:3000/api/customers?filter[include][orders]=customer)
  - List all customers including their orders which also include the customer
- [/api/customers?filter[include][orders]=customer&filter[where][age]=21](http://localhost:3000/api/customers?filter[include][orders]=customer&filter[where][age]=21)
  - List all customers whose age is 21, including their orders
- [/api/customers?filter[include][orders]=customer&filter[limit]=2](http://localhost:3000/api/customers?filter[include][orders]=customer&filter[limit]=2)
  - List first two customers including their orders
- [/api/customers?filter[include]=accounts&filter[include]=orders](http://localhost:3000/api/customers?filter[include]=accounts&filter[include]=orders)
  - List all customers including their accounts and orders

#### embedsOne
- [/api/customers/2/address](http://localhost:3000/api/customers/2/address)
  - List a given customer's address

#### embedsMany
- [/api/customers/3/emails](http://localhost:3000/api/customers/3/emails)
  - List a given customer's email

#### referencesMany
- [api/customers/1/accounts](http://localhost:3000/api/customers/1/accounts)
  - List all accounts owned by a given customer
- [/api/customers/1/accounts/1](http://localhost:3000/api/customers/1/accounts/1)
  - Look up a given accounts of a given customer by foreign key
- [/api/customers/1/accounts/count](http://localhost:3000/api/customers/1/accounts/count)
  - Count accounts number of a given customer

#### polymorphic embedsMany
- [/api/Books/1/people](http://localhost:3000/api/Books/1/people)
  - List the linked people of a given book
- [/api/Books/1/people/1](http://localhost:3000/api/Books/1/people/1)
  - Look up the author of a given book by foreign key
- [/api/Books/1/people/2](http://localhost:3000/api/Books/1/people/2)
  - Look up the reader of a given book by foreign key

---

[More LoopBack examples](https://loopback.io/doc/en/lb3/Tutorials-and-examples.html)
