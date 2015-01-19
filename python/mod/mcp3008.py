import RPi.GPIO as GPIO, time, os

#Adapted from the Adafruit MCP3008 code, this is a modularized, OO version.
#Just declare the ADC with the 4 pins and then read it with 
#ADC.readadc(channel_num)

# read SPI data from MCP3008 chip, 8 possible adc's (0 thru 7)
# from learn.adafruit.com
class ADC:
    def __init__(self, clockpin, mosipin, misopin, cspin):
        self.clockpin = clockpin
        self.mosipin = mosipin
        self.misopin = misopin
        self.cspin = cspin
        
        # set up the SPI interface pins
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(mosipin, GPIO.OUT)
        GPIO.setup(misopin, GPIO.IN)
        GPIO.setup(clockpin, GPIO.OUT)
        GPIO.setup(cspin, GPIO.OUT)

    def readadc(self, adcnum):
        if ((adcnum > 7) or (adcnum < 0)):
            return -1
        GPIO.output(self.cspin, True)
        
        GPIO.output(self.clockpin, False)  # start clock low
        GPIO.output(self.cspin, False)     # bring CS low
        
        commandout = adcnum
        commandout |= 0x18  # start bit + single-ended bit
        commandout <<= 3    # we only need to send 5 bits here
        for i in range(5):
            if (commandout & 0x80):
                GPIO.output(self.mosipin, True)
            else:
                GPIO.output(self.mosipin, False)
            commandout <<= 1
            GPIO.output(self.clockpin, True)
            GPIO.output(self.clockpin, False)
        adcout = 0
        # read in one empty bit, one null bit and 10 ADC bits
        for i in range(12):
            GPIO.output(self.clockpin, True)
            GPIO.output(self.clockpin, False)
            adcout <<= 1
            if (GPIO.input(self.misopin)):
                adcout |= 0x1
        GPIO.output(self.cspin, True)
        adcout /= 2       # first bit is 'null' so drop it
        return adcout
