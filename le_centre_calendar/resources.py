from import_export import resources
from .models import Event


class edxEventResource(resources.ModelResource):
    class Meta:
        model = Event
        import_id_fields = ('event_code',)
        # skip_unchanged = True
        # report_skipped = True
        # if you want to exclude any field from exporting
        exclude = ('id', 'author')
        fields = (
            'event_code',
            'start_date',
            'title',
            'featured',
            'start_time',
            'end_time',
            'location',
            'description',
        )
        export_order = (
            'event_code',
            'start_date',
            'title',
            'featured',
            'start_time',
            'end_time',
            'location',
            'description',
        )
