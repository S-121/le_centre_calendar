# le_centre_calendar

#### Rest API for Eglise Le Centre calendar.

1. Requirements:

    - Python 3.x

2. Create and prepare a python virtual environment:

    python3 -m venv venv 
    
*If you don't python-venv installed yet do "apt-get install -y python3-venv" 

Activate the virtual environment:

    source venv/bin/activate

Install the dependencies:

    pip install -r requirements.txt

3. Installing and running the server

Create a new superuser (may be handfull to manipulate db objects):

    python manage.py migrate

    python manage.py createsuperuser

To run locally, in develop mode, at the project's root folder level type:

    python manage.py makemigrations

Load the migrations into database:

    python manage.py migrate

Run the develop server:

    python manage.py runserver

4. API usage:

    curl http://127.0.0.1:8000/calendar/    => return all existing events within a list

    curl http://127.0.0.1:8000/calendar/1   => retrive the event which id is "1"

    curl -X POST -H "Content-Type : application/json" {
        "title": "new event",
        "subtitle": "subtitle",
        "description": "test",
        "start_date": "2022-11-28",
        "start_time": "02:55:23",
        "end_date": "2022-11-28",
        "end_time": "02:55:25",
        "all_day": false,
        "time_zone": "",
        "repeat": null,
        "location": "",
        "website": "",
        "url": "",
        "email": "",
        "phone": ""
    } http://127.0.0.1:8000/calendar/   => create a new event

    curl -X DELETE http://127.0.0.1:8000/calendar/2 => delete the event which id is "2"