from django.conf import settings
from django.urls import path
from le_centre_calendar import views
from django.conf.urls.static import static
from .views import view_cal, pdf_print_calendar

urlpatterns = [
    path('', views.ListEvents.as_view(), name='list_events'),
    path('<int:event_id>/', views.EventDetail.as_view(), name='event_detail'),
    path('users/', views.UserList.as_view()),
    path('users/<int:user_id>/', views.UserDetail.as_view()),
    path('view/', views.view_cal, name='view_cal'),
    path('calendar/', pdf_print_calendar, name='calendar'),
    path('download2/', views.pdf_print_calendar),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)+static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
