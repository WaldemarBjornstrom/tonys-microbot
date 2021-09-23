//% weight=100 color=#00A654 icon="\uf1b9" block="Tony's Micro:bot"
namespace tonys_microbot {

    let Left_Detector = 0
    let Right_Detector = 0
    let speed = 30

    pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
    pins.setPull(DigitalPin.P16, PinPullMode.PullUp)
    Right_Detector = pins.digitalReadPin(DigitalPin.P15)
    Left_Detector = pins.digitalReadPin(DigitalPin.P16)

    /**
    * Kör framåt i den angivna hastigheten
    */
    //% blockId=tonys_microbot_servos_forward
    //% block="Kör framåt"
    //% parts="Tony's micro:bot"
    export function forward(): void {
        servos.P1.run(speed)
        servos.P2.run(-speed)
    }

    /**
    * Kör vänster i den angivna hastigheten
    */
    //% blockId=tonys_microbot_servos_left
    //% block="Sväng vänster"
    //% parts="Tony's micro:bot"
    export function left(): void {
        servos.P1.run(speed)
        servos.P2.run(speed * -0.333333)
    }

    /**
    * Kör höger i den angivna hastigheten
    */
    //% blockId=tonys_microbot_servos_right
    //% block="Sväng höger"
    //% parts="Tony's micro:bot"
    export function right(): void {
        servos.P1.run(speed * 0.333333)
        servos.P2.run(-speed)
    }

    /**
    * Stoppa motorerna
    */
    //% blockId=tonys_microbot_servos_stop
    //% block="Stanna"
    //% parts="Tony's micro:bot"
    export function stop(): void {
        servos.P1.run(0)
        servos.P2.run(0)
    }

    /**
    * Ställer in motorhastigheten
    * @param sspeed : Hastighet från 0 till 100
    */
    //% blockId=tonys_microbot_set_motor_speed
    //% block="Ställ in motorhastigheten till %speed|Procent"
    //% sspeed.min=0 speed.max=100
    //% parts="Tony's micro:bot"
    export function set_motor_speed(sspeed = 100): void {
        sspeed = speed
    }

}