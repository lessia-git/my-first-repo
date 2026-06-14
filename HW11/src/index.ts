import { Heater, SmartHeater } from './device';
import { operateDevice } from './utils';

function main(): void {
    const heater: Heater = new Heater('EcoWarm', 'HeatMaster 1000', 1800, 22);
    const smartHeater: SmartHeater = new SmartHeater('HomeFlow', 'SmartHeat X', 1500, 20, false);

    const resultOne: string = operateDevice(heater, 15);
    smartHeater.enableWifi();
    smartHeater.setTemperature(24);
    const resultTwo: string = operateDevice(smartHeater, 25);

    console.log(heater.getDescription());
    console.log(resultOne);
    console.log(smartHeater.getDescription());
    console.log(resultTwo);
}

main();
