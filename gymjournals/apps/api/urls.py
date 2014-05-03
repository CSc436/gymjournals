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
        r"^list/workouts/(?P<user_id>\d+)/$",
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
        r"^list/weightexercises/(?P<user_id>\d+)/(?P<tag>.+)/$",
        views.WeightTagExerciseListAPIView.as_view(),
        name="list_weight_exercises_tag",
    ),
    url(
        r"^get/weightexercises/(?P<pk>\d+)/$",
        views.WeightExerciseGetAPIView.as_view(),
        name="get_weight_exercise",
    ),
    url(
        r"^list/aerobicexercises/(?P<workout_id>\d+)/$",
        views.AerobicExerciseListAPIView.as_view(),
        name="list_aerobic_exercises",
    ),
    url(
        r"^list/aerobicexercises/(?P<user_id>\d+)/(?P<tag>.+)/$",
        views.AerobicTagExerciseListAPIView.as_view(),
        name="list_aerobic_exercises_tag",
    ),
    url(
        r"^get/aerobicexercises/(?P<pk>\d+)/$",
        views.AerobicExerciseGetAPIView.as_view(),
        name="get_aerobic_exercise",
    ),
    url(
        r"^list/sets/(?P<weight_id>\d+)/$",
        views.SetListAPIView.as_view(),
        name="list_sets",
    ),
    url(
        r"^get/set/(?P<pk>\d+)/$",
        views.SetGetAPIView.as_view(),
        name="get_set",
    ),
    url(
        r"list/weights/(?P<user_id>\d+)/$",
        views.WeightListAPIView.as_view(),
        name="list_weights",
    ),
    url(
        r"list/tags_user/(?P<user_id>\d+)/$",
        views.TagUserListAPIView.as_view(),
        name="list_tags_user",
    ),
    url(
        r"list/tags_weightexercise/(?P<weight_id>\d+)/$",
        views.TagWeightExerciseListAPIView.as_view(),
        name="list_tags_weight_exercise",
    ),
    url(
        r"list/tags_aerobicexercise/(?P<aerobic_id>\d+)/$",
        views.TagAerobicExerciseListAPIView.as_view(),
        name="list_tags_aerobic_exercise",
    ),
    url(
        r"list/tags_workout/(?P<workout_id>\d+)/$",
        views.TagWorkoutListAPIView.as_view(),
        name="list_tags_workout",
    ),
    url(
        r"get/tag/(?P<pk>\d+)/$",
        views.TagGetAPIView.as_view(),
        name="get_tag",
    ),
)
