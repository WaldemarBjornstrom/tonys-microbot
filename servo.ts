/**
 * Blocks for driving the Kitronik Servo:Lite Board
 */
//% weight=100 color=#00A654 icon="\uf1b9" block="Tony's Micro:bot"
namespace tonys_microbot {

    /************************************************************************************************************************************************
    * micro:bit Servo:Lite-WB / :MOVE mini blocks
    ************************************************************************************************************************************************/

    /*some parameters used for controlling the turn and length of the ServoLite board controlled :MOVE mini */
    const microSecInASecond = 1000000
    let distancePerSec = 100
    let numberOfDegreesPerSec = 200
    let setspeed = 100
    let Pi1 = AnalogPin.P1
    let Pi2 = AnalogPin.P8

    /**
     * Drives forwards. Call stop to stop
     */
    //% blockId=tonys_microbot_servos_forward
    //% block="drive forward"
    //% parts="Tony's micro:bot"
    export function forward(): void {
        let P1speed = 90 - (setspeed * 90) / 100
        let P2speed = (setspeed * 90) / 100 + 90
        pins.servoWritePin(Pi1, P1speed);
        pins.servoWritePin(Pi2, P2speed);
    }

    /**
     * Drives backwards. Call stop to stop
     */
    //% blockId=tonys_microbot_servos_backward
    //% block="drive backward"¨
    //% parts="Tony's micro:bot"
    export function backward(): void {
        let P2speed = 90 - (setspeed * 90) / 100
        let P1speed = (setspeed * 90) / 100 + 90
        pins.servoWritePin(Pi1, P1speed);
        pins.servoWritePin(Pi2, P2speed);
    }

    /**
    * Turns left. Call stop to stop
    */
    //% blockId=tonys_microbot_servos_left
    //% block="turn left"
    //% parts="Tony's micro:bot"
    export function left(): void {
        let P1speed = 90 - (setspeed * 90) / 100
        let P2speed = 90 - (setspeed * 90) / 100
        pins.servoWritePin(Pi1, P1speed);
        pins.servoWritePin(Pi2, P2speed);
    }

    /**
     * Turns right. Call ``stop`` to stop
     */
    //% blockId=tonys_microbot_servos_right
    //% block="turn right"
    //% parts="Tony's micro:bot"
    export function right(): void {
        let P2speed = (setspeed * 90) / 100 + 90
        let P1speed = (setspeed * 90) / 100 + 90
        pins.servoWritePin(Pi1, P1speed);
        pins.servoWritePin(Pi2, P2speed);
    }

    /**
     * Stop for 360 servos.
     * rather than write 90, which may not stop the servo moving if it is out of trim
     * this stops sending servo pulses, which has the same effect.
     * On a normal servo this will stop the servo where it is, rather than return it to neutral position.
     * It will also not provide any holding force.
     */
    //% blockId=tonys_microbot_servos_stop
    //% block="stop"
    //% parts="Tony's micro:bot"
    export function stop(): void {
        pins.analogWritePin(Pi1, 0);
        pins.analogWritePin(Pi2, 0);
    }

    /**
     * Sends servos to 'neutral' position.
     * On a well trimmed 360 this is stationary, on a normal servo this is 90 degrees.
     */
    //% blockId=tonys_microbot_servos_neutral
    //% block="goto neutral position"
    //% parts="Tony's micro:bot"
    export function neutral(): void {
        pins.servoWritePin(Pi1, 90);
        pins.servoWritePin(Pi2, 90);
    }

    /**
     * Drives forwards the requested distance and then stops
     * @param howFar distance to move
     */
    //% blockId=tonys_microbot_drive_forwards
    //% block="drive forwards %howFar|distance" 
    //% parts="Tony's micro:bot"
    export function driveForwards(howFar: number): void {
        let timeToWait = (howFar * microSecInASecond) / distancePerSec; // calculation done this way round to avoid zero rounding
        forward();
        control.waitMicros(timeToWait);
        stop();
    }

    /**
     * Drives backwards the requested distance and then stops
     * @param howFar distance to move
     */
    //% blockId=tonys_microbot_drive_backwards
    //% block="drive backwards %howFar|distance" 
    //% parts="Tony's micro:bot"
    export function driveBackwards(howFar: number): void {
        let timeToWait = (howFar * microSecInASecond) / distancePerSec; // calculation done this way round to avoid zero rounding
        backward();
        control.waitMicros(timeToWait);
        stop();
    }

    /**
     * Turns right through the requested degrees and then stops
     * needs NumberOfDegreesPerSec tuned to make accurate, as it uses
     * a simple turn, wait, stop method.
     * Runs the servos at slower than the right function to reduce wheel slip
     * @param deg how far to turn, eg: 90
     */
    //% blockId=tonys_microbot_turn_right
    //% block="turn right %deg|degrees"
    //% parts="Tony's micro:bot"
    export function turnRight(deg: number): void {
        let timeToWait = (deg * microSecInASecond) / numberOfDegreesPerSec;// calculation done this way round to avoid zero rounding
        pins.servoWritePin(Pi1, 130);
        pins.servoWritePin(Pi2, 130);
        control.waitMicros(timeToWait);
        stop();
    }

    /**
    * Turns left through the requested degrees and then stops
    * needs NumberOfDegreesPerSec tuned to make accurate, as it uses
    * a simple turn, wait, stop method.
    * Runs the servos at slower than the right function to reduce wheel slip
    * @param deg how far to turn, eg: 90
    */
    //% blockId=tonys_microbot_turn_left
    //% block="turn left %deg|degrees"
    //% parts="Tony's micro:bot"
    export function turnLeft(deg: number): void {
        let timeToWait = (deg * microSecInASecond) / numberOfDegreesPerSec;// calculation done this way round to avoid zero rounding
        pins.servoWritePin(Pi1, 50);
        pins.servoWritePin(Pi2, 50);
        control.waitMicros(timeToWait);
        stop()
    }

    /**
     * Allows the setting of the :MOVE mini turn speed.
     * This allows tuning for the turn x degrees commands
     * @param degPerSec : How many degrees per second the mini does.
     */
    //% blockId=tonys_microbot_set_turn_speed_param
    //% block="calibrate turn speed to %DegPerSec|degrees per second"
    //% parts="Tony's micro:bot"
    export function setDegreesPerSecond(degPerSec: number): void {
        numberOfDegreesPerSec = degPerSec
    }

    /**
     * Allows the setting of the :MOVE mini forward / reverse speed.
     * This allows tuning for the move x distance commands
     * @param DegPerSec : How many degrees per second the mini does.
     */
    //% blockId=tonys_microbot_set_movement_speed_param 
    //% block="calibrate forward speed to %DistPerSec|mm per second"
    //% parts="Tony's micro:bot"
    export function setDistancePerSecond(distPerSec: number): void {
        distancePerSec = distPerSec
    }

    /**
    * Sets the servo speed to a number from 1 to 100
    * @param speed : Speed from 0 to 100
    */
    //% blockId=tonys_microbot_set_motor_speed
    //% block="set motor speed %speed"
    //% speed.min=0 speed.max=100
    //% parts="Tony's micro:bot"
    export function set_motor_speed(speed = 100): void {
        setspeed = speed
    }

    /**
    * Sets the servo pins to other than P1 and P2
    */
    //% blockId=tonys_microbot_set_pins
    //% block="Servo 1: %pin| Servo 2: %pin2"
    //% parts="Tony's micro:bot" advanced=true
    export function set_pins(pin: AnalogPin, pin2: AnalogPin): void {
        Pi1 = pin
        Pi2 = pin2
    }
}