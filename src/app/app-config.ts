export class AppConfig {
  public static REST_BASE_URL = 'http://localhost:3010';
  public static WS_URL = 'ws://localhost';

  public static POST_DEPLOY_CONTRACT_TOPO = [
    {
        'srcMAC': '02:00:00:00:00:20',
        'Messages': [
            {
                'signals': [
                    {
		    	'signalID': 0,
			'signalName': 'SomeSignal',
		    	'destMAC': '01:00:00:00:00:00',
                        'destIP': '239.0.0.0',
                    }
                ],
                'messageName': 'SomeMessage',
                'srcPort': 20000,
                'destPort': 30000,
                'messageID': 0
            }
        ],
        'srcIP': '10.0.0.0',
        'ECUName': 'SomeECU'
    }
  ];

  public static POST_OEM_TOPO = [
    {
        'srcMAC': '02:00:00:00:00:20',
        'Messages': [
            {
                'signals': [
                    {
		    	'signalID': 0,
			'signalName': 'SomeSignal',
		    	'destMAC': '01:00:00:00:00:00',
                        'destIP': '239.0.0.0',
                    }
                ],
                'messageName': 'SomeMessage',
                'srcPort': 20000,
                'destPort': 30000,
                'messageID': 0
            }
        ],
        'srcIP': '10.0.0.0',
        'ECUName': 'SomeECU'
    }
  ];

  public static POST_OEM_ADDR = '0x32c206E3c36aE576AB394F17e4fD72086685bF3b';
  public static ADDRESS = '0x0D8A6d4978aC90d0c4699123B449F1E8F3941E1c';
}
