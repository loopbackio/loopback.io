---
title: "Create new models"
lang: en
layout: page
toc: false
keywords: LoopBack
tags: [getting_started]
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Create-new-models.html
summary: Creating models with the model generator is quick and easy.

---

{% include content/gs-prereqs.html two="true" lang=page.lang %}

Recall in [Create a simple API](Create-a-simple-API) step of [Getting started](Getting-started-with-LoopBack) you created a CoffeeShop model.

Now you're going to create two new models, Review and Reviewer, with the [model generator](Model-generator).

{% include note.html content="
If you followed the previous step in the tutorial, go to [Define the Review model](#define-the-review-model).

If you're just jumping in, follow the steps below to catch up...
" %}

Get the app (in the state following the last article) from GitHub and install all its dependencies:

```
$ git clone https://github.com/strongloop/loopback-getting-started-intermediate.git
$ cd loopback-getting-started-intermediate
$ git checkout step1
$ npm install
```

## Define the Review model

Enter:

```
$ lb model
```

When prompted, enter or select the following:

*   **Model name**: Review
*   **Data source**: mongoDs (mongodb)
*   **Base class**: Use the down-arrow key to select **PersistedModel**.
*   **Expose Review via the REST API?** Press RETURN to accept the default, Yes.
*   **Custom plural form (used to build REST URL)**:  Press RETURN to accept the default, Yes.
*   **Common model or server only**: Press RETURN to accept the default, common model.

Then, follow the prompts to add these properties:

<table>
  <thead>
    <tr>
      <th>Property name</th>
      <th>Property type</th>
      <th>Required?</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>date</td>
      <td>date</td>
      <td>y</td>
    </tr>
    <tr>
      <td>rating</td>
      <td>number</td>
      <td>n</td>
    </tr>
    <tr>
      <td>comments</td>
      <td>string</td>
      <td>y</td>
    </tr>
  </tbody>
</table>

To exit the model generator, press RETURN when prompted for property name.

## Define the Reviewer model

Enter:

```
apic create --type model
```

Or with LoopBack tools:

```
$ lb model
```

When prompted, enter or select the following:

*   **Model name**: Reviewer
*   **Data source**: mongoDs (mongodb)
*   **Base class**: Use the down-arrow key to select **User**.
*   ****Expose Reviewer via the REST API?**** Press RETURN to accept the default, Yes.
*   **Custom plural form (used to build REST URL)**:  Press RETURN to accept the default, Yes.
*   **Common model or server only**: Press RETURN to accept the default, common model.

Don't add any properties, since they are all inherited from the base User model.

To exit the model generator, press RETURN when prompted for property name.

## Update boot script to add data 

Recall back in part I of [Getting started](Getting-started-with-LoopBack), you [added a boot script](Connect-your-API-to-a-data-source.html#add-some-test-data-and-view-it) to create a database table from the model (via auto-migration) and add some data to the database.

Now that you have some new models and a new data source, you need to update this script so it will create data structures in MongoDB and insert data via the new models.

**Copy and paste the code below** into `server/boot/create-sample-models.js`, replacing the existing code.

Then run

```
$ npm install --save async
```

This boot script has several functions:

*   `createCoffeeShops()` creates a MySQL table for the CoffeeShop model and adds data to the table.  This is what the `create-sample-models.js` script from [Getting started](Getting-started-with-LoopBack) did.
*   `createReviewers()` creates the Reviewer data structure in MongoDB using auto-migration and adds data to it.  
*   `createReviews()` creates the Reviews data structure in MongoDB using auto-migration and adds data to it.

See [Creating a database schema from models](Creating-a-database-schema-from-models) for more information on auto-migration. 

{% include code-caption.html content="server/boot/create-sample-models.js" %}
```javascript
var async = require('async');
module.exports = function(app) {
  //data sources
  var mongoDs = app.dataSources.mongoDs; // 'name' of your mongo connector, you can find it in datasource.json
  var mysqlDs = app.dataSources.mysqlDs;
  //create all models
  async.parallel({
    reviewers: async.apply(createReviewers),
    coffeeShops: async.apply(createCoffeeShops),
  }, function(err, results) {
    if (err) throw err;
    createReviews(results.reviewers, results.coffeeShops, function(err) {
      console.log('> models created sucessfully');
    });
  });
  //create reviewers
  function createReviewers(cb) {
    mongoDs.automigrate('Reviewer', function(err) {
      if (err) return cb(err);
      var Reviewer = app.models.Reviewer;
      Reviewer.create([{
        email: 'foo@bar.com',
        password: 'foobar'
      }, {
        email: 'john@doe.com',
        password: 'johndoe'
      }, {
        email: 'jane@doe.com',
        password: 'janedoe'
      }], cb);
    });
  }
  //create coffee shops
  function createCoffeeShops(cb) {
    mysqlDs.automigrate('CoffeeShop', function(err) {
      if (err) return cb(err);
      var CoffeeShop = app.models.CoffeeShop;
      CoffeeShop.create([{
        name: 'Bel Cafe',
        city: 'Vancouver'
      }, {
        name: 'Three Bees Coffee House',
        city: 'San Mateo'
      }, {
        name: 'Caffe Artigiano',
        city: 'Vancouver'
      }, ], cb);
    });
  }
  //create reviews
  function createReviews(reviewers, coffeeShops, cb) {
    mongoDs.automigrate('Review', function(err) {
      if (err) return cb(err);
      var Review = app.models.Review;
      var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
      Review.create([{
        date: Date.now() - (DAY_IN_MILLISECONDS * 4),
        rating: 5,
        comments: 'A very good coffee shop.',
        publisherId: reviewers[0].id,
        coffeeShopId: coffeeShops[0].id,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 3),
        rating: 5,
        comments: 'Quite pleasant.',
        publisherId: reviewers[1].id,
        coffeeShopId: coffeeShops[0].id,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 2),
        rating: 4,
        comments: 'It was ok.',
        publisherId: reviewers[1].id,
        coffeeShopId: coffeeShops[1].id,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS),
        rating: 4,
        comments: 'I go here everyday.',
        publisherId: reviewers[2].id,
        coffeeShopId: coffeeShops[2].id,
      }], cb);
    });
  }
};
```

{% include next.html content="[Define model relations](Define-model-relations.html)" %}
