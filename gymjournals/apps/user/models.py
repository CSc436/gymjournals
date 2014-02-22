"""
Defines a user of GymJournals.
"""

from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class SiteUser(User):
    """
    first_name - User's firstname
    last_name - User's lastname
    email - A valid email
    city - User's city
    state - Two character representation of User's state
    zip_code - 5 digit number (for now)
    dob - User's dob. Year, month, day
    """
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=2)
    zip_code = models.IntegerField(max_length=5)
    dob = models.DateField()

    def __str__(self):
        """Return the email of a user"""
        return "Name: {} {}, Email: '{}'".format(
            self.first_name, self.last_name, self.email)

    def __repr__(self):
        """Return the email of a user"""
        return "User(first_name='{}', last_name='{}', email='{}')".format(
            self.first_name, self.last_name, self.email)


SiteUser._meta.get_field('first_name').null = False
SiteUser._meta.get_field('first_name').blank = False
SiteUser._meta.get_field('last_name').null = False
SiteUser._meta.get_field('last_name').blank = False
SiteUser._meta.get_field('email').null = False
SiteUser._meta.get_field('email').blank = False
