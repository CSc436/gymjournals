"""
Sets up URLS for the api.

/users/ - list all users
/users/id - get the user with the specified id
"""

from django.conf.urls import patterns, url
from api import views


urlpatterns = patterns(
    "",
    url(
        r"^list/users/$",
        views.SiteUserListAPIView.as_view(),
        name="list_users"
    ),
    url(
        r"^get/users/(?P<pk>\d+)/$",
        views.SiteUserGetAPIView.as_view(),
        name="get_user"
    ),
    url(
        r"^login/$",
        views.SiteUserGetLoginAPIView.as_view(),
        name="get_login_user"
    ),
    url(
        r"^list/workouts/(?P<id>\d+)/$",
        views.WorkoutListAPIView.as_view(),
        name="list_workouts"),
    url(
        r"^get/workouts/(?P<pk>\d+)/$",
        views.WorkoutGetAPIView.as_view(),
        name="get_workout"
    ),
    url(
        r"^list/weightexercises/(?P<workout_id>\d+)/$",
        views.WeightExerciseListAPIView.as_view(),
        name="list_weight_exercises",
    ),
    url(
        r"^get/weightexercises/(?P<pk>\d+)/$",
        views.WeightExerciseGetAPIView.as_view(),
        name="get_weight_exercise",
    ),
)
