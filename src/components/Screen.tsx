import { ThemeSettings } from '../helpers/typesAndArrays.ts'

interface Props {
    showScreen: string | number
    borderRadiusTopOrBottom: 'top' | 'bottom'
    liveScreen: boolean
    colorTheme: ThemeSettings
}

export const Screen = (props: Props) => {
    const screenColor: string = props.colorTheme.backgroundColorScreen
    const fontColor: string = props.colorTheme.fontColorScreen

    return (
        <>
            <div
                style={
                    props.borderRadiusTopOrBottom === 'top'
                        ? { backgroundColor: screenColor, color: fontColor, borderRadius: '10px 10px 0 0' }
                        : { backgroundColor: screenColor, color: fontColor, borderRadius: '0 0 10px 10px' }
                }
                className={'screen-default'}
            >
                {props.liveScreen ? <h6 className={'live-calc'}>live</h6> : null}
                <h2 style={{ fontFamily: 'League Spartan' }}>{props.showScreen}</h2>
            </div>
        </>
    )
}
