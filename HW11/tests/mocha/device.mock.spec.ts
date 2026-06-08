import { expect } from 'chai';
import sinon from 'sinon';
import { Heater, SmartHeater } from '../../src/device';
import { operateDevice } from '../../src/utils';
import type { Operable } from '../../src/types';

describe('HW11 Mocha + Sinon tests', () => {
    let heater: Heater;
    let smartHeater: SmartHeater;

    beforeEach(() => {
        heater = new Heater('EcoWarm', 'HeatMaster 1000', 1800, 22);
        smartHeater = new SmartHeater('HomeFlow', 'SmartHeat X', 1500, 20, false);
    });

    it('Heater should switch on and off and report status', () => {
        heater.turnOn();
        expect(heater.getStatus()).to.equal('EcoWarm HeatMaster 1000 is on');
        heater.turnOff();
        expect(heater.getStatus()).to.equal('EcoWarm HeatMaster 1000 is off');
    });

    it('Heater temperature setter should update internal temperature', () => {
        heater.setTemperature(28);
        expect(heater.getTemperature()).to.equal(28);
        expect(heater.getDescription()).to.include('28°C');
    });

    it('SmartHeater should enable and disable wifi and update description', () => {
        smartHeater.enableWifi();
        expect(smartHeater.getDescription()).to.include('wifi enabled');
        smartHeater.disableWifi();
        expect(smartHeater.getDescription()).to.include('wifi disabled');
    });

    it('operateDevice should call device methods in order with default status values', () => {
        const turnOnSpy = sinon.spy(heater, 'turnOn');
        const turnOffSpy = sinon.spy(heater, 'turnOff');
        const statusSpy = sinon.spy(heater, 'getStatus');

        const result = operateDevice(heater, 7);

        expect(turnOnSpy.calledOnce).to.be.true;
        expect(turnOffSpy.calledOnce).to.be.true;
        expect(statusSpy.callCount).to.equal(2);
        expect(result).to.contain('Operated for 7 minutes');
        expect(result).to.contain('Status after on: EcoWarm HeatMaster 1000 is on');
        expect(result).to.contain('Status after off: EcoWarm HeatMaster 1000 is off');

        turnOnSpy.restore();
        turnOffSpy.restore();
        statusSpy.restore();
    });

    it('operateDevice should use mocked Operable implementation for custom statuses', () => {
        const fakeDevice: Operable = {
            turnOn: sinon.stub().returns(undefined),
            turnOff: sinon.stub().returns(undefined),
            getStatus: sinon.stub()
                .onFirstCall().returns('mock-on')
                .onSecondCall().returns('mock-off')
        };

        const result = operateDevice(fakeDevice, 11);

        expect((fakeDevice.turnOn as sinon.SinonStub).calledOnce).to.be.true;
        expect((fakeDevice.turnOff as sinon.SinonStub).calledOnce).to.be.true;
        expect((fakeDevice.getStatus as sinon.SinonStub).callCount).to.equal(2);
        expect(result).to.equal('Operated for 11 minutes. Status after on: mock-on. Status after off: mock-off.');
    });
});
