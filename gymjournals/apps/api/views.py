"""
Views for displaying Users
"""

from django.shortcuts import render
from rest_framework import generics
from rest_framework import serializers
from user.models import User
from django.db import models


class UserSerializer(serializers.HyperlinkedModelSerializer):
    test = serializers.SerializerMethodField('get_test')

    def get_test(self, obj):
        return "TEST DATA"

    class Meta:
        class TestModel(models.Model):
            pass

        model = User
        fields = tuple(map(lambda m: m.name, User._meta.fields))


class UserListAPIView(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    model = User


class UserGetAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    model = User
