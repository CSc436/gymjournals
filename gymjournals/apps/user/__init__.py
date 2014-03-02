from user.models import SiteUser
from django.core.validators import MinLengthValidator
from django.core.exceptions import ValidationError

field = SiteUser._meta.get_field('first_name')
field.blank = False
field.null = False
