from multiprocessing import reduction
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import auth
from django.contrib import messages
from django.contrib.messages import constants


def register(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm-password')

        if password != confirm_password:
            messages.add_message(
                request,
                constants.ERROR,
                'Passwords does not match.')
            return redirect('/auth/register')

        if len(username.strip()) == 0 or len(password.strip()) == 0:
            messages.add_message(
                request,
                constants.ERROR,
                "Username and password can't be empty.")
            return redirect('/auth/register')

        user = User.objects.filter(username=username)

        if user.exists():
            messages.add_message(
                request,
                constants.ERROR,
                'User already exists.')
            return redirect('/auth/register')

        try:
            user = User.objects.create_user(
                username=username, password=password)
            user.save()
            return redirect('/auth/login')
        except BaseException:
            messages.add_message(request, constants.ERROR, 'Internal error.')
            return HttpResponse("Não foi possível criar o usuário.")

    if request.method == 'GET':
        if request.user.is_authenticated:
            return redirect('/calendar')
        else:
            return render(request, 'register.html')


def login(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            return redirect('/calendar')
        else:
            return render(request, 'login.html')

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = auth.authenticate(username=username, password=password)

        if not user:
            messages.add_message(
                request,
                constants.ERROR,
                "Invalid user or password.")
            return redirect('/auth/login')

        else:
            auth.login(request, user)
            return redirect('/calendar')


def logout(request):
    auth.logout(request)
    return redirect('/auth/login')
