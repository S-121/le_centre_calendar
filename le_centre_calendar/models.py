from django.db import models
from django.conf import settings
from django.utils.crypto import get_random_string


def generate_unique_code():
    # Generate a random string of length 10. You can adjust the length as needed.
    return get_random_string(10)

LOCATION_CHOICES = [
    ('Ottawa', 'Ottawa'),
    ('Montreal', 'Montreal'),
    ('Lac-St-Jean', 'Lac-St-Jean'),
]
STATUS_CHOICES = [
    ('Draft', 'Draft'),
    ('Active', 'Active'),
    ('Not-Active', 'Not-Active'),
]


class Event(models.Model):
    id = models.AutoField(primary_key=True)
    event_code = models.CharField(max_length=100, unique=True, default=generate_unique_code)
    creation_date = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(
        'auth.User',
        on_delete=models.DO_NOTHING,
        blank=True,
        null=True,
        related_name='events')
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    start_date = models.DateField()
    start_time = models.TimeField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    end_time = models.TimeField(blank=True, null=True)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='Active',
        blank=True,
        null=True)
    featured = models.BooleanField(default=False)
    location = models.CharField(
        max_length=200,
        choices=LOCATION_CHOICES,
        default='Ottawa',
        blank=True,
        null=True)
    link = models.URLField(blank=True, null=True, default='')
    artwork = models.ImageField(
        upload_to='artwork', blank=True, null=True)
    def __str__(self):
        return self.title
