import pytest
from django.db import IntegrityError
from imports import *
import decimal


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


def create_weight(param_user, param_date, param_weight):
    return Weight(user=param_user, date=param_date, weight=param_weight)


@pytest.mark.django_db
def test_default_state():
    '''
    This test case tests that the db is empty on start
    '''
    object_len = SiteUser.objects.all()
    assert len(object_len) == 0


@pytest.mark.django_db
def test_user_information():
    '''
    This tests that a users information is
    truly what it was set at
    '''
    jesse = create_user("jbright@email.com", "jbright", "lol",
                        date.today(), 'M')
    assert jesse.email == 'jbright@email.com'
    assert jesse.username == 'jbright'
    assert jesse.pwd == 'lol'
    assert jesse.gender == 'M'
    assert jesse.dob == date.today()


@pytest.mark.django_db
def test_user_cant_save_no_info():
    '''
    Test that a SiteUser with not enough information
    cannot be saved
    '''
    blank_everything = create_user("", "", "", date.today(), "")

    with pytest.raises(ValidationError) as excinfo:
        blank_everything.save()

    object_len = SiteUser.objects.all()
    assert len(object_len) == 0


@pytest.mark.django_db
def test_user_cant_save_no_email():
    '''
    Test that a SiteUser with no email cannot
    be saved
    '''
    blank_email = create_user("", "blah", "bleh", date.today(), 'M')

    with pytest.raises(ValidationError) as excinfo:
        blank_email.save()

    object_len = SiteUser.objects.all()
    assert len(object_len) == 0


@pytest.mark.django_db
def test_user_cant_save_no_username():
    '''
    Test that a SiteUser with no username cannot
    be saved
    '''
    blank_email = create_user("blah", "", "bleh", date.today(), 'M')

    with pytest.raises(ValidationError) as excinfo:
        blank_email.save()

    object_len = SiteUser.objects.all()
    assert len(object_len) == 0


@pytest.mark.django_db
def test_user_cant_save_no_pwd():
    '''
    Test that a SiteUser with no pwd cannot
    be saved
    '''
    blank_email = create_user("blah", "bleh", "", date.today(), 'M')

    with pytest.raises(ValidationError) as excinfo:
        blank_email.save()

    object_len = SiteUser.objects.all()
    assert len(object_len) == 0


@pytest.mark.django_db
def test_user_cant_save_no_gender():
    '''
    Test that a SiteUser with no gender
    cannot be saved
    '''
    blank_gender = create_user("blah", "bleh", "lalala", date.today(), "")

    with pytest.raises(ValidationError) as excinfo:
        blank_gender.save()

    object_len = SiteUser.objects.all()
    assert len(object_len) == 0


@pytest.mark.django_db
def test_user_cant_save_no_dob():
    '''
    Test that a SiteUser with no DOB cannot
    be saved
    '''
    blank_dob = create_user("blah@email.com", "bleh", "lala", '', 'M')

    with pytest.raises(ValidationError) as excinfo:
        blank_dob.save()

    object_len = SiteUser.objects.all()
    assert len(object_len) == 0


@pytest.mark.django_db
def test_user_cant_save_bad_email():
    '''
    Test that a SiteUser that enters an
    invalid email cannot be saved
    '''
    bad_email = create_user("blah", "bleh", "lalala", date.today(), 'M')

    with pytest.raises(ValidationError) as excinfo:
        bad_email.save()

    object_len = SiteUser.objects.all()
    assert len(object_len) == 0


@pytest.mark.django_db
def test_user_cant_save_duplicate_email():
    '''
    Test that a SiteUser that enters a
    duplicate email cannot be saved
    '''
    user = create_user("blah@email.com", "bleh", "lalala", date.today(), 'F')
    user.save()

    dup = create_user("blah@email.com", "herp", "derp", date.today(), 'M')

    with pytest.raises(IntegrityError) as excinfo:
        dup.save()


@pytest.mark.django_db
def test_user_cant_save_duplicate_username():
    '''
    Test that a SiteUser that enters a
    duplicate username cannot be saved
    '''
    user = create_user('dan@gmail.com', 'danman', 'pd', date.today(), 'M')
    user.save()

    dup = create_user('other@yahoo.com', 'danman', 'mypass', date.today(), 'F')

    with pytest.raises(IntegrityError):
        dup.save()


@pytest.mark.django_db
def test_gender():
    '''
    Test that a SiteUser can only have
    M or F as their gender
    '''
    user = create_user('blah@email.com', 'bleh', 'lalala', date.today(), 'G')

    with pytest.raises(ValidationError) as excinfo:
        user.save()


@pytest.mark.django_db
def test_date():
    '''
    Test a SiteUser's age
    '''
    user = create_user('blah@email.com', 'bleh', 'lalala',
                       date(year=1992, month=3, day=5), 'M')

    assert user.age == 22


@pytest.mark.django_db
def test_user_save():
    '''
    This tests that a user actually is created
    '''
    jesse = create_user("jbright@email.com", "jbright", "lol",
                        date.today(), 'M')
    jesse.save()
    object_len = SiteUser.objects.all()
    assert len(object_len) == 1

    record = SiteUser.objects.all().first()
    assert record.username == jesse.username
    assert record.email == jesse.email
    assert record.pwd == jesse.pwd
    assert record.dob == jesse.dob
    assert record.gender == jesse.gender


@pytest.mark.django_db
def test_user_with_no_saved_weight_has_0_weight():
    '''
    If a SiteUser has never saved a weight
    then their weight should be 0
    '''
    jesse = create_user("jbright@email.com", "jbright", "lol",
                        date.today(), 'M')
    jesse.save()

    assert jesse.current_weight == 0


@pytest.mark.django_db
def test_user_current_weight_is_most_recent():
    '''
    A SiteUser's current weight should be the most
    recent weight entered for that user
    '''
    jesse = create_user('jbright@email.com', 'jbright', 'lol',
                        date.today(), 'M')
    jesse.save()

    w1 = create_weight(jesse, date(year=1993, month=6, day=14), 10)
    w1.save()

    w2 = create_weight(jesse, date(year=2000, month=4, day=10), 60)
    w2.save()

    w3 = create_weight(jesse, date.today(), 150)
    w3.save()

    w4 = create_weight(jesse, date(year=2011, month=6, day=5), 140)
    w4.save()

    assert jesse.current_weight == w3.weight


@pytest.mark.django_db
def test_weight_repr():
    '''
    This test case will ensure repr is working
    for a user's weight
    '''
    jesse = create_user('jbright@email.com', 'jbright', 'lol',
                        date.today(), 'M')
    jesse.save()

    w1 = create_weight(jesse, date(year=1993, month=6, day=14), 10)
    w1.save()

    assert str(jesse.weight_set.all()) == "[jbright: 10.0 lbs on 1993-06-14]"


@pytest.mark.django_db
def test_user_age_in_border_case():
    '''
    Test that if a user was born 20 year's ago, today,
    then their age will return 19 if we set their dob
    forward another day.
    '''
    jesse = create_user('jbright@email.com', 'jbright', 'lol',
                        date.today()-timedelta(days=7305), 'M')
    jesse.save()

    age = jesse.age

    jesse.dob = jesse.dob + timedelta(days=1)
    jesse.save()

    assert jesse.age == age - 1


@pytest.mark.django_db
def test_user_weight_goal_can_be_saved():
    '''
    Test that, in the regular case, a user
    can save their weight goal to the database
    '''
    user = create_user('blah@email.com', 'bleh', 'lalala', date.today(), 'M')
    user.weight_goal = 123.4
    user.save()

    assert user.weight_goal == 123.4


@pytest.mark.django_db
def test_user_cant_save_negative_weight():
    '''
    Test that a negative weight will
    raise a ValidationError
    '''
    user = create_user('blah@email.com', 'bleh', 'lalala', date.today(), 'M')
    user.weight_goal = -0.1

    with pytest.raises(ValidationError):
        user.save()


@pytest.mark.django_db
def test_user_cant_save_over_999_9():
    '''
    Test that the user can't save a weight
    over  999.9
    '''
    user = create_user('blah@email.com', 'bleh', 'lalala', date.today(), 'M')
    user.weight_goal = 1000.0

    with pytest.raises(decimal.InvalidOperation):
        user.save()


@pytest.mark.django_db
def test_user_repr():
    '''
    This will test that repr is working properly
    for a SiteUser
    '''
    jesse = create_user('jbright@email.com', 'jbright', 'lol',
                        date.today(), 'M')
    jesse.save()

    assert str(jesse) == "Username: jbright, Email: jbright@email.com"
    assert jesse.__repr__() == "Username: jbright, Email: jbright@email.com"
