# Calculator Backend

## Structure of the Backend

`/calculate` handles the calculation of retirement benefits, expecting a JSON
serialized `CalculatorInput` class and returning a `CalculatorResult`.

`/database` handles the communication between the frontend and the database.

## Running the Backend

Dependencies:
* Java 8
* Maven 3.3+
* Bash 4+

It may also be helpful to install jq,
a very popular tool for viewing and transforming JSON on the comand line.

Get WildFly:
``` shell
wget http://download.jboss.org/wildfly/11.0.0.CR1/wildfly-11.0.0.CR1.tar.gz
tar -xf wildfly-11.0.0.CR1.tar.gz
```

Add an environment variable `WILDFLY_HOME` 
pointing to the unpacked WildFly directory.


Run the backend:

``` shell
cd backend/
./start-backend.sh
```

Test that it's running for sure.

``` shell
curl -XGET localhost:8080/backend/calculate?test_response | jq
curl -XGET localhost:8080/backend/calculate?test_input | jq
```

The test input/response above also serve as prototypes for the JSON expected and
returned by the backend.

## Code Coverage

In order to view the code coverage statistics,
run `mvn clean verify`
and then open `target/site/jacoco/index.html`.
