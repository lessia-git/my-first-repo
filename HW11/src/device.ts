import type { Operable, TemperatureControl } from './types';

export abstract class Device implements Operable {
    protected isOn: boolean;

    public constructor(public manufacturer: string, public model: string) {
        this.isOn = false;
    }

    public turnOn(): void {
        this.isOn = true;
    }

    public turnOff(): void {
        this.isOn = false;
    }

    public getStatus(): string {
        return `${this.manufacturer} ${this.model} is ${this.isOn ? 'on' : 'off'}`;
    }

    public abstract getDescription(): string;
}

export class Appliance extends Device {
    public constructor(manufacturer: string, model: string, public powerWatts: number) {
        super(manufacturer, model);
    }

    public getDescription(): string {
        return `${this.manufacturer} ${this.model} ${this.powerWatts}W appliance`;
    }
}

export class Heater extends Appliance implements TemperatureControl {
    protected temperature: number;

    public constructor(manufacturer: string, model: string, powerWatts: number, temperature: number) {
        super(manufacturer, model, powerWatts);
        this.temperature = temperature;
    }

    public setTemperature(value: number): void {
        this.temperature = value;
    }

    public getTemperature(): number {
        return this.temperature;
    }

    public getDescription(): string {
        return `${super.getDescription()} at ${this.temperature}°C`;
    }
}

export class SmartHeater extends Heater {
    public constructor(manufacturer: string, model: string, powerWatts: number, temperature: number, public wifiEnabled: boolean) {
        super(manufacturer, model, powerWatts, temperature);
    }

    public enableWifi(): void {
        this.wifiEnabled = true;
    }

    public disableWifi(): void {
        this.wifiEnabled = false;
    }

    public getDescription(): string {
        return `${super.getDescription()} wifi ${this.wifiEnabled ? 'enabled' : 'disabled'}`;
    }
}
