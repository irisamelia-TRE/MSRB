### Prerequisites

* [Node.js][node]

### Dependencies

We have two kinds of dependencies in this project: tools and Angular framework
code. The tools help us manage and test the application.

* Tools are installed via `npm`, the [Node package manager][npm].
* Angular is installed via `bower`, a [client-side code package manager][bower].
* In order to run the end-to-end tests, you will also need to have the [Java
  Development Kit (JDK)][jdk] installed on your machine. Check out the section
  on [end-to-end testing](#e2e-testing) for more info.

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

### Run the Application

To start the server:

```
npm start
```

Now browse to the app at `localhost:8000/`.


## Directory Layout

```
app/                    --> all of the source files for the application
  views/                --> the view templates and corresponding controllers
    disclaimer/           --> the results view template and logic
      index.html            --> the partial template
      index.js              --> the controller logic
    form/                 --> the form view template and logic
      index.html            --> the partial template
      index.js              --> the controller logic
    results/              --> the results view template and logic
      index.html            --> the partial template
      index.js              --> the controller logic
  app.js                --> main application module
  index.html            --> main template file
```

## Updating Angular

Since the Angular framework library code and tools are acquired through package
managers (npm and bower) you can use these tools to easily update the
dependencies. Simply run the preconfigured script:

```
npm run update-deps
```

This will call `npm update` and `bower update`, which in turn will find and
install the latest versions that match the version ranges specified in the
`package.json` and `bower.json` files respectively.


## Serving the Application Files

### Running the App during Development

You can run the local development web server with `npm start`, which uses an npm tool called http-server.

Alternatively, you can choose to configure your own web server, such as Apache
or Nginx. Just configure your server to serve the files under the `app/`
directory.

### Deployment

See the deploy [directory][deploy] for instructions.


[deploy]: ../deploy/
[angularjs]: https://angularjs.org/
[bower]: http://bower.io/
[git]: https://git-scm.com/
[http-server]: https://github.com/indexzero/http-server
[jasmine]: https://jasmine.github.io/
[jdk]: https://wikipedia.org/wiki/Java_Development_Kit
[jdk-download]: http://www.oracle.com/technetwork/java/javase/downloads
[karma]: https://karma-runner.github.io/
[local-app-url]: http://localhost:8000/index.html
[node]: https://nodejs.org/
[npm]: https://www.npmjs.org/
[protractor]: http://www.protractortest.org/
[selenium]: http://docs.seleniumhq.org/
[travis]: https://travis-ci.org/
[travis-docs]: https://docs.travis-ci.com/user/getting-started
