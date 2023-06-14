!#/bin/bash

systemctl daemon-reload
systemctl restart web.socket
systemctl restart web.service

systemctl status web.socket
systemctl status web.service

