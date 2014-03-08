"""
Sets up URLS for the api.

/users/ - list all users
/users/id - get the user with the specified id
"""

from django.conf.urls import patterns, url
from api import views


urlpatterns = patterns(
    "",
    url(r"^users/$", views.SiteUserListAPIView.as_view(), name="list_users"),
    url(
        r"^users/(?P<pk>\d+)/$",
        views.SiteUserGetAPIView.as_view(),
        name="get_user"
    ),
    url(
        r"^users/login/$",
        views.SiteUserGetLoginAPIView.as_view(),
        name="get_login_user"
    ),
    url(
        r"^workouts/(?P<id>\d+)/$",
        views.WorkoutListAPIView.as_view(),
        name="list_workouts"),
    url(
        r"^workouts/(?P<id>\d+)/(?P<pk>\d+)/$",
        views.WorkoutGetAPIView.as_view(),
        name="get_workout"
    ),
)
