"""
Views for displaying Users
"""

from django.shortcuts import render
from rest_framework import generics
from rest_framework import serializers
from user.models import SiteUser
from django.db import models


class SiteUserSerializer(serializers.HyperlinkedModelSerializer):
    test = serializers.SerializerMethodField('get_test')

    def get_test(self, obj):
        return "TEST DATA"

    class Meta:
        class TestModel(models.Model):
            pass

        model = SiteUser
        fields = SiteUser.fields_to_serialize


class SiteUserListAPIView(generics.ListCreateAPIView):
    serializer_class = SiteUserSerializer
    model = SiteUser


class SiteUserGetAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = SiteUserSerializer
    model = SiteUser


class WorkoutsSerializer(serializers.HyperlinkedModelSerializer):
    test = serializers.SerializerMethodField('get_test')

    def get_test(self, obj):
        return "TEST DATA"

    class Meta:
        class TestModel(models.Model):
            pass

        model = Workouts
        fields = Workouts.fields_to_serialize


class WorkoutsListAPIView(generics.ListCreateAPIView):
    serializer_class = WorkoutsSerializer

    def get_queryset(self):
        user = self.request.siteuser
        return Workouts.objects.filter(workouts=user)


class WorkoutsGetAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = WorkoutsSerializer

    def get_queryset(self):
        user = self.request.siteuser
        return Workouts.objects.filter(workouts=user)
