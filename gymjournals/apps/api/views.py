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

'''
class WorkoutSerializer(serializers.HyperlinkedModelSerializer):
    test = serializers.SerializerMethodField('get_test')

    def __init__(self, user_id):
        

    def get_test(self, obj):
        return "TEST DATA"

    class Meta:
        class TestModel(models.Model):
            pass

        model = Workout
        fields = tuple(map(lambda m: m.name, Workout._meta.fields))


class WorkoutListAPIView(generics.APIView):

    def get(self, request):
        serializer = SiteUserSerializer(request.user_id)
        return Response(serializer.data)
'''
