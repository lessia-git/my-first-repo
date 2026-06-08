import { expect as chaiExpect } from 'chai';
import { operateDevice } from '../../src/utils';
import { Heater } from '../../src/device';

describe('operateDevice utility', () => {
    test('should operate device and return status messages', () => {
        const heater: Heater = new Heater('EcoWarm', 'HeatMaster 1000', 1800, 22);
        const result: string = operateDevice(heater, 12);

        expect(result).toContain('Operated for 12 minutes');
        chaiExpect(result).to.include('Status after on: EcoWarm HeatMaster 1000 is on');
        chaiExpect(result).to.include('Status after off: EcoWarm HeatMaster 1000 is off');
        expect(heater.getStatus()).toBe('EcoWarm HeatMaster 1000 is off');
    });

    test('should work with SmartHeater and maintain object status after call', () => {
        const smartHeater: Heater = new Heater('HomeFlow', 'SmartHeat X', 1500, 20);
        const result: string = operateDevice(smartHeater, 5);

        expect(result).toContain('Operated for 5 minutes');
        chaiExpect(result).to.include('Status after on: HomeFlow SmartHeat X is on');
        chaiExpect(result).to.include('Status after off: HomeFlow SmartHeat X is off');
        expect(smartHeater.getTemperature()).toBe(20);
        expect(smartHeater.getStatus()).toBe('HomeFlow SmartHeat X is off');
    });
});
