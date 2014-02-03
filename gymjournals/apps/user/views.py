from django.shortcuts import render
from user.models import User


def list(request):
    """List all of the users with their usernames and emails"""
    users = User.objects.all()
    return render(request, "user/list.html", {"users": users})


def get(request, user_id):
    """Display info for the specified user"""
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        user = None
    return render(request, "user/get.html", {"user": user})
