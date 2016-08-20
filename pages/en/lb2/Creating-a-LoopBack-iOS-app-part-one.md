---
title: "Creating a LoopBack iOS app: part one"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Creating-a-LoopBack-iOS-app-part-one.html
summary:
---

* Download the [server side code](https://github.com/strongloop-community/sample-applications/tree/master/BooksServer)
* Download the [iOS client application](https://github.com/strongloop-community/sample-applications/tree/master/BooksClient)

This is part one of a two-part tutorial on creating a simple iOS app that connects to a [Using LoopBack with IBM API Connect](/doc/en/lb2/Using-LoopBack-with-IBM-API-Connect.html) server application to perform create, read, update, and delete (CRUD) operations:

* Part one shows how to fetch data stored in the data source (in this case, the in-memory data source).
* [Part two](/doc/en/lb2/Creating-a-LoopBack-iOS-app-part-two.html) explains how to connect various interface elements to the app.

## Prerequisites

Before starting this tutorial:

* **Install [Apple XCode](https://developer.apple.com/xcode/)** version 5 or later.

* **Follow [Getting started with LoopBack](https://docs.strongloop.com/display/APIC/Getting+started+with+LoopBack)** to install the StrongLoop tools.
* **Download the [LoopBack iOS SDK](/doc/en/lb2/iOS-SDK.html)** and extract the contents.

## Create the LoopBack books application

Follow these steps to create a simple LoopBack Node application using the StrongLoop command-line tool, slc:

1.  Create a new application called books 

    ```shell
    $ slc loopback
    [?] Enter a directory name where to create the project: books
    [?] What's the name of your application? bookes
    ```

2.  Follow the instructions in [Create a LoopBack application](/doc/en/lb2/Creating-an-application.html) to create a model called "book" with the default properties.
    Follow the instructions in the link to the section "Defining a model manually".
3.  Run the app and load this URL in your browser to view the API explorer: [http://localhost:3000/explorer](http://0.0.0.0:3000/explorer).
4.  Add a few books to the app by running a POST request through the API Explorer. The format of JSON for the POST request is as follows: 

    ```javascript
    {
      "title": "The Godfather",
      "author": "Mario Puzo",
      "genre": "Fiction",
      "totalPages": "1000",
      "description": "Classic novel of La Cosa Nostra"
    }
    ```

## Create the iOS app

Follow these steps to create an iOS single view application:

1.  For this example you . In Xcode, choose **File > New > Project > IOS Application > Single View Application**.

2.  Name the project "Books" (or choose another name if you prefer).
    The instructions below assume the project is named "Books;" if you use a different name, then some files will be named different accordingly.

3.  Select **iPhone** as Device. Select location and create project. At this point, you should have a project created in Xcode with a bunch of default files.

4.  Add Loopback to your application:
    1.  From the LoopBack iOS SDK, drag `Loopback.Framework` to the Frameworks directory in your application.

        {% include image.html file="9830463.png" alt="" %}

    2.  Import the Loopback framework into your app. Edit `booksAppDelegate.h` and add lines 2 and 7 as shown below:

        **booksAppDelegate.h**

        ```
        #import <UIKit/UIKit.h>
        #import <LoopBack/LoopBack.h>

        @interface booksAppDelegate : UIResponder <UIApplicationDelegate>

        @property (strong, nonatomic) UIWindow *window;
        + ( LBRESTAdapter *) adapter;
        @end
        ```

        Edit` booksAppDelegate.m` to add the code in lines 3 through 11 as shown below:

        **booksAppDelegate.m**

        ```
        #import "booksAppDelegate.h"
        @implementation booksAppDelegate
        static LBRESTAdapter * _adapter = nil;
        + (LBRESTAdapter *) adapter
        {
            if ( !_adapter)
                _adapter = [LBRESTAdapter adapterWithURL:[NSURL URLWithString:@"http://localhost:3000/api/"]];
            return _adapter;
        }
        - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
        {
        ...
        ```

5.  Create the first screen for the application:
    1.  Click on **Main.storyboard** in the File Navigator to see an empty View Controller.
        Name this View Controller "Books Collection" by double clicking on it or adding a name in the **Title** field, shown highlighted in the following figure:

        {% include image.html file="9830453.png" alt="" %}

    2.  **Design the Books Collection Screen.** 
        Click on the box icon to list the Object Library items and drag a **Button** from the selection panel to the View Controller, near the bottom and centered horizontally.
        Change the **Title** field of the button from "Button" to "Refresh." 

    3.  Select and drag a **Table View** to the View Controller.
        Add a **Table View Cell** to the Table View. Click on the Table View Cell and enter "BookCell" as the **Identifier**.
        You will use this later. The View Controller should look like the screenshot below. Make sure the file hierarchy in the second panel is same as the screenshot. 

        {% include image.html file="9830454.png" alt="" %}

    4.  Connect the elements in the screen with the View Controller class:
        Select the Refresh button in your View Controller, hold Control and drag it into the `ViewController.m` right before `@end`.
        Name it "actionGetBooks" and click **Connect**, as shown below.  This will insert code that looks like this:

        ```
        - (IBAction)actionGetBooks:(id)sender {
        }
        ```

        {% include image.html file="9830451.png" alt="" %}

    5.  Define the TableView property by control-dragging into the `ViewController.h` file, as illustrated below.

        {% include image.html file="9830450.png" alt="" %}

    6.  Define `*myTable` by control-dragging into `ViewController.m`, as illustrated below.

        {% include image.html file="9830458.png" alt="" %}

    7.  Set outlets for the TableView by control-dragging them to the View Controller.
        In the second pane, right-click on Table View. Under Outlets, click on dataSource and drag it to the Books View Controller.
        Click on delegate and also drag it to the Books View Controller.

        {% include image.html file="9830455.png" alt="" %}

    8.  Implement the 'actionGetBook' function.

        * Import `AppDelegate.h` in `ViewController.m`.
        * Define the interfaces for the table.
        * Define the `getBooks` function. Refer to the comments in the code below.

            **booksViewController.h**

            ```
            #import <UIKit/UIKit.h>
            #import "booksAppDelegate.h"
            @interface ViewController : UIViewController
            @property (weak, nonatomic) IBOutlet UITableView *tableView;
            @end
            ```

            **booksViewController.m**

            ```
            #import "booksViewController.h"
            #import "booksAppDelegate.h"
            #define prototypeName @"books"

            @interface booksViewController ()
            @property (weak, nonatomic) IBOutlet UITableView * myTable;
            @property (strong, nonatomic) NSArray *tableData;
            @end

            @implementation booksViewController

            ...
            - (NSArray *) tableData
            {
                if (!_tableData)_tableData = [[NSArray alloc] init];
                return _tableData;
            }
            - (void) getBooks
            {
                //Error Block
                void (^loadErrorBlock)(NSError *) = ^(NSError *error){
                    NSLog(@"Error on load %@", error.description);
                };
                void (^loadSuccessBlock)(NSArray *) = ^(NSArray *models){
                    NSLog(@"Success count %d", models.count);
                    self.tableData = models;
                    [self.myTable reloadData];
                };
                //This line gets the Loopback model "book" through the adapter defined in AppDelegate
                LBModelRepository *allbooks = [[booksAppDelegate adapter] repositoryWithModelName:prototypeName];
                //Logic - Get all books. If connection fails, load the error block, if it passes, call the success block and pass allbooks to it.
                [allbooks allWithSuccess:loadSuccessBlock  failure:loadErrorBlock];
            };

            - (NSInteger) tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
            {
                return [self.tableData count];
            }

            // To display data in the table.
            - (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
            {
                static NSString *simpleTableIdentifier = @"BookCell";
                UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:simpleTableIdentifier];
                if (cell == nil) {
                    cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:simpleTableIdentifier];
                }
                if (  [ [[self.tableData objectAtIndex:indexPath.row] class] isSubclassOfClass:[LBModel class]])
                {
                    LBModel *model = (LBModel *)[self.tableData objectAtIndex:indexPath.row];
                    cell.textLabel.text = [[NSString alloc] initWithFormat:@"%@ by %@",
                                           [model objectForKeyedSubscript:@"title"], [model objectForKeyedSubscript:@"author"]];
                    //        cell.imageView.image = [UIImage imageNamed:@"button.png"];
                }
                return cell;
            }
            ...
            ```

         Call `getBooks` from the `actionGetBooks` function defined in step 4.c - 

        ```
        - (IBAction)actionGetBooks:(id)sender {
            [self getBooks]; 
        }
        ```

## Run the app in the simulator

At this point you should be able to build your app and get the list of books.
Build the app and run it on a simulator. Click **Refresh** and you'll see the list of books. 

{% include image.html file="9830457.png" alt="" %}

**Now continue to [Part 2](/doc/en/lb2/Creating-a-LoopBack-iOS-app-part-two.html).**