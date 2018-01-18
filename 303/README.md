# TEAM 303 (section 3 team 3)
## Christine Chen, Ryan Hughes, Ben Trapani, Michael Wang, Kathy Li Zhang

### Project Objectives
* Our team worked on improving the pension calculator for the Massachusetts Department of Treasury. Aside from incorporating a cleaner look with official branding (Mayflower), we also restructured the architecture of the legacy code for better testing, readability, and design. We went the extra mile by designing a database to handle user log-in and save user information to prepopulate the calculator.


### Documentation
* [Deployed Demo](128.31.25.128:8080)
* [Project proposal](https://docs.google.com/document/d/1fcwxTQXPjrFdmLv0QOAbYhiAm0J-O3LidKHFz-Pw2gc/edit?usp=sharing)

### Getting started:
#### System Requirements
* [npm](https://www.npmjs.com/get-npm) 
* [gradle](https://gradle.org/install/)
* [postgresql](https://www.postgresql.org/docs/9.2/static/tutorial-install.html)

#### Setting Up Project
1. Clone or download repository.
2. Run `npm install` on command line.
3. To setup the database, run the script `setup/setupDB.sh`

#### Development Environment
1. To run the project locally, on the command line run `gradle bootRunWithReload` in PensionCalculator directory. 
All modifications to templates and javascript should be reflected without redeploy by refreshing the webpage.
2. For those modifying the java components, download the spring tool suite IDE here and create a project from existing sources: https://spring.io/tools/sts. Build and test targets for the java code can be run within the IDE.

#### Using Docker
1. Install [docker](https://docs.docker.com/engine/installation/)
2. To build a docker image, run `gradle dockerImage`. 
3. Run `docker images` and identify the recently build image. Then run `docker run [imageID]` to run the container.
