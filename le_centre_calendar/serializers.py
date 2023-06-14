from rest_framework import serializers
from le_centre_calendar.models import Event
from django.contrib.auth.models import User


class EventSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Event
        fields = [
            'id',
            'event_code',
            'creation_date',
            'author',
            'title',
            'description',
            'start_date',
            'start_time',
            'end_date',
            'end_time',
            # 'repeat',
            'status',
            'featured',
            'location',
            'link',
            'artwork'
        ]


class UserSerializer(serializers.ModelSerializer):
    # Reverse relationships
    events = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Event.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'events']
