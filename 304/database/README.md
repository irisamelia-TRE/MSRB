# Database

For an overview of the database structure, see the [database
overview](database-overview.md).

This folder contains a mySQL script to create the database containing mock
employee and employment data.  This script should never have to be run as the
database can be accessed via the remote server, but it is available as a backup
or if the user wishes to create a local instance of the database for
experimentation.

To access the remote database, connect to the retirement_info database using the
team AWS credentials.  The tables should then be populated in your mySQL
workbench and be ready for query.

To recreate a local instance of this database, open mySQL workbench and create a
local database.  Then, do Server -> Data Import. Then select import from
self-contained file and specify the file-path where this script is saved.  A
local instance of the database should then be created.
