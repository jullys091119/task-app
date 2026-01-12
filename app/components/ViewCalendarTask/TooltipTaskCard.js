import { Tooltip } from "@heroui/react"
const TooltipCalendarTask = ({isOpen}) => {
    return (
        <Tooltip delay={0} isOpen={isOpen}>
            <Tooltip.Content>
                <p>This is a tooltip</p>
            </Tooltip.Content>
        </Tooltip>

    )
}
export default TooltipCalendarTask