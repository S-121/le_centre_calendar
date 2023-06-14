from django.contrib import admin
from .models import Event

from import_export.admin import ImportExportModelAdmin
from .resources import edxEventResource


@admin.register(Event)
class edxEventResource(ImportExportModelAdmin):
    resource_class = edxEventResource
    list_display = ['title', 'featured', 'start_date', 'location', 'artwork', 'status']
    list_display_links = ['title']
    list_editable = ['artwork', 'featured', 'status']
    list_filter = ['featured', 'status']

    fieldsets = [
        ('Event Details', {'fields': ['title', 'description', 'start_date', 'start_time', 'end_time', 'status', 'featured', 'location', 'link', 'artwork']}),
        ('Internal use', {'fields': ['event_code']}),
    ]

    def get_readonly_fields(self, request, obj=None):
        readonly_fields = super().get_readonly_fields(request, obj)
        if obj and obj.event_code:
            readonly_fields += ('event_code',)
        return readonly_fields
