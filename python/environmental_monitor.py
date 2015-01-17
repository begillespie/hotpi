# Takes 5 readings and writes one value to the db.
# Run it as a CRON job at the desired interval.:

# crontab -e
# add the following line to the bottom of CRONTAB to run every 5 minutes
# */5 * * * * sudo python /usr/share/adafruit/webide/repositories/hotpi/python/environmental_monitor.py ->/dev/null

import time, datetime, json
import RPi.GPIO as GPIO
import Adafruit_BMP.BMP085 as BMP085 # Adafruit digital temp/humidity sensor
from config import config # Configuration file
from lib import couchDB, mcp3008 # Custom libraries

GPIO.setwarnings(False)

db = couchDB.Couch(config['database']['path']) #set up CouchDB object

#camera = picamera.PiCamera() # Set up camera object

# Analog-Digital Converter
adc = mcp3008.ADC(  config['mcp3008']['clock'],
                    config['mcp3008']['mosi'],
                    config['mcp3008']['miso'],
                    config['mcp3008']['cs'])

class AnalogSensor:
    '''Some simple sensor methods'''
    def __init__(self, pin, adc):
        self.pin = pin
        self.adc = adc
        self.data = []

    def read(self):
        '''Read sensor. Returns an average of 5 readings.'''
        self.data = []
        for i in range(5):
            self.data.append(self.adc.readadc(self.pin))
            time.sleep(0.1)
        return sum(self.data) / float(len(self.data))
    
class AnalogTemp(AnalogSensor):
    '''Extend Sensor class with temperature methods'''
    def readCelsius(self):
        '''Return Temperature in Celsius from a TMP36 on 3.3V logic'''
        return (float(self.read()) * 330.0)/1023.0-50

    def readFarenheit(self):
        '''Return Temperature in Farenheit from a TMP36 on 3.3V logic'''
        return 1.8 * self.readCelsius() + 32

# Create sensor objects
temp1 = AnalogTemp(config['mcp3008']['sensor']['int_temp'], adc)
light = AnalogSensor(config['mcp3008']['sensor']['light'], adc)

ext_t_p = BMP085.BMP085() # Digital

def db_write():
    timestamp = datetime.datetime.now().isoformat();
    data = {'type'         : 'update', 
            'indoor_temp'  : temp1.readFarenheit(),
            'outdoor_temp' : ext_t_p.read_temperature() * 1.8 +32.0,
            'pressure'     : ext_t_p.read_pressure() / 3386.389,
            'light'        : light.read(),
            'timestamp'    : timestamp
        }
    update_records(data['indoor_temp'], data['outdoor_temp'], timestamp)
#   print json.dumps(data)
    db.saveDoc(config['database']['name'], json.dumps(data))

def update_records(indoor_temp, outdoor_temp, timestamp):
    updated = False
    data = db.openDoc(config['database']['name'], 'records')

# Make sure each record value exists and update it. If it doesn't exist, create it.
    if 'indoor_temp_record_max' in data:
        if indoor_temp > data['indoor_temp_record_max']:
            updated = True
            data['indoor_temp_record_max']           = indoor_temp
            data['indoor_temp_record_max_timestamp'] = timestamp
    else:
        updated = True
        data['indoor_temp_record_max']           = indoor_temp
        data['indoor_temp_record_max_timestamp'] = timestamp
        
    if 'indoor_temp_record_min' in data:
        if indoor_temp < data['indoor_temp_record_min']:
            updated = True
            data['indoor_temp_record_min']           = indoor_temp
            data['indoor_temp_record_min_timestamp'] = timestamp
    else:
        updated = True
        data['indoor_temp_record_min']           = indoor_temp
        data['indoor_temp_record_min_timestamp'] = timestamp
        
    if 'outdoor_temp_record_max' in data:
        if outdoor_temp > data['outdoor_temp_record_max']:
            updated = True
            data['outdoor_temp_record_max']           = outdoor_temp
            data['outdoor_temp_record_max_timestamp'] = timestamp
    else:
        updated = True
        data['outdoor_temp_record_max']           = outdoor_temp
        data['outdoor_temp_record_max_timestamp'] = timestamp
        
    if 'outdoor_temp_record_min' in data:
        if outdoor_temp < data['outdoor_temp_record_min']:
            updated = True
            data['outdoor_temp_record_min']           = outdoor_temp
            data['outdoor_temp_record_min_timestamp'] = timestamp
    else:
        updated = True
        data['outdoor_temp_record_min']           = outdoor_temp
        data['outdoor_temp_record_min_timestamp'] = timestamp
        
    if updated:
        db.saveDoc(config['database']['name'], json.dumps(data), docId='records')
        
db_write()
GPIO.cleanup()