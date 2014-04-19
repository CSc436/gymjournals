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
            date = datetime.combine(obj.date, datetime.min.time())
            seconds = (date - datetime.utcfromtimestamp(0)).total_seconds()
            millis = int(seconds * 1000)
            return [millis, obj.weight]
        return None


class WeightListAPIView(generics.ListCreateAPIView):
    serializer_class = WeightSerializer
    model = Weight

    def get_queryset(self):
        user_id = self.kwargs['id']
        user = SiteUser.objects.filter(id=user_id).first()
        return user.weight_set.order_by("date")
