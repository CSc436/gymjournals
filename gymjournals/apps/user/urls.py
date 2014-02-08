from django.conf.urls import patterns, include, url

urlpatterns = patterns(
    "",
    url(r"^list/?$", "user.views.list"),
    url(r"^get/(?P<user_id>\d+)/?$", "user.views.get"),
)
