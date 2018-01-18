

## How to deploy the code
1. Download the PEM file for logging onto the EC2 instance. This can be obtained
   from your AWS console.
2. Set the environment variable `T304_AWS_PEM_PATH` to the location of the PEM
   file.
3. Navigate to the `deploy` directory in the project.
4. To deploy the backend, run `./deploy_backend.sh`. To deploy the frontend, run
   `./deploy_frontend.sh`. To deploy both, run `./deploy.sh`.

## How to setup the EC2 instance
1. Create an EC2 instance

    In the AWS management console: EC2 > Launch Instance > Amazon Linux > Review
    and Launch > Launch Instances

2. Install JDK
   1.8. [Instructions](https://serverfault.com/questions/664643/how-can-i-upgrade-to-java-1-8-on-an-amazon-linux-server)

    The commands we ran on our EC2 instance:
    ```
    sudo yum install java-1.8.0
    sudo yum remove java-1.7.0-openjdk
    sudo yum install java-1.8.0-openjdk-devel.x86_64java
    ```

3. Install
   WildFly. [Instructions](https://docs.jboss.org/author/display/WFLY8/Getting+Started+Guide#GettingStartedGuide-Installation)

    The commands we ran on our EC2 instance:
    ```
    wget http://download.jboss.org/wildfly/11.0.0.CR1/wildfly-11.0.0.CR1.tar.gz
    tar -xf wildfly-11.0.0.CR1.tar.gz
    ```
    Add `WILDFLY_HOME="~/wildfly-11.0.0.CR1"` to /etc/environment

3. Install Maven. [Instructions](https://maven.apache.org/install.html)

    The commands we ran on our EC2 instance:
    ```
    wget http://apache.mirrors.lucidnetworks.net/maven/maven-3/3.5.2/binaries/apache-maven-3.5.2-bin.tar.gz
    tar xzvf apache-maven-3.5.2-bin.tar.gz
    ```
    Add `PATH="/usr/local/bin:/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/sbin:/opt/aws/bin:/home/ec2-user/.local/bin:/home/ec2-user/bin:/home/ec2-user/apache-maven-3.5.2/bin"` to /etc/environment

4. Install Node and
   npm. [Instructions](http://blog.teamtreehouse.com/install-node-js-npm-linux)

    The commands we ran on our EC2 instance:
    ```
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
    . ~/.nvm/nvm.sh
    nvm install 6.11.5
    ```
