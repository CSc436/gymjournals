"""
Defines a user of GymJournals.
"""

from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinLengthValidator, RegexValidator
from django.core.exceptions import ValidationError
# Create your models here.


def validate_(value):
    if len(str(value)) != 2:
        raise ValidationError('State length must be 2')


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
    city = models.CharField(
        max_length=50,
        validators=[RegexValidator(
            r'[A-Z]{1}[a-z]+',
            'City must have a capital first letter and contain only \
            alphabetic characters')])
    state = models.CharField(
        max_length=2,
        validators=[RegexValidator(
            r'[A-Z]{2}',
            'The state must be 2 upper-case letters')])
    zip_code = models.CharField(
        max_length=10,
        validators=[RegexValidator(
            r'\d{5}(-\d{4})?',
            'ZIP Code can either be ##### or #####-####')])
    dob = models.DateField()
    fields_to_serialize = ("first_name", "last_name", "email",
                           "city", "state", "zip_code", "dob")

    def save(self):
        self.clean_fields()
        super().save()

    def __str__(self):
        """Return the email of a user"""
        return "Name: {} {}, Email: '{}'".format(
            self.first_name, self.last_name, self.email
        )

    def __repr__(self):
        """Return the email of a user"""
        return "SiteUser(first_name='{}', last_name='{}', email='{}')".format(
            self.first_name, self.last_name, self.email
        )


class Workouts(models.Model):
    """
    user - Foreign key to SiteUser
    date - DateField when the user worked out
    """
    user = models.ForeignKey(SiteUser)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        """Return the User and date"""
        return "User: {}, Date: {}".format(self.user, self.date)

    def __repr__(self):
        return str(self)
