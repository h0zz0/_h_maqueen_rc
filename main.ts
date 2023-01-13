let FR = 0
let LR = 0
basic.showIcon(IconNames.No)
radio.setGroup(200)
pins.digitalWritePin(DigitalPin.P13, 0)
pins.digitalWritePin(DigitalPin.P14, 0)
pins.digitalWritePin(DigitalPin.P15, 0)
pins.digitalWritePin(DigitalPin.P16, 0)
basic.forever(function () {
    if (pins.digitalReadPin(DigitalPin.P15) == 0) {
        radio.sendString("S")
    } else if (pins.digitalReadPin(DigitalPin.P14) == 0) {
        radio.sendString("LEDR")
    } else if (pins.digitalReadPin(DigitalPin.P16) == 0) {
        radio.sendString("LEDL")
    } else if (pins.digitalReadPin(DigitalPin.P13) == 0) {
        radio.sendString("LEDALL")
    } else {
        LR = pins.analogReadPin(AnalogPin.P1)
        FR = pins.analogReadPin(AnalogPin.P2)
        if (FR > 550 && (LR > 400 && LR < 600)) {
            radio.sendValue("F", pins.analogReadPin(AnalogPin.P2))
            basic.showArrow(ArrowNames.North)
        } else if (FR < 450 && (LR > 400 && LR < 600)) {
            radio.sendValue("B", pins.analogReadPin(AnalogPin.P2))
            basic.showArrow(ArrowNames.South)
        } else if (LR < 450 && (FR > 400 && FR < 600)) {
            radio.sendValue("L", pins.analogReadPin(AnalogPin.P1))
            basic.showArrow(ArrowNames.West)
        } else if (LR > 550 && (FR > 400 && FR < 600)) {
            radio.sendValue("R", pins.analogReadPin(AnalogPin.P1))
            basic.showArrow(ArrowNames.East)
        } else {
            radio.sendString("S")
        }
        basic.pause(100)
        basic.clearScreen()
    }
})
