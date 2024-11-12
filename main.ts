let FR = 0
let LR = 0
basic.showIcon(IconNames.No)
radio.setGroup(200)
pins.digitalWritePin(DigitalPin.P13, 1)
pins.digitalWritePin(DigitalPin.P14, 1)
pins.digitalWritePin(DigitalPin.P15, 1)
pins.digitalWritePin(DigitalPin.P16, 1)
pins.digitalWritePin(DigitalPin.P8, 1)
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P8) == 0) {
        pins.digitalWritePin(DigitalPin.P8, 1)
        radio.sendString("S")
        basic.showIcon(IconNames.No)
    } else if (pins.digitalReadPin(DigitalPin.P14) == 0) {
        pins.digitalWritePin(DigitalPin.P14, 1)
        radio.sendString("LEDR")
        basic.showArrow(ArrowNames.SouthEast)
    } else if (pins.digitalReadPin(DigitalPin.P16) == 0) {
        pins.digitalWritePin(DigitalPin.P16, 1)
        radio.sendString("LEDL")
        basic.showArrow(ArrowNames.SouthWest)
    } else if (pins.digitalReadPin(DigitalPin.P13) == 0) {
        pins.digitalWritePin(DigitalPin.P13, 1)
        radio.sendString("LEDALL")
        basic.showIcon(IconNames.Heart)
    } else if (input.buttonIsPressed(Button.A)) {
        radio.sendString("DOWN")
    } else if (input.buttonIsPressed(Button.B)) {
        radio.sendString("UP")
    } else if (input.isGesture(Gesture.Shake)) {
        radio.sendString("S")
        basic.showIcon(IconNames.No)
    } else if (pins.digitalReadPin(DigitalPin.P15) == 0) {
        pins.digitalWritePin(DigitalPin.P15, 1)
        radio.sendString("LEDOFF")
    }
    LR = pins.analogReadPin(AnalogReadWritePin.P1)
    FR = pins.analogReadPin(AnalogReadWritePin.P2)
    if (FR > 550 && (LR > 400 && LR < 600)) {
        radio.sendValue("F", pins.analogReadPin(AnalogReadWritePin.P2))
        basic.showArrow(ArrowNames.North)
    } else if (FR < 450 && (LR > 400 && LR < 600)) {
        radio.sendValue("B", pins.analogReadPin(AnalogReadWritePin.P2))
        basic.showArrow(ArrowNames.South)
    } else if (LR < 450 && (FR > 400 && FR < 600)) {
        radio.sendValue("L", pins.analogReadPin(AnalogReadWritePin.P1))
        basic.showArrow(ArrowNames.West)
    } else if (LR > 550 && (FR > 400 && FR < 600)) {
        radio.sendValue("R", pins.analogReadPin(AnalogReadWritePin.P1))
        basic.showArrow(ArrowNames.East)
    } else {
        radio.sendString("SLEEP")
    }
    basic.pause(100)
    basic.clearScreen()
})
