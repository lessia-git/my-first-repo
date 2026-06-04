export interface Operable {
    turnOn(): void;
    turnOff(): void;
    getStatus(): string;
}

export interface TemperatureControl {
    setTemperature(value: number): void;
    getTemperature(): number;
}
