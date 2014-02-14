from user import urls as userurls
from django.conf.urls import patterns, include, url
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns(
    "",
    url(r"^user/", include(userurls)),
    url(r"^admin/", include(admin.site.urls)),
    url(
        r"^api-auth/",
        include("rest_framework.urls", namespace="rest_framework")
    ),
)
