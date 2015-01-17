# Raspberry Pi pin assignments
config = {
    # Analog Digital Converter (RPi GPIO)
    'mcp3008' : {
        'clock' : 11,
        'mosi'  : 10,
        'miso'  :  9,
        'cs'    :  8,
        
        # Sensors on the ADC chip (MCP3008 pins)
        'sensor' : {
            'int_temp' : 0,
            'light'    : 1
            }
        },
        
    # Related to the database
    'database' : {
        # Path to database
        'path' : 'localhost',
        'name' : 'hotpi'
        }
}