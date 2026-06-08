import { Heater, SmartHeater } from '../src/device';
import { operateDevice } from '../src/utils';

describe('Device tests', () => {
    it('Heater should change temperature and return correct description', () => {
        const heater: Heater = new Heater('EcoWarm', 'HeatMaster 1000', 1800, 22);

        heater.setTemperature(25);

        expect(heater.getTemperature()).toBe(25);
        expect(heater.getDescription()).toContain('25°C');
    });

    it('SmartHeater should toggle wifi and describe status correctly', () => {
        const smartHeater: SmartHeater = new SmartHeater('HomeFlow', 'SmartHeat X', 1500, 20, false);

        smartHeater.enableWifi();

        expect(smartHeater.getDescription()).toContain('wifi enabled');
        smartHeater.disableWifi();
        expect(smartHeater.getDescription()).toContain('wifi disabled');
    });

    it('operateDevice should turn device on and off and return statuses', () => {
        const heater: Heater = new Heater('EcoWarm', 'HeatMaster 1000', 1800, 22);
        const result: string = operateDevice(heater, 10);

        expect(result).toContain('Operated for 10 minutes');
        expect(result).toContain('Status after on: EcoWarm HeatMaster 1000 is on');
        expect(result).toContain('Status after off: EcoWarm HeatMaster 1000 is off');
    });
});
