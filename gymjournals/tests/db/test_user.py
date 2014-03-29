import pytest
from django.db import IntegrityError
from imports import *


def create_user(u_email, u_username, u_pwd):
    '''
    Utility function that creates user information
    so a test is able to add/change info along with
    adding it to the test database.
    '''
    return SiteUser(email=u_email, username=u_username, pwd=u_pwd)


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
    jesse = create_user("jbright@email.com", "jbright", "lol")
    assert jesse.email == 'jbright@email.com'
    assert jesse.username == 'jbright'
    assert jesse.pwd == 'lol'


@pytest.mark.django_db
def test_user_cant_save_no_info():
    '''
    Test that a SiteUser with not enough information
    cannot be saved
    '''
    blank_everything = create_user("", "", "")

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
    blank_email = create_user("", "blah", "bleh")

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
    blank_email = create_user("blah", "", "bleh")

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
    blank_email = create_user("blah", "bleh", "")

    with pytest.raises(ValidationError) as excinfo:
        blank_email.save()

    object_len = SiteUser.objects.all()
    assert len(object_len) == 0


@pytest.mark.django_db
def test_user_cant_save_bad_email():
    '''
    Test that a SiteUser that enters an
    invalid email cannot be saved
    '''
    bad_email = create_user("blah", "bleh", "lalala")

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
    user = create_user("blah@email.com", "bleh", "lalala")
    user.save()

    duplicate = create_user("blah@email.com", "herp", "derp")

    with pytest.raises(IntegrityError) as excinfo:
        duplicate.save()


@pytest.mark.django_db
def test_user_save():
    '''
    This tests that a user actually is created
    '''
    jesse = create_user("jbright@email.com", "jbright", "lol")
    jesse.save()
    object_len = SiteUser.objects.all()
    assert len(object_len) == 1
