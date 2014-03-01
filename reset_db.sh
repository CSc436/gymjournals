#!/bin/bash
#Author: Storme Briscoe
#Functionality: This script was made to drop and add the gym journals database

#Access psql and start querying
sudo psql -U postgres -h localhost -c "DROP DATABASE gymjournals;"
sudo psql -U postgres -h localhost -c "CREATE DATABASE gymjournals OWNER gymjournalsuser;"
./manage.py syncdb
