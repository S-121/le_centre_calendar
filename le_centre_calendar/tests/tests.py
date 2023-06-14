
from django.test import Client, TestCase
from django.urls import reverse
from rest_framework import status
from le_centre_calendar.models import Event

from django.contrib.auth.models import User
import json

client = Client()


class EventTest(TestCase):
    def setUp(self) -> None:
        self.credentials = {
            'username': 'test_user',
            'password': 'secret'}
        user = User.objects.create_user(**self.credentials)

        client.force_login(user)

        self.valid_payload = {
            'title': 'Test Event',
            'subtitle': 'Test subtitle',
            'description': 'Event created by Testcase.',
            'start_date': '2022-12-27',
            'start_time': '20:30:45',
            'end_date': '2022-12-30',
            'end_time': '20:30:45',
            'all_day': False,
            'time_zone': "Europe/Paris",
            'repeat': None,
            'location': None,
            'website': None,
            'url': None,
            'email': None,
            'phone': None,
        }
        self.invalid_payload = {
            'title': '',
            'subtitle': 'Test subtitle',
            'description': 'Event created by Testcase.',
            'start_date': '2022-12-27',
            'start_time': '20:30:45',
            'end_date': '2022-12-30',
            'end_time': '20:30:45',
            'all_day': False,
            'time_zone': "Europe/Paris",
            'repeat': None,
            'location': None,
            'website': None,
            'url': None,
            'email': None,
            'phone': None,
        }

    # Create a valid event test
    def test_create_valid_event(self):
        response = client.post(
            reverse('list_events'),
            data=json.dumps(self.valid_payload),
            content_type='application/json',
        )
        self.event = Event.objects.get(title='Test Event')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # Create an invalid event test
    def test_create_invalid_event(self):
        response = client.post(
            reverse('list_events'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
