import type { Operable } from './types';

export function operateDevice(device: Operable, durationMinutes: number): string {
    device.turnOn();
    const statusAfterOn: string = device.getStatus();
    device.turnOff();
    const statusAfterOff: string = device.getStatus();

    return `Operated for ${durationMinutes} minutes. Status after on: ${statusAfterOn}. Status after off: ${statusAfterOff}.`;
}
