import urllib.request
import pandas as pd
import os
import tablib
from import_export import resources
import requests
from config.settings import MEDIA_ROOT, MEDIA_URL
from le_centre_calendar.models import LOCATION_CHOICES, STATUS_CHOICES, Event
from le_centre_calendar.serializers import EventSerializer, UserSerializer
from django.contrib.auth.models import User
from rest_framework.viewsets import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from django.template.loader import get_template
from datetime import date, datetime, timedelta
from rest_framework import status, permissions
from xhtml2pdf import pisa
from django.shortcuts import render
import calendar
import json

from django.views.decorators.clickjacking import xframe_options_exempt

from django.http import HttpResponse
from .resources import edxEventResource

from .models import Event

from django.db.models.functions import ExtractYear

from django.db.models import Q
from datetime import datetime

@xframe_options_exempt

def view_cal(request):
    current_date = date.today()


    # Get all events ordered by start date in ascending order
    events = Event.objects.order_by('start_date')

    # Get distinct years from the events
    years = Event.objects.dates('start_date', 'year')

    # Filter events based on the selected month, year, location, and featured
    month = request.GET.get('month')
    if month:
        events = events.filter(start_date__month=month)

    year = request.GET.get('year')
    if year:
        events = events.filter(start_date__year=year)

    location = request.GET.get('location')
    if location:
        events = events.filter(location=location)

    featured = request.GET.get('featured')
    if featured:
        events = events.filter(featured=True)

    # Handle start date and end date filtering
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')

    if start_date and end_date:
        # Convert start date and end date strings to datetime objects
        start_date = datetime.strptime(start_date, '%Y-%m-%d').date()
        end_date = datetime.strptime(end_date, '%Y-%m-%d').date()

        # Filter events based on the selected date range
        events = events.filter(Q(start_date__gte=start_date, start_date__lte=end_date) | Q(end_date__gte=start_date, end_date__lte=end_date))

    return render(request, 'view_calendar.html', {'current_date': current_date, 'events': events, 'years': years})  


def pdf_print_calendar(request):
    # Get the current month and year
    current_month = datetime.now().month
    current_year = datetime.now().year

    # Retrieve the events for the current month and year
    events = Event.objects.filter(start_date__year=current_year, start_date__month=current_month)

    # Define the days of the week in French
    days_of_week = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']

    # Generate the date grid for the calendar
    _, last_day = calendar.monthrange(current_year, current_month)
    date_grid = []
    week = []
    for day in range(1, last_day + 1):
        week.append(day)
        if len(week) == 7:
            date_grid.append(week)
            week = []
    if week:
        date_grid.append(week)

    # Define the Canadian French month names mapping
    month_names_fr = {
        1: 'Janvier',
        2: 'Février',
        3: 'Mars',
        4: 'Avril',
        5: 'Mai',
        6: 'Juin',
        7: 'Juillet',
        8: 'Août',
        9: 'Septembre',
        10: 'Octobre',
        11: 'Novembre',
        12: 'Décembre',
    }

    # Get the Canadian French month name
    month_name = month_names_fr.get(current_month, '')

    # Pass the data to the template
    context = {
        'events': events,
        'days_of_week': days_of_week,
        'date_grid': date_grid,
        'current': {'month': month_name, 
                    'year': current_year},
    }

    return render(request, 'printable_calendar.html', context)









class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ListEvents(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, format=None):
        """
        Return a list of all events.
        """
        # mock date if no date is provided
        end_date = datetime.now() + timedelta(days=365)
        start_date = datetime.now()

        # request dates
        req_date_from = request.GET.get('start')
        req_date_to = request.GET.get('end')

        # set date range
        date_from = req_date_from if req_date_from is not None else start_date
        date_to = req_date_to if req_date_to is not None else end_date

        req_location = request.GET.get('location')

        if (req_location in dict(LOCATION_CHOICES)):
            events = Event.objects.filter(start_date__range=(
                date_from, date_to), location=req_location)
        else:
            events = Event.objects.filter(start_date__range=(
                date_from, date_to))

        req_featured = request.GET.get('featured')

        if (req_featured and req_featured.lower() == 'true'):
            events = Event.objects.filter(start_date__range=(
                date_from, date_to), featured=True)

        data = EventSerializer(events, many=True).data
        return Response(data)

    def post(self, request, format=None):
        """
        Create a new event.
        """
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class EventDetail(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, event_id):
        """
        Retrieve an event.
        """
        try:
            event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = EventSerializer(event)
        return Response(serializer.data)

    def put(self, request, event_id):
        """
        Update an event.
        """
        try:
            event = Event.objects.get(id=event_id)

            # Check if the current logged user is the event author
            if event.author != request.user:
                return Response({'message': 'Not allowed.'})
        except Event.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # Update the event
        serializer = EventSerializer(
            event,
            data=request.data
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, event_id):
        try:
            event = Event.objects.get(id=event_id)
            if event.author != request.user:
                return Response({'message': 'Not allowed.'})
        except Event.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# def download_events(request, format=None):
#     """
#     Generates a downloadable pdf file with events this month.
#     """
#     currentMonth = datetime.now().month
#     currentYear = datetime.now().year

#     # events = EventSerializer(Event.objects.all(), many=True).data
#     events = EventSerializer(
#         Event.objects.filter(
#             start_date__month=currentMonth,
#             start_date__year=currentYear),
#         many=True).data

#     template_path = 'events_pdf.html'
#     context = {'events': events, 'month': currentMonth, 'year': currentYear}
#     # Create a Django response object, and specify content_type as pdf
#     response = HttpResponse(content_type='application/pdf')

#     # to view on browser we can remove attachment
#     response['Content-Disposition'] = 'filename="events.pdf"'

#     # find the template and render it.
#     template = get_template(template_path)
#     html = template.render(context)

#     # create a pdf
#     pisa_status = pisa.CreatePDF(html, dest=response)
#     # if error then show some funny view
#     if pisa_status.err:
#         return HttpResponse('We had some errors <pre>' + html + '</pre>')
#     return response