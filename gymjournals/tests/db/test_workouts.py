import pytest
from imports import *


def create_user(u_email, u_username, u_pwd, u_dob, u_gender):
    '''
    Utility function that creates user information
    so a test is able to add/change info along with
    adding it to the test database.
    '''
    new_user = SiteUser(email=u_email, username=u_username, pwd=u_pwd)
    new_user.gender = u_gender
    new_user.dob = u_dob
    return new_user


def create_workout(u_user, u_date):
    '''
    Utility function that creates a workout based
    on passed in information
    '''
    new_workout = Workout(user=u_user, date=u_date)
    return new_workout


def create_weight_exercise(u_name, u_duration):
    '''
    Utility function that creates a weight excercise
    on passed in information
    '''
    new_wex = WeightExercise(name=u_name, duration=u_duration)
    return new_wex


@pytest.mark.django_db
def test_repr_workout():
    '''
    This test case ensures that repr is
    working for a user's workout set
    '''
    new_user = create_user('blah@email.com', 'blah', 'la',
                           date.today(), 'M')
    new_user.save()
    new_w = create_workout(new_user, date.today())
    new_w.save()

    assert (str(new_user.workout_set.all()) == '[Username: blah, id: ' +
            str(new_w.id) + ', date: ' + str(date.today()) +
            ', description: ]')


@pytest.mark.django_db
def test_repr_weight_exercise():
    '''
    This test case ensures that repr is
    working for a user's weight excercise
    '''
    user = create_user('blah@email.com', 'blah', 'la',
                       date.today(), 'M')
    user.save()
    workout = create_workout(user, date.today())
    workout.save()

    wex = create_weight_exercise('bench', time(minute=15))
    wex.wkout = workout
    wex.save()

    ls_ex = user.workout_set.all()[0].weightexercise_set.all()[0]

    assert ls_ex.__repr__() == "blah: bench for 00:15:00"


@pytest.mark.django_db
def test_repr_aerobic_exercise():
    '''
    This test case ensures that repr is
    working for a user's aerobic exercise
    '''
    user = create_user('blah@email.com', 'blah', 'la',
                       date.today(), 'M')
    user.save()
    workout = create_workout(user, date.today())
    workout.save()

    aer = AerobicExercise(name='Running', duration=time(minute=15))
    aer.wkout = workout
    aer.save()

    ls_aer = user.workout_set.all()[0].aerobicexercise_set.all()[0]

    assert ls_aer.__repr__() == "blah: Running for 00:15:00"


@pytest.mark.django_db
def test_aero_calories_male():
    '''
    This test case ensures the calorie burning
    method is working properly
    '''
    user = create_user('blah@email.com', 'blah', 'la',
                       date.today(), 'M')
    user.save()
    workout = create_workout(user, date.today())
    workout.save()

    aer = AerobicExercise(name='Running', duration=time(minute=15),
                          avg_heartrate=150)
    aer.wkout = workout
    aer.save()

    ls_aer = user.workout_set.all()[0].aerobicexercise_set.all()[0]
    cal_burned = ls_aer.calories_burned
    assert cal_burned == 141


@pytest.mark.django_db
def test_aero_calories_female():
    '''
    This test case ensures the calorie burning
    method is working properly, so the calories
    here should be different from the above method
    '''
    user = create_user('blah@email.com', 'blah', 'la',
                       date.today(), 'F')
    user.save()
    workout = create_workout(user, date.today())
    workout.save()

    aer = AerobicExercise(name='Running', duration=time(minute=15),
                          avg_heartrate=150)
    aer.wkout = workout
    aer.save()

    ls_aer = user.workout_set.all()[0].aerobicexercise_set.all()[0]
    cal_burned = ls_aer.calories_burned
    assert cal_burned == 167


@pytest.mark.django_db
def test_aero_calories_zero():
    '''
    This test case ensures the calorie burning
    method is working properly when no heartrate
    is passed in
    '''
    user = create_user('blah@email.com', 'blah', 'la',
                       date.today(), 'M')
    user.save()
    workout = create_workout(user, date.today())
    workout.save()

    aer = AerobicExercise(name='Running', duration=time(minute=15))
    aer.wkout = workout
    aer.save()

    ls_aer = user.workout_set.all()[0].aerobicexercise_set.all()[0]
    cal_burned = ls_aer.calories_burned
    assert cal_burned == 0


@pytest.mark.django_db
def test_str_weight_exercise():
    '''
    This test case ensures that str is
    working for a user's weight exercise
    '''
    user = create_user('blah@email.com', 'blah', 'la',
                       date.today(), 'M')
    user.save()
    workout = create_workout(user, date.today())
    workout.save()

    wex = create_weight_exercise('bench', time(minute=15))
    wex.wkout = workout
    wex.save()

    ls_ex = user.workout_set.all()[0].weightexercise_set.all()[0]

    assert str(ls_ex) == "blah: bench for 00:15:00"


@pytest.mark.django_db
def test_set_repr():
    '''
    This test case ensures that repr is
    working for the class Set
    '''
    user = create_user('blah@email.com', 'blah', 'la',
                       date.today(), 'M')
    user.save()
    workout = create_workout(user, date.today())
    workout.save()

    wex = create_weight_exercise('bench', time(minute=15))
    wex.wkout = workout
    wex.save()

    ls_ex = user.workout_set.all()[0].weightexercise_set.all()[0]

    # Create a set for the weight exercise
    we_set = Set(ex=ls_ex, weight=100, num=3, reps=20)
    we_set.save()

    assert (repr(ls_ex.set_set.first()) == "blah: bench for 00:15:00: " +
            "Set 3 at 100 lbs for 20 reps")


@pytest.mark.django_db
def test_Tag_save_with_weight_exercise():
    blah = create_user('blah@email.com', 'blah', 'la',
                       date.today(), 'M')
    blah.save()
    workout = create_workout(blah, date.today())
    workout.save()

    wex = create_weight_exercise('Pec Fly', time(minute=20))
    wex.wkout = workout
    wex.save()

    t = Tag(user=blah, weight_exercise=wex, tag='Chest')
    t.save()


@pytest.mark.django_db
def test_Tag_save_with_aerobic_exercise():
    blah = create_user('blah@email.com', 'blah', 'la',
                       date.today(), 'M')
    blah.save()
    workout = create_workout(blah, date.today())
    workout.save()

    aex = AerobicExercise()
    aex.wkout = workout
    aex.name = 'Swimming'
    aex.duration = time(minute=30)
    aex.save()

    t = Tag(user=blah, aerobic_exercise=aex, tag='Chest')
    t.save()


@pytest.mark.django_db
def test_Tag_repr_when_no_parent_exercise():
    '''
    This tests that the result of a repr call on
    a Tag object that has not been given a parent
    weight or aerobic exercise will just be the
    tag itself
    '''
    t = Tag()
    t.tag = 'GETFIT'

    assert repr(t) == 'GETFIT'


@pytest.mark.django_db
def test_Tag_repr_with_weight_exercise_parent():
    '''
    This tests the result of a repr call on
    a Tag object that has a weight_exercise foreign key
    '''
    blah = create_user('blah@email.com', 'blah', 'la',
                       date.today(), 'M')
    blah.save()
    workout = create_workout(blah, date.today())
    workout.save()

    wex = create_weight_exercise('Pec Fly', time(minute=20))
    wex.wkout = workout
    wex.save()

    t = Tag(user=blah, weight_exercise=wex, tag='Chest')
    t.save()

    assert repr(t) == 'blah: Pec Fly for 00:20:00: Chest'


@pytest.mark.django_db
def test_Tag_repr_with_aerobic_exercise_parent():
    '''
    This tests the result of a repr call on a Tag
    object that has an aerobic_exercise foreign key
    '''
    blah = create_user('blah@email.com', 'blah', 'la',
                       date.today(), 'M')
    blah.save()
    workout = create_workout(blah, date.today())
    workout.save()

    aex = AerobicExercise()
    aex.wkout = workout
    aex.name = 'Swimming'
    aex.duration = time(minute=30)
    aex.save()

    t = Tag(user=blah, aerobic_exercise=aex, tag='Full-body')
    t.save()

    assert repr(t) == 'blah: Swimming for 00:30:00: Full-body'
