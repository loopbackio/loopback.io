// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: loopback.io-workflow-scripts
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

/**
 * Script to upload docs to Watson Discovery to power search
 * on LoopBack.io. Scripts starts with resolving Environments from Watson
 * Discovery and cascading through functions to upload.
 */

 // Imports
const DiscoveryV1 = require('ibm-watson/discovery/v1');
const fs = require('fs-extra');
const retry = require('retry');
const chalk = require('chalk');

// Create Watson Discovery Object
const discovery = new DiscoveryV1({
  version: '2018-03-05',
  username: process.env.DISCOVERY_USERNAME,
  password: process.env.DISCOVERY_PASSWORD
});

// ID's resolved by Script.
let envID = null;
let collectionID = null;
let intervalID = null;

/**
 * Getting / Cleaning Docs to Upload to Discovery
 */

// JSON Object with Docs to Upload
const files = fs.readJSONSync('_site/posts.json');

// Script Config Variables
const BATCH_TIME = 10 * 1000; // In milliseconds
const BATCH_SIZE = 21;
const minTimeout = 10 * 1000;
const maxTimeout = 20 * 1000;
let batch = 0;
let count = 0;

// Clean up the JSON -- remove non doc files
let keys = Object.keys(files);
keys.filter(key => !key.startsWith('doc-')).forEach(key => {
  delete files[key];
});
// Reload doc keys after removing the non-doc files.
keys = Object.keys(files);

console.log(`Total number of documents to upload: ${keys.length}`);

/**
 * This function gets a list of Discovery Environments. In IBM Cloud Public, 
 * there can only be one environment for the user (and a default `system` environment).
 * 
 * This sets `envID` as the environment ID (needed for further calls to the API). - It
 * filters out the `system` default environment.
 */
discovery.listEnvironments({}, function(err, data) {
  if (err) {
    console.log(`Unable to get Discovery Environment. ${err}`);
    return;
  } else {
    console.log(`Got environments.`);
    data.environments.forEach(env => {
      if (env.environment_id !== 'system') {
        envID = env.environment_id;
      }
    });

    listAndDeleteCollection(createCollection);
  }
});

/**
 * Get list of collections -- if more than 2 collections exist, delete the older
 * one and create a new one.
 */
function listAndDeleteCollection(cb) {
  discovery.listCollections({ environment_id: envID }, function(err, data) {
    if (err) {
      console.log(`Failed to fetch list of collections. ${err}`);
    } else {
      console.log(`Got a list of ${data.collections.length} collections.`);
      if (data.collections.length >= 2) {
        // Sort list of Collections so we delete the oldest one if more than 2 exist
        data.collections.sort(collectionSort);
        deleteCollection(data.collections[0].collection_id, cb);
      } else {
        if (cb) {
          return cb();
        }
      }
    }
  });
}

/**
 * Sorting a collection by creation date function.
 */
function collectionSort(a, b) {
  if (a.created < b.created) {
    return -1;
  }
  if (a.created > b.created) {
    return 1;
  }
  return 0;
}

/**
 * Creating a new Collection
 */
function createCollection() {
  const collectionName = `loopback${new Date().getTime()}`;
  console.log(collectionName);
  discovery.createCollection(
    { environment_id: envID, name: collectionName },
    function(err, data) {
      if (err) {
        console.log(`Failed to create a new collection. ${err}`);
        return;
      } else {
        collectionID = data.collection_id;
        startUpload();
      }
    }
  );
}

/**
 * Uploading of Documents to Collection
 */
function startUpload() {
  if (collectionID === null) {
    console.log('no collectionID set for upload');
  } else {
    // Call function and run it on given interval
    uploadDocs();
    intervalID = setInterval(uploadDocs, BATCH_TIME);
  }
}

/**
 * Upload each object in JSON as an individual document
 */
function uploadDocs() {
  const processKeys = keys.splice(0, BATCH_SIZE);

  if (processKeys.length == 0) {
    // No more batches to process -- clear interval
    console.log('No more batches to process.');
    clearInterval(intervalID);

    // Delete the first collection if it exists to save Document-Hours after second collection is ready
    return listAndDeleteCollection();
  } else {
    // Process interval
    batch += 1;
    console.log(`Processing batch # ${batch}`);

    processKeys.forEach(key => {
      // Set up data for upload by splitting into file and metadata.
      const data = files[key];
      const file = { text: data.text };
      const metadata = Object.assign({}, data);
      delete metadata.text;

      // Retry operation -- In case a request is rejected
      const operation = retry.operation({
        forever: true,
        minTimeout: minTimeout,
        maxTimeout: maxTimeout,
        randomize: true
      });

      // attempt to upload the file
      operation.attempt(function(currentAttempt) {
        // Upload object
        const doc = {
          environment_id: envID,
          collection_id: collectionID,
          file: Buffer.from(JSON.stringify(file)),
          metadata: metadata,
          file_content_type: 'application/json'
        };

        const fileName = chalk.blue(metadata.url);
        currentAttempt = chalk.yellow(currentAttempt);

        console.log(`Attempt # ${currentAttempt} to upload ${fileName}`);

        // Upload call
        discovery.addDocument(doc, function(dErr, dStatus) {
          if (operation.retry(dErr)) {
            console.log(
              chalk.red(
                `Attempt # ${currentAttempt} to upload ${fileName} failed. Will retry.`
              )
            );
            return;
          }

          if (dErr) {
            console.log(`Upload of document errored with: ${dErr}`);
          } else {
            count += 1;
            console.log(
              chalk.green(
                `Attempt # ${currentAttempt} to upload ${fileName} succeeded. Total upload count: ${chalk.blue(
                  count
                )}`
              )
            );
          }
        });
      });
    });
  }
}

/**
 * Delete a collection based on ID and call the callback
 * 
 * @param {*} collection_id 
 * @param {*} cb 
 */
function deleteCollection(collection_id, cb) {
  discovery.deleteCollection(
    { environment_id: envID, collection_id: collection_id },
    function(deleteErr, deleteData) {
      if (deleteErr) {
        console.log(`Delete collection failed. ${deleteErr}`);
        return;
      } else {
        console.log(`Collection deletion successful.`);
        if (cb) {
          return cb();
        }
      }
    }
  );
}
