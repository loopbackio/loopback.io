---
title: "Creating a LoopBack iOS app: part two"
lang: en
layout: page
keywords: LoopBack
tags:
sidebar: lb2_sidebar
permalink: /doc/en/lb2/Creating-a-LoopBack-iOS-app-part-two.html
summary:
---

**NOTE**: This article is outdated and is not included in doc navigation.

* Download the [server side code](https://github.com/strongloop-community/sample-applications/tree/master/BooksServer)
* Download the [iOS client application](https://github.com/strongloop-community/sample-applications/tree/master/BooksClient)

This is the second of a two-part tutorial on creating a simple iOS app that connects to a LoopBack server application to perform create, read, update, and delete (CRUD) operations.

If you haven't already done so, read [part one](/doc/{{page.lang}}/lb2/Creating-a-LoopBack-iOS-app%3A-part-one) before continuing.

## Add navigation control

To add a navigation control to your app:

1.  Select Books Collection View Controller.
2.  Click **Editor > Embed In > Navigation Controller**.
    This will add a Navigation Item under the Books Collection View Controller, as shown below.
3.  Select the new Navigation Item and name it "Books Collection" in the attribute inspector.
    {% include image.html file="9830436.png" alt="" %}

## Implement the Add Book interface

To add the interface elements that enable a user to add a book:

1.  From the object library in lower right corner of the XCode window, select **Bar Button** Item.
2.  Drag and drop it to the top right corner of the app shown in the XCode storyboard.
3.  In the attribute inspector change **Identifier** to **Add**, as shown below.
4.  Right click the Add bar button and Control-drag the circle next to action to the Books Collection View Controller.
    Select 'modal' as action.
    {% include image.html file="9830447.png" alt="" %} 

### Add another View Controller

When the user clicks the "-" button you want the app to show a screen to add a book to the collection. To do that you need to add another View Controller:

1.  Drag a **View Controller** element from the Object Library into the storyboard.
2.  Name this View Controller "Add Book".
    {% include image.html file="9830442.png" alt="" %} 
3.  Now connect the "-" button from the Books Collection View Controller to this screen:
    Control-drag the "-" button from the **Books Collection View Controller** to the** Add Books View Controller**.
    This creates a segue. 
4.  Select **modal** as segue type. 
5.  Implement the segue action by adding the following code to `ViewController.m`:

    **ViewController.m**

    ```
    ...
    @implementation ViewController 
    //Add these 3 lines
    - (IBAction)unwindToList:(UIStoryboardSegue *)segue
    {
    }
    ...
    - (void)viewDidLoad
    ```

### Add navigation to View Controller

Now add navigation to the "Add Books" View Controller as follows:

1.  Select the **Add Book View Controller**.
2.  Choose **Editor > Embed In > Navigation Controller**.
3.  Name this Navigation Controller "AddBook".

### Add elements to Add Books sceen

Add a Done and Cancel button to the Add Books screen as follows:

1.  In the **AddBook** scene, select **Navigation Item**.
2.  In the Object Library, drag and drop two **Bar Button Items** to the scene.
3.  Select each Bar Button Item and in the attribute inspector change their identifiers to "Done" and "Cancel".
4.  Control-drag the **Done** button to the green exit button below the View Controller. 
5.  Select **unwindToList** as **Segue Action**. 
6.  Repeat the above two steps for the **Cancel** button.
    {% include image.html file="9830446.png" alt="" %} 

### Add new class files

Add a new class for the Add Book ViewController as follows:

1.  In the XCode menu, choose **File > New > File...**.
2.  Select **Objective-C class** and click **Next**.
3.  In the **Choose options for your new file** screen, change **Class name** to "AddNewBookViewController."
4.  Click **Create** to add two new files to your project: `AddNewBookViewController.h` and `AddNewBookViewController.m`.

### Connect class to View Controller

Connect the AddNewBookViewController class to the View Controller for Add New Book.

{% include image.html file="9830439.png" alt="" %}

Add Text Fields from the Object Library to the Add View Screen. Add one Text Field for each of the five properties: title, author, description, totalPages and genre.
Your screen should look like the screenshot below:

{% include image.html file="9830445.png" alt="" %}

To connect the Text fields to your view controller:

1.  Select the **Title** text field in your storyboard.
2.  Control-drag from the text field on your canvas to the code displayed in the editor on the right,
    stopping at the line just below the `@interface` line in `AddNewBookViewController`.m```.`

In the dialog that appears, for Name, type "titleField."

Leave the rest of the options as they are. Your screen should look like this:

{% include image.html file="9830444.png" alt="" %}

Do the same for the other text fields.

To connect the Done button to your view controller:

1.  Select the Done button in your storyboard.

2.  Control-drag from the Done button on your canvas to the code display in the editor on the right,
    stopping the drag at the line just below your `textField` properties in `AddNewBookViewController`.m``.

3.  In the dialog that appears, for Name, type "doneButton."

    Leave the rest of the options as they are. Your dialog should look like this:
    {% include image.html file="9830438.png" alt="" %}

Now add functionality to the class to save the book when the user adds one: 

**AddNewBookViewController.h**

```
#import <UIKit/UIKit.h>
#import "ViewController.h"
...
```

**AddNewBookViewController.m**

```
#import "AddNewBook.h"
#import "ViewController.h"
#define prototypeName @"books"
@interface AddNewBook ()
@property (weak, nonatomic) IBOutlet UITextField *titleField;
@property (weak, nonatomic) IBOutlet UITextField *authorField;
@property (weak, nonatomic) IBOutlet UITextField *genreField;
@property (weak, nonatomic) IBOutlet UITextField *descriptionField;
@property (weak, nonatomic) IBOutlet UITextField *totalPagesField;
@property (weak, nonatomic) IBOutlet UIBarButtonItem *doneButton;
@end
@implementation AddNewBookViewController

- (void) prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    void (^saveNewErrorBlock)(NSError *) = ^(NSError *error){
        NSLog(@"Error on save %@", error.description);
    };
    void (^saveNewSuccessBlock)() = ^(){
        UIAlertView *messageAlert = [[UIAlertView alloc]initWithTitle:@"Successfull!" message:@"You have add a new book" delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil];
        [messageAlert show];
    };
    if (sender != self.doneButton) return;
    if (self.titleField.text.length > 0) {
        NSLog(@"%@",self.titleField.text);
        LBModelRepository *newBook = [[AppDelegate adapter] repositoryWithModelName:prototypeName];
        //create new LBModel of type
        LBModel *model = [newBook modelWithDictionary:@{
                                                        @"title"        : self.titleField.text,
                                                        @"author"       : self.authorField.text,
                                                        @"genre"        : self.genreField.text,
                                                        @"totalPages"   : self.totalPagesField.text,
                                                        @"description"  : self.descriptionField.text
                                                        }];
        [model saveWithSuccess:saveNewSuccessBlock failure:saveNewErrorBlock];
    }
    else {
        UIAlertView *messageAlert = [[UIAlertView alloc]initWithTitle:@"Missing Book Title!" message:@"You have to enter a book title." delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil];
        [messageAlert show];
    }
}
....(ctd)
```

Run the build and try it out. You should be able to add a new book and refresh to fetch all books.
