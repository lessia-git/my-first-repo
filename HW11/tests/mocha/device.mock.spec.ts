import { expect } from 'chai';
import sinon from 'sinon';
import { Heater, SmartHeater } from '../../src/device';
import { operateDevice } from '../../src/utils';
import type { Operable } from '../../src/types';

describe('HW11 Mocha + Sinon tests', () => {
    let heater: Heater;
    let smartHeater: SmartHeater;
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        heater = new Heater('EcoWarm', 'HeatMaster 1000', 1800, 22);
        smartHeater = new SmartHeater('HomeFlow', 'SmartHeat X', 1500, 20, false);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should call Heater methods when turning on and off', () => {
        const turnOnSpy = sandbox.spy(heater, 'turnOn');
        const turnOffSpy = sandbox.spy(heater, 'turnOff');
        const statusSpy = sandbox.spy(heater, 'getStatus');

        heater.turnOn();
        heater.turnOff();
        heater.getStatus();

        expect(turnOnSpy.calledOnce).to.be.true;
        expect(turnOffSpy.calledOnce).to.be.true;
        expect(statusSpy.calledOnce).to.be.true;
        expect(heater.getStatus()).to.equal('EcoWarm HeatMaster 1000 is off');
    });

    it('should update temperature and call getDescription stub', () => {
        const descriptionStub = sandbox.stub(heater, 'getDescription').callsFake(() => `EcoWarm HeatMaster 1000 1800W appliance at ${heater.getTemperature()}°C`);

        heater.setTemperature(28);
        const description = heater.getDescription();

        expect(descriptionStub.calledOnce).to.be.true;
        expect(heater.getTemperature()).to.equal(28);
        expect(description).to.contain('28°C');
    });

    it('should enable and disable wifi on SmartHeater and use a stubbed getDescription', () => {
        const enableWifiSpy = sandbox.spy(smartHeater, 'enableWifi');
        const disableWifiSpy = sandbox.spy(smartHeater, 'disableWifi');
        const descriptionStub = sandbox.stub(smartHeater, 'getDescription').callsFake(() => `SmartHeat X wifi ${smartHeater.wifiEnabled ? 'enabled' : 'disabled'}`);

        smartHeater.enableWifi();
        expect(enableWifiSpy.calledOnce).to.be.true;
        expect(smartHeater.wifiEnabled).to.be.true;
        expect(smartHeater.getDescription()).to.equal('SmartHeat X wifi enabled');

        smartHeater.disableWifi();
        expect(disableWifiSpy.calledOnce).to.be.true;
        expect(smartHeater.wifiEnabled).to.be.false;
        expect(smartHeater.getDescription()).to.equal('SmartHeat X wifi disabled');
        expect(descriptionStub.callCount).to.equal(2);
    });

    it('should operate a stove-like device with stubbed status return values', () => {
        const fakeDevice: Operable = {
            turnOn: sandbox.stub().returns(undefined),
            turnOff: sandbox.stub().returns(undefined),
            getStatus: sandbox.stub()
                .onFirstCall().returns('fake-on')
                .onSecondCall().returns('fake-off')
        };

        const result = operateDevice(fakeDevice, 15);

        expect((fakeDevice.turnOn as sinon.SinonStub).calledOnce).to.be.true;
        expect((fakeDevice.turnOff as sinon.SinonStub).calledOnce).to.be.true;
        expect((fakeDevice.getStatus as sinon.SinonStub).callCount).to.equal(2);
        expect(result).to.equal('Operated for 15 minutes. Status after on: fake-on. Status after off: fake-off.');
    });

    it('should use stubbed SmartHeater getStatus values in operateDevice', () => {
        const turnOnStub = sandbox.stub(smartHeater, 'turnOn').callsFake(() => { smartHeater.wifiEnabled = true; });
        const turnOffStub = sandbox.stub(smartHeater, 'turnOff').callsFake(() => { smartHeater.wifiEnabled = false; });
        const statusStub = sandbox.stub(smartHeater, 'getStatus')
            .onFirstCall().returns('smart-on')
            .onSecondCall().returns('smart-off');

        const result = operateDevice(smartHeater, 20);

        expect(turnOnStub.calledOnce).to.be.true;
        expect(turnOffStub.calledOnce).to.be.true;
        expect(statusStub.callCount).to.equal(2);
        expect(result).to.equal('Operated for 20 minutes. Status after on: smart-on. Status after off: smart-off.');
    });
});
