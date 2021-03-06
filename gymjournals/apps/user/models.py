"""
Defines a user of GymJournals.
"""

from math import floor
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator, MinValueValidator
from django.core.exceptions import ValidationError
from datetime import date


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
    gender = models.CharField(
        max_length=1,
        blank=False,
        null=False,
        choices=(
            ('M', 'Male'),
            ('F', 'Female')
            )
        )
    dob = models.DateField(
        blank=False,
        null=False
        )
    weight_goal = models.DecimalField(
        max_digits=4,
        decimal_places=1,
        null=True,
        blank=True,
        validators=[MinValueValidator(0)])

    @property
    def age(self):
        return ((date.today()-self.dob)/365.25).days

    @property
    def current_weight(self):
        w = (self.weight_set.filter(
            user=self).order_by('-date').first())
        return w.weight if w else 0

    fields_to_serialize = (
        "id", "username", "email", "pwd", "gender", "dob", "weight_goal"
    )

    def __str__(self):
        return "Username: {}, Email: {}".format(self.username, self.email)

    def __repr__(self):
        return str(self)

    def save(self, *args, **kwargs):
        self.clean_fields()
        super().save(*args, **kwargs)


class Weight(models.Model):
    user = models.ForeignKey(SiteUser)
    date = models.DateField(blank=False, null=False)
    weight = models.DecimalField(
        max_digits=4,
        decimal_places=1,
        null=False,
        blank=False,
        validators=[MinValueValidator(0)]
        )

    def __repr__(self):
        return ("{}: {} lbs on {}".format(self.user.username,
                self.weight, self.date))


class Workout(models.Model):
    """
    user - Foreign key to SiteUser
    date - DateField when the user worked out
    """
    user = models.ForeignKey(SiteUser)
    date = models.DateField()
    fields_to_serialize = (
        "id", "user", "date", "color",
        "description", "time"
    )
    color = models.CharField(max_length=7)
    description = models.TextField()
    duration = models.TimeField(null=True)

    def __repr__(self):
        """Return the User and date"""
        return ("Username: {}, id: {}, date: {}, description: {}".format(
                self.user.username, self.id, self.date, self.description))


class WeightExercise(models.Model):
    wkout = models.ForeignKey(Workout)
    name = models.CharField(max_length=50)
    duration = models.TimeField(null=True)

    def __str__(self):
        return ("{}: {}".format(self.wkout.user.username, self.name) +
                " for {}".format(self.duration) if self.duration else "")

    def __repr__(self):
        return str(self)


class Set(models.Model):
    ex = models.ForeignKey(WeightExercise)
    num = models.PositiveSmallIntegerField()  # the number of the set
    reps = models.PositiveSmallIntegerField(null=True)  # the number of reps
    weight = models.PositiveSmallIntegerField()  # the weight lifted

    def __repr__(self):
        return ("{}: Set {} at {} lbs".format(self.ex, self.num, self.weight) +
                (" for {} reps".format(self.reps)
                    if self.reps else ""))


class AerobicExercise(models.Model):
    wkout = models.ForeignKey(Workout)
    name = models.CharField(max_length=50)
    avg_heartrate = models.PositiveSmallIntegerField(null=True, blank=True)
    duration = models.TimeField()

    @property
    def calories_burned(self):
        if not self.avg_heartrate:
            return 0
        user = self.wkout.user
# Define four constants that are different based on user's gender.
# For use in the formula
        agem = None
        weightm = None
        hrm = None
        const = None
        if user.gender == 'M':
            agem = .2017
            weightm = .09036
            hrm = .6309
            const = 55.0969
        else:
            agem = .074
            weightm = -0.05741
            hrm = .4472
            const = 20.4022
        return floor((((user.age * agem) + (user.current_weight * weightm) +
                      (self.avg_heartrate * hrm) - const) *
                      (self.duration.hour * 60 + self.duration.minute) /
                      4.184))

    def __str__(self):
        return ("{}: {}".format(self.wkout.user.username, self.name) +
                " for {}".format(self.duration) if self.duration else "")

    def __repr__(self):
        return str(self)


class Tag(models.Model):
    user = models.ForeignKey(SiteUser)
    weight_exercise = models.ForeignKey(WeightExercise, null=True, blank=True)
    aerobic_exercise = models.ForeignKey(AerobicExercise,
                                         null=True, blank=True)
    tag = models.CharField(max_length=50,
                           validators=[RegexValidator(regex='^[\w-]+$')])

    def __repr__(self):
        return (("{}: ".format(self.weight_exercise) if self.weight_exercise
                else "") +
                ("{}: ".format(str(self.aerobic_exercise))
                    if self.aerobic_exercise
                    else "") +
                "{}".format(self.tag))

    def save(self, *args, **kwargs):
        if self.weight_exercise:
            self.full_clean(exclude=[self.aerobic_exercise])
        else:
            self.full_clean(exclude=[self.weight_exercise])
        super().save(*args, **kwargs)
