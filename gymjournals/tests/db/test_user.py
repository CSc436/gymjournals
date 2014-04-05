import pytest
from django.db import IntegrityError
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
    blank_dob = create_user("blah", "bleh", "", '', 'M')

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
def test_gender():
    '''
    Test that a SiteUser can only have
    M or F as their gender
    '''
    user = create_user('blah@email.com', 'bleh', 'lalala', date.today(), 'G')

    with pytest.raises(ValidationError) as excinfo:
        user.save()


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
