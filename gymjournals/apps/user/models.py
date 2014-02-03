"""
Defines a user of GymJournals.
"""

from django.db import models

# Create your models here.


class User(models.Model):
    """
    username - Their username
    email - A valid email
    """
    username = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)

    def __str__(self):
        """Return the name and email of a user"""
        return "Username: '{}' Email: '{}'".format(self.username, self.email)

    def __repr__(self):
        """Return the name and email of a user"""
        return "User(username='{}', email='{}')".format(
            self.username, self.email)
