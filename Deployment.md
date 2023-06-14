# le_centre_calendar Deployment

#### Connect/SSH with the deployment server.

1.  SSH:

        ssh root@IP_Address

2.  Enter Shell Password

### Working with the deployment server.

#### 1. Update with the latest changes.

1.  CD to the working directory:

        cd /var/www/deploy/

2.  Pull the latest changes:

        git pull origin dev

#### 2. Setting up the server.

_**If Server is already Setuped Skip to Preparing Step**_

1.  Requirements:

        - Python 3. x

    _if Python3 command dosn't work try Python3.9 or alias it using the following command_

        alias python3='/usr/local/bin/python3.9'

2.  CD to the working directory:

        cd /var/www/deploy/

3.  Create and prepare a python virtual environment:

        python3 -m venv venv

**_If you don't have python-venv installed yet do "apt-get install -y python3-venv_**

    Activate the virtual environment:

        source venv/bin/activate

    Install the dependencies:

        python3 -m pip install -r requirements.txt

4.  Prepering the server

    Create a new superuser (maybe a handful to manipulate db objects):

        python manage.py migrate

        python manage.py createsuperuser

    To run locally:

        python manage.py makemigrations

    Load the migrations into the database:

        python manage.py migrate

    Load the Static folder:

        python3 manage.py collectstatic

5.  Running the server:

    1.  Running Supervisor:

            supervisord -c config/deploy/supervisord.config

    1.  Running Nginx:

            systemctl start nginx

### Logs

#### _Logs can be used for debugging any Errors_

#### 1. Gunicorn logs

-   Access Logs at

    _**logs for the server access**_

           /var/www/deploy/logs/gunicorn.access.log

-   App Logs at

    _**logs for the Running App and Errors**_

           /var/www/deploy/logs/gunicorn.error.log

#### 2. Supervisord logs

-   Processes Logs at

    _**logs for running processes like Gunicorn**_

         /var/www/deploy/logs/supervisord.log

### API usage:

    **Go to Readme.md**
