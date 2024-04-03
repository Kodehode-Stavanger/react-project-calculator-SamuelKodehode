import { Button } from './Button.tsx'
import { useState } from 'react'
import { Screen } from './Screen.tsx'
import { inputMappings, numberArray, Theme, ThemeSettings } from '../helpers/typesAndArrays.ts'
import { themes } from '../helpers/theme.ts'
import Switch from './Switch.tsx'

export const Calculator = () => {
    const [sum, setSum] = useState<string>('')
    const [calculation, setCalculation] = useState<string[]>([])
    const [drawScreen, setDrawScreen] = useState<string[]>([])
    const [theme, setTheme] = useState<Theme>(Theme.Theme1)
    const colorTheme: ThemeSettings = themes[`theme${theme}`]
    const bgColorButtons: string = colorTheme.backgroundColorButtons
    const bgColor: string = colorTheme.backgroundColor

    const handleNumberArray = (inputNumber: string): void => {
        const screenInput: string = inputMappings[inputNumber] || inputNumber

        if (inputNumber === '=') {
            const result = eval(calculation.join(''))
            setSum(result)
            setCalculation([result.toString()])
            setDrawScreen([result.toString()])
        } else if (inputNumber === 'del') {
            setCalculation((current: string[]): [string] | string[] => {
                return calculation.length === 1 ? [' '] : current.slice(0, -1)
            })
            setDrawScreen((current: string[]): [string] | string[] => {
                return drawScreen.length === 1 ? [' '] : current.slice(0, -1)
            })
            setSum(eval(calculation.slice(0, -1).join('')))
        } else if (inputNumber === 'reset') {
            setCalculation([])
            setDrawScreen([])
            setSum('')
        } else {
            setDrawScreen((prevState: string[]) => [...prevState, screenInput])
            setCalculation((current: string[]) => [...current, inputNumber])
            setSum(eval(calculation.join('') + inputNumber))
        }
    }

    const handleThemeCount = (): void => {
        switch (theme) {
            case Theme.Theme1:
                setTheme(Theme.Theme2)
                break
            case Theme.Theme2:
                setTheme(Theme.Theme3)
                break
            case Theme.Theme3:
                setTheme(Theme.Theme1)
                break
            default:
                setTheme(Theme.Theme1)
                break
        }
    }

    return (
        <div
            className={'full-page'}
            style={{
                backgroundColor: bgColor
            }}
        >
            <div className={'calc-wrapper'}>
                <div className={'top-wrapper'}>
                    <h2 style={{ color: colorTheme.fontColorScreen, overflow: 'visible' }}>calc</h2>
                    <Switch theme={theme} colorTheme={colorTheme} handler={() => handleThemeCount()} />
                </div>
                <Screen colorTheme={colorTheme} liveScreen={true} borderRadiusTopOrBottom={'top'} showScreen={sum} />
                <Screen
                    colorTheme={colorTheme}
                    liveScreen={false}
                    borderRadiusTopOrBottom={'bottom'}
                    showScreen={drawScreen.join('')}
                />
                <div className={'calculator-default'} style={{ backgroundColor: bgColorButtons }}>
                    {numberArray.map((numberInput: string) => {
                        return (
                            <Button
                                colorTheme={colorTheme}
                                key={numberInput}
                                handleInput={handleNumberArray}
                                sym={numberInput}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
