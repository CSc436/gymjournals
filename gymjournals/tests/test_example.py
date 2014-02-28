import settings as base_settings
from django.conf import settings as django_settings


def test_django():
    assert 3 == 3


def test_hurr():
    assert 5 == 5
