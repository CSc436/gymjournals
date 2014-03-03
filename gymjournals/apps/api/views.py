"""
Views for displaying Users
"""

from django.shortcuts import render
from rest_framework import generics
from rest_framework import serializers
from user.models import *
from django.db import models


class SiteUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SiteUser
        fields = SiteUser.fields_to_serialize


class SiteUserListAPIView(generics.ListCreateAPIView):
    serializer_class = SiteUserSerializer
    model = SiteUser


class SiteUserGetAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = SiteUserSerializer
    model = SiteUser


class WorkoutsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workouts


class WorkoutsListAPIView(generics.ListCreateAPIView):
    serializer_class = WorkoutsSerializer
    model = Workouts

    def get_queryset(self):
        user_id = self.kwargs['id']
        user = SiteUser.objects.filter(id=user_id).first()
        return Workouts.objects.filter(user=user)


class WorkoutsGetAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = WorkoutsSerializer
    model = Workouts
