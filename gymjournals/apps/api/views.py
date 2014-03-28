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
        return Workout.objects.filter(user=user)


class WorkoutGetAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = WorkoutSerializer
    model = Workout

    def get_queryset(self):
        user_id = self.kwargs['id']
        user = SiteUser.objects.filter(id=user_id).first()
        return Workout.objects.filter(user=user)


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
