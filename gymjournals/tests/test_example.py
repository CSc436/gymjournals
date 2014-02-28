import settings as base_settings

def test_django():
    from django.conf import settings as django_settings
    assert 3 == 3


def test_hurr():
    from django.conf import settings as django_settings
    assert 5 == 5
