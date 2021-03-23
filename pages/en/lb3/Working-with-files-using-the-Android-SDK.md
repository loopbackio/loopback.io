---
title: "Working with files using the Android SDK"
lang: en
layout: page
toc: false
keywords: LoopBack
tags:
sidebar: lb3_sidebar
permalink: /doc/en/lb3/Working-with-files-using-the-Android-SDK.html
summary:
---

{% include warning.html content="
As a former StrongLoop Labs project, the Android SDK may lack usability, completeness, documentation, and robustness, and may be outdated. StrongLoop/IBM is no longer maintaining this project actively, however we do provide support for our paying customers through usual IBM support channels.
" %}

{% include see-also.html content="

* [Android SDK API docs](http://apidocs.loopback.io/loopback-sdk-android/api/index.html)
* [Storage component](Storage-component.html)
" %}

{% include toc.html %}

## Overview

The LoopBack Android SDK provides classes that enable apps to upload, store and retrieve files from a LoopBack application using the LoopBack Storage service.
See [Storage component](Storage-component.html) for information on how to create the corresponding LoopBack server application.

The relevant classes are:

* [`ContainerRepository`](http://apidocs.loopback.io/loopback-sdk-android/api/index.html?com/strongloop/android/loopback/ContainerRepository.html) 
  provides methods for creating and querying containers.
* [`FileRepository`](http://apidocs.loopback.io/loopback-sdk-android/api/index.html?com/strongloop/android/loopback/FileRepository.html) 
  provides methods for querying existing files and uploading new files.
* [`Container`](http://apidocs.loopback.io/loopback-sdk-android/api/index.html?com/strongloop/android/loopback/Container.html) 
  represents an instance of a server-side container and provides shortcuts for some of the `FileRepository` methods.
* [`File`](http://apidocs.loopback.io/loopback-sdk-android/api/index.html?com/strongloop/android/loopback/File.html)
  represents an instance of a server-side file, exposes additional metadata like the public URL and provides methods for downloading the file to the Android device.

{% include note.html content="

All classes are in the package `com.strongloop.android.loopback`. Since the Java platform provides a `File` class too,
you may need to use fully qualified names to tell the compiler which class you want to use in your code:

* `com.strongloop.android.loopback.File` from the LoopBack Android SDK

* `java.io.File` from the Java platform

" %}

## Working with containers

### Creating a new container

```java
ContainerRepository containerRepo = adapter.createRepository(ContainerRepository.class);

containerRepo.create("container-name", new ObjectCallback<Container>() {
    @Override
    public void onSuccess(Container container) {
        // container was created
    }

    @Override
    public void onError(Throwable error) {
       // request failed
    }
});
```

### Finding a container by name

```java
containerRepo.get("container-name", new ObjectCallback<Container>() {
    @Override
    public void onSuccess(Container container) {
        // container was found
    }

    @Override
    public void onError(Throwable error) {
       // request failed
    }
});
```

### Listing all containers

```java
containerRepo.getAll(new ListCallback<Container>() {
    @Override
    public void onSuccess(List<Container> containers) {
        // "containers" hold all items found
    }

    @Override
    public void onError(Throwable error) {
        // request failed
    }
});
```

## Working with files

All files live inside a container. The examples below assume you have a `container` object acquired by one of the methods described in the previous section.

### Listing existing files

```java
// same as container.getFileRepository().getAll(callback)
container.getAllFiles(new ListCallback<File>() {
    @Override
    public void onSuccess(List<File> files) {
        // process files
    }

    @Override
    public void onError(Throwable error) {
        // request failed
    }
});
```

### Finding a file by name

```java
// same as container.getFileRepository.get("file-name", callback)
container.getFile("file-name", new ObjectCallback<File>() {
    @Override
    public void onSuccess(File file) {
        // use the file
    }

    @Override
    public void onError(Throwable error) {
        // request failed
    }
});
```

### Uploading a local file

```java
java.io.File localFile = new java.io.File("path/to/file.txt");

// same as container.getFileRepository.upload(localFile, callback)
container.upload(localFile, new ObjectCallback<File>() {
    @Override
    public void onSuccess(File remoteFile) {
        // localFile was uploaded
        // call `remoteFile.getUrl()` to get its URL
    }

    @Override
    public void onError(Throwable error) {
        // upload failed
    }
});
```

### Uploading in-memory content

```java
String fileName = "hello.txt";
byte[] content = "Hello world".getBytes("UTF-8");
String contentType = "text/plain";

// same as container.getFileRepository().upload(fileName,...);
container.upload(fileName, content, contentType,
    new ObjectCallback<File>() {
        @Override
        public void onSuccess(File remoteFile) {
            // file was uploaded
        }

        @Override
        public void onError(Throwable error) {
            // upload failed
        }
    }
);
```

### Downloading to a local file

```java
File remoteFile; // obtained by one of the methods shown above
java.io.File localFile = new java.io.File("path/to/file.txt");

remoteFile.download(localFile, new VoidCallback() {
    @Override
    public void onSuccess() {
        // localFile contains the content
    }

    @Override
    public void onError(Throwable error) {
        // download failed
    }
});
```

### Downloading to memory

```java
File remoteFile; // obtained by one of the methods shown above

remoteFile.download(new File.DownloadCallback() {
    @Override
    public void onSuccess(byte[] content, String contentType) {
        // downloaded
    }

    @Override
    public void onError(Throwable error) {
        // download failed
    }
});
```

### Removing a remote file

```java
File remoteFile; // obtained by one of the methods shown above

remoteFile.delete(new Void() {
    @Override
    public void onSuccess() {
        // the file was deleted
    }

    @Override
    public void onError(Throwable error) {
        // request failed
    }
});
```

## Example

For example, consider an application for submitting insurance claims. 
To submit a claim, one has to attach documents proving the validity of the claim, such as pictures of the damaged property.

The LoopBack server will track claims using a `Claim` model. Supporting documents will be stored in a storage service.
There will be one container for every claim record.
The Android application will enable users to view documents attached to a claim and to attach more documents.

See [Storage component](Storage-component.html) for information on setting up the server application that uses the LoopBack storage service.

### Creating a new claim

To avoid extra checks further down the line, the app will create the container when the user enters a new claim in the system as shown below:

```java
ContainerRepository containerRepo = adapter.createRepository(ContainerRepository.class);

containerRepo.create(claim.getId().toString(), new ObjectCallback<Container>() {
    @Override
    public void onSuccess(Container container) {
        // container was created, save it
        activity.setContainer(container);
        // and continue to the next activity
    }

    @Override
    public void onError(Throwable error) {
       // request failed, report an error
    }
});
```

### Displaying  documents

To display a list of documents that are already uploaded, we need to fetch all files in the container associated with the current claim as follows:

```java
activity.getContainer().getAllFiles(new ListCallback<File>() {

    @Override
    public void onSuccess(List<File> remoteFiles) {
        // populate the UI with documents
    }

    @Override
    public void onError(Throwable error) {
        // request failed, report an error
    }
}
```

To display the document, the app downloads its content and builds a `Bitmap` object that it can display on the Android device:

```java
void displayDocument(File remoteFile) {

    file.download(new File.DownloadCallback() {
        @Override
        public void onSuccess(byte[] content, String contentType) {
            Bitmap image = BitmapFactory.decodeByteArray(content, 0, content.length);
            // display the image in the GUI
        }

        @Override
        public void onError(Throwable error) {
            // download failed, report an error
        }
    });
}
```

### Attaching a new document

To keep this example simple, we will skip details on how to take pictures in Android (for information on this, see the 
[Android Camera docs](http://developer.android.com/reference/android/hardware/Camera.html)).
Once the picture is taken, the app uploads it to the storage service and updates the list of all documents:

```java
camera.takePicture(

    null, /* shutter callback */
    null, /* raw callback */
    null, /* postview callback */
    new Camera.PictureCallback() {
        /* jpeg callback */

        @Override
        void onPictureTaken(byte[] data, Camera camera) {
            // A real app would probably ask the user to provide a file name
            String fileName = UUID.randomUUID().toString() - ".jpg";

            activity.getContainer().upload(fileName, data, "image/jpeg",
                new ObjectCallback<File>() {
                    @Override
                    public void onSuccess(File remoteFile) {
                        // Update GUI - add remoteFile to the list of documents
                    }

                    @Override
                    public void onError(Throwable error) {
                        // upload failed
                    }
                }
            );
        }
    }
);
```
