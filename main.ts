function Enemy () {
    Ezra = game.createSprite(randint(0, 4), 0)
    for (let index = 0; index < 4; index++) {
        basic.pause(Timer)
        Ezra.change(LedSpriteProperty.Y, 1)
    }
}
input.onButtonPressed(Button.A, function () {
    Aria.move(-1)
})
input.onGesture(Gesture.Shake, function () {
    music.setVolume(66)
    for (let index = 0; index < 4; index++) {
        music.startMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once)
    }
})
input.onButtonPressed(Button.AB, function () {
    control.reset()
})
input.onButtonPressed(Button.B, function () {
    Aria.move(1)
})
let Ezra: game.LedSprite = null
let Aria: game.LedSprite = null
let Timer = 0
let strip = neopixel.create(DigitalPin.P0, 24, NeoPixelMode.RGB)
Timer = 500
music.startMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once)
basic.showString("DodgeTec")
game.setScore(0)
Aria = game.createSprite(2, 4)
Aria.set(LedSpriteProperty.Brightness, 6)
basic.forever(function () {
    Enemy()
    if (Ezra.isTouching(Aria)) {
        basic.showLeds(`
            # . . . .
            . # . . .
            . . # . .
            . . . # .
            . . . . #
            `)
        basic.showLeds(`
            . . . . #
            . . . # .
            . . # . .
            . # . . .
            # . . . .
            `)
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
    }
    if (Ezra.isTouchingEdge()) {
        strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
        game.addScore(1)
        Ezra.delete()
        if (game.score() >= 15) {
            basic.pause(100)
            music.startMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once)
            Timer = 200
            Ezra.set(LedSpriteProperty.Brightness, 8)
        }
        if (game.score() == 15) {
            strip.showColor(neopixel.colors(NeoPixelColors.Green))
            basic.showString("2 level")
        }
        if (game.score() >= 25) {
            strip.showColor(neopixel.colors(NeoPixelColors.Orange))
            basic.showString("Congrats")
            basic.showIcon(IconNames.SmallDiamond)
            basic.showIcon(IconNames.Diamond)
            basic.pause(100)
            basic.clearScreen()
        }
    }
})
