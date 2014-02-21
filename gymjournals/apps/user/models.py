"""
Defines a user of GymJournals.
"""

from django.db import models
from localflavor.us.forms import USStateField, USZipCodeField
from django.contrib.auth.models import User
# Create your models here.


class SiteUser(User):
    """
    email - A valid email
    hashed_password - The user's hashed password
    """
    user_info = models.OneToOneField('UserInfo')
    

    def __str__(self):
        """Return the email of a user"""
        return "Email: '{}'".format(self.email)

    def __repr__(self):
        """Return the email of a user"""
        return "User(email='{}')".format(self.email)

SiteUser._meta.get_field('first_name').null=False
SiteUser._meta.get_field('first_name').blank=False
SiteUser._meta.get_field('last_name').null=False
SiteUser._meta.get_field('last_name').blank=False
SiteUser._meta.get_field('email').null=False
SiteUser._meta.get_field('email').blank=False


class UserInfo(models.Model):
    email = models.ForeignKey(SiteUser, primary_key=True)
    city = models.CharField(max_length=50)
    state = USStateField()
    zip_code = USZipCodeField()
    dob = models.DateField()


