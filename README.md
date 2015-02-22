## Run Boaster
Where you can upload GPX files and have them charted, mapped and tabled.

## Project structure
app directory = node.js and Express related code

public directory = angular.js related code

Testing uses Mocha and Superagent for the backend. Jasmine for TDD and Protractor for BDD, e2e tests.

The file structure uses a modular approach, based on features. Inside each module you'll find a test folder with the Jasmine specs for controller, services and directives.

In addition there is a e2etests module that houses the Protractor e2e tests.


## Built using Mean.JS
Mean.js is a full-stack JavaScript open-source solution.

Before you begin we recommend you read about the basic building blocks that assemble a MEAN.JS application: 
* MongoDB - Go through [MongoDB Official Website](http://mongodb.org/) and proceed to their [Official Manual](http://docs.mongodb.org/manual/), which should help you understand NoSQL and MongoDB better.
* Express - The best way to understand express is through its [Official Website](http://expressjs.com/), particularly [The Express Guide](http://expressjs.com/guide.html); you can also go through this [StackOverflow Thread](http://stackoverflow.com/questions/8144214/learning-express-for-node-js) for more resources.
* AngularJS - Angular's [Official Website](http://angularjs.org/) is a great starting point.
* Node.js - Start by going through [Node.js Official Website](http://nodejs.org/) and this [StackOverflow Thread](http://stackoverflow.com/questions/2353818/how-do-i-get-started-with-node-js), which should get you going with the Node.js platform in no time.


## Prerequisites
Make sure you have installed all these prerequisites on your development machine.
* Node.js - [Download & Install Node.js](http://www.nodejs.org/download/) and the npm package manager, if you encounter any problems, you can also use this [Github Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).
* Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages, in order to install it make sure you've installed Node.js and npm, then install bower globally using npm:

```
$ npm install -g bower
```

* Grunt - You're going to use the [Grunt Task Runner](http://gruntjs.com/) to automate your development process, in order to install it make sure you've installed Node.js and npm, then install grunt globally using npm:

```
$ sudo npm install -g grunt-cli
```

The first thing you should do is install the Node.js dependencies.

To install Node.js dependencies you're going to use npm again, in the application folder run this in the command-line:

```
$ npm install
```

This command does a few things:
* First it will install the dependencies needed for the application to run.
* If you're running in a development environment, it will then also install development dependencies needed for testing and running your application.

Next run bower

```
$ bower install
```

and run the grunt sass task to compile the sass into css.

```
$ grunt sass
```

Once this has finished you can start the default grunt task.

```
$ grunt
```

wait for the line

```
$ MEAN.JS application started on port 3000
```

Your application should run on the 3000 port so in your browser just go to [http://localhost:3000](http://localhost:3000)

That's it! your application should be running by now.



This will be a clean install so you will have to add a new user and add their GPX files.

For the e2e tests you will also need to update an end user here too.

Create an end user. Add their GPX files. Then update their username and password in public/modules/e2etests/tasks/login.js

```
var login = {
  default : function () {
    loginPage.goto();
    loginPage.formUserName.sendKeys('wgreen');
    loginPage.formPwd.sendKeys('password');
    loginPage.formSubmit.click();
  }
};
```

## Jasmine and server tests

grunt command to run the Jasmine, and server tests:

```
$ grunt test
```

## Protractor tests

Follow the instructions on setup over at the [Protractor website] (http://angular.github.io/protractor/#/).

To run protractor

In one command terminal run

```
$ webdriver-manager start
```

and in another run

```
$ protractor protractor.conf.js
```

If you would like to run a single suite, such as the top nav, you can run

```
$ protractor protractor.conf.js --suite uploadPage
```

The suites are set up in the protractor.conf.js file




## License

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
