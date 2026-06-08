import { expect } from 'chai';
import { Heater, SmartHeater } from '../../src/device';

describe('Device class methods', () => {
    let heater: Heater;
    let smartHeater: SmartHeater;

    before(() => {
        heater = new Heater('EcoWarm', 'HeatMaster 1000', 1800, 22);
        smartHeater = new SmartHeater('HomeFlow', 'SmartHeat X', 1500, 20, false);
    });

    it('heater should report on/off status correctly', () => {
        heater.turnOn();
        expect(heater.getStatus()).to.equal('EcoWarm HeatMaster 1000 is on');
        heater.turnOff();
        expect(heater.getStatus()).to.equal('EcoWarm HeatMaster 1000 is off');
    });

    it('heater should update temperature and description', () => {
        heater.setTemperature(27);
        expect(heater.getTemperature()).to.equal(27);
        expect(heater.getDescription()).to.include('27°C');
    });

    it('smart heater should toggle wifi and keep temperature description', () => {
        smartHeater.enableWifi();
        expect(smartHeater.getDescription()).to.include('wifi enabled');
        smartHeater.disableWifi();
        expect(smartHeater.getDescription()).to.include('wifi disabled');
    });

    it('appliance and smart heater should inherit description and default status behavior', () => {
        const applianceDescription: string = heater.getDescription();
        expect(applianceDescription).to.include('EcoWarm HeatMaster 1000');
        expect(applianceDescription).to.include('1800W appliance');
        expect(heater.getStatus()).to.equal('EcoWarm HeatMaster 1000 is off');

        smartHeater.turnOn();
        expect(smartHeater.getStatus()).to.equal('HomeFlow SmartHeat X is on');
        smartHeater.turnOff();
        expect(smartHeater.getStatus()).to.equal('HomeFlow SmartHeat X is off');
    });
});
