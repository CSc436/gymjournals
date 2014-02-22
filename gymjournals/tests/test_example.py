def test_django():
    import settings as base_settings
    from django.conf import settings as django_settings
    assert 3==5

def test_hurr():
    import settings as base_settings
    from django.conf import settings as django_settings
    assert 5==5

