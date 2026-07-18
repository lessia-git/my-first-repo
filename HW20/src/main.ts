import { setDefaultTimeout, setWorldConstructor } from '@cucumber/cucumber';
import { RobotDreamsWorld } from './worlds/robot-dreams.world';

setDefaultTimeout(999999999);
setWorldConstructor(RobotDreamsWorld);
