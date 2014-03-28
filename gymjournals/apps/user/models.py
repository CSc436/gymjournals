"""
Defines a user of GymJournals.
"""

from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError


def validate_(state):
    """Make sure states are of length 2

    Args:
        state: A string of the state name
    """
    if len(str(state)) != 2:
        raise ValidationError('State length must be 2')


class SiteUser(models.Model):
    username = models.CharField(
        max_length=30,
        blank=False,
        null=False,
        unique=True)
    email = models.EmailField(
        unique=True,
        blank=False,
        null=False)
    pwd = models.CharField(
        max_length=30,
        blank=False,
        null=False)
    fields_to_serialize = (
        "id", "username", "email", "pwd"
    )

    def __str__(self):
        return "Username: {}, Email: {}".format(self.username, self.email)

    def __repr__(self):
        return str(self)

    def save(self, *args, **kwargs):
        self.clean_fields()
        super().save(*args, **kwargs)


class Workout(models.Model):
    """
    user - Foreign key to SiteUser
    date - DateField when the user worked out
    """
    user = models.ForeignKey(SiteUser)
    date = models.DateField()
    fields_to_serialize = (
        "id", "user", "date", "tag", "color",
        "description", "time"
    )
    tag = models.CharField(max_length=50)
    color = models.CharField(max_length=6)
    description = models.TextField()
    duration = models.TimeField(null=True)

    def __repr__(self):
        """Return the User and date"""
        return str(self.__dict__)


class WeightExercise(models.Model):
    wkout = models.ForeignKey(Workout)
    name = models.CharField(max_length=50)
    min_weight = models.PositiveSmallIntegerField()
    max_weight = models.PositiveSmallIntegerField(null=True, blank=True)
    num_sets = models.PositiveSmallIntegerField(default=1)
    num_reps = models.PositiveSmallIntegerField(default=1)
    duration = models.TimeField(null=True)

    def __str__(self):
        return ("{}: {} {}x{} at {}".format(self.wkout.user.username,
                self.name, self.num_sets, self.num_reps, self.min_weight) +
                ("-{}".format(self.max_weight) if self.max_weight else "") +
                " lbs." +
                (" for {}".format(self.duration) if self.duration else ""))

    def __repr__(self):
        return str(self)
