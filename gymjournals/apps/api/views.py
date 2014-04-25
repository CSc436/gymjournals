"""
Views for displaying Users
"""

from django.shortcuts import render
from rest_framework import generics
from rest_framework import serializers
from user.models import *
from django.db import models
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json
from datetime import *


class SiteUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SiteUser
        fields = SiteUser.fields_to_serialize


class SiteUserListAPIView(generics.ListCreateAPIView):
    serializer_class = SiteUserSerializer
    model = SiteUser


class SiteUserGetAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SiteUserSerializer
    model = SiteUser


class SiteUserGetLoginAPIView(APIView):
    def post(self, request, format=None):
        user_name = SiteUser.objects.filter(
            username=request.DATA['username']
        ).first()

        user = SiteUser.objects.filter(
            username=request.DATA['username'],
            pwd=request.DATA['pwd']
        ).first()

        serializer = SiteUserSerializer(user, many=False)

        if user:
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )
        elif user_name:
            return Response(
                {"error": "Password is incorrect"},
                status=status.HTTP_400_BAD_REQUEST
            )
        return Response(
            {"error": "Username does not exist"},
            status=status.HTTP_400_BAD_REQUEST
        )


class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout


class WorkoutListAPIView(generics.ListCreateAPIView):
    serializer_class = WorkoutSerializer
    model = Workout

    def get_queryset(self):
        user_id = self.kwargs['id']
        user = SiteUser.objects.filter(id=user_id).first()
        return user.workout_set.all()


class WorkoutGetAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = WorkoutSerializer
    model = Workout


class WeightExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeightExercise


class WeightExerciseListAPIView(generics.ListCreateAPIView):
    serializer_class = WeightExerciseSerializer
    model = WeightExercise

    def get_queryset(self):
        workout_id = self.kwargs['workout_id']
        workout = Workout.objects.filter(id=workout_id).first()
        return workout.weightexercise_set.all()


class WeightExerciseGetAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = WeightExerciseSerializer
    model = WeightExercise


class AerobicExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = AerobicExercise


class AerobicExerciseListAPIView(generics.ListCreateAPIView):
    serializer_class = AerobicExerciseSerializer
    model = AerobicExercise

    def get_queryset(self):
        workout_id = self.kwargs['workout_id']
        workout = Workout.objects.filter(id=workout_id).first()
        return workout.aerobicexercise_set.all()


class AerobicExerciseGetAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AerobicExerciseSerializer
    model = AerobicExercise


class WeightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weight

    def to_native(self, obj):
        if obj:
            millis - get_millis(obj.date)
            return [millis, obj.weight]
        return None


class WeightListAPIView(generics.ListCreateAPIView):
    serializer_class = WeightSerializer
    model = Weight

    def get_queryset(self):
        user_id = self.kwargs['id']
        user = SiteUser.objects.filter(id=user_id).first()
        return user.weight_set.order_by("date")


class ExerciseListAPIView(generics.ListCreateAPIView):
    model = Workout

    def get(self, request, format=None, **kwargs):
        user_id = kwargs['user_id']
        tag = kwargs['tag']
        user = SiteUser.objects.filter(id=user_id).first()

        to_return = []

        for w in user.workout_set.order_by("date"):
            exercises = list(w.aerobicexercise_set.filter(name=tag))

            if exercises:
                exercises_json = []
                for exercise in exercises:
                    h, m, s = [int(i) for i in
                               str(exercise.duration).split(':')]
                    exercise_millis = (3600 * h + 60 * m + s) * 1000
                    millis = get_millis(w.date)
                    e_json = {
                        "heartrate": exercise.avg_heartrate,
                        "duration": exercise_millis
                    }
                    exercises_json.append(e_json)
                to_return.append([millis, exercises_json])

        return Response(to_return)


def get_millis(my_date):
    date = datetime.combine(my_date, datetime.min.time())
    seconds = (date - datetime.utcfromtimestamp(0)).total_seconds()
    millis = int(seconds * 1000)
    return millis


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag


class TagUserListAPIView(generics.ListCreateAPIView):
    serializer_class = TagSerializer
    model = Tag

    def get_queryset(self):
        user_id = self.kwargs['id']
        return Tag.objects.filter(user=user_id).distinct()
        

class TagWeightExerciseListAPIView(generics.ListCreateAPIView):
    serializer_class = TagSerializer
    model = Tag

    def get_queryset(self):
        exercise_id = self.kwargs['id']
        return Tag.objects.filter(weight_exercise=exercise_id).distinct()


class TagAerobicListAPIView(generics.ListCreateAPIView):
    serializer_class = TagSerializer
    model = Tag

    def get_queryset(self):
        exercise_id = self.kwargs['id']
        return Tag.objects.filter(aerobic_exercise=exercise_id).distinct()


class TagWorkoutListAPIView(generics.ListCreateAPIView):
    serializer_class = TagSerializer
    model = Tag

    def get_queryset(self):
        workout_id = self.kwargs['id']
        workout = Workout.objects.filter(id=workout_id)



class TagGetAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TagSerializer
    model = Tag
