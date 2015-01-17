## Environmental Monitor

An external script reads data and writes records to the database. This app
gives views of current conditions and graphs of historical data.

nginx proxy code:
The first location allows me to access the db from a remote system on the LAN.
Since the server is running on a headless Raspberry Pi, it would get a little
tedius to SSH in and do everything using cURL. The second location is for the 
HotPi app. It cleans up the URLs a little bit, and only allows GET. I can't 
figure out how to set an index rule for the proxied location, so to get to it, 
you have to go to HOST/hotpi/index.html

================================================================================
    location /couchdb {
        rewrite /couchdb/(.*) /$1 break;
        proxy_pass http://localhost:5984;
        proxy_redirect off;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        allow 192.168.1.0/24;
        allow 127.0.0.1;
        deny all;
    }

    location /hotpi {
        rewrite /couchdb/(.*) /$1 break;
        proxy_pass http://localhost:5984/hotpi/_design/hotpi;
        proxy_method GET;
        proxy_redirect off;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        allow all;
    }
================================================================================

## Todo

* apply CSS styling throughout

## License

MIT