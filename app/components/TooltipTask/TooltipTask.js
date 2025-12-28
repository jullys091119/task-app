import { Tooltip } from "@heroui/react";
import styles from "./TooltipTask.module.css"

export function TooltipTask({ isOpen, description, close }) {
   
    return (
        <Tooltip isOpen={isOpen}>
            <Tooltip.Trigger>
               
            </Tooltip.Trigger>
            <Tooltip.Content  className={styles.tooltipColor}>
                <Tooltip.Arrow />
                {description}
            </Tooltip.Content>
        </Tooltip>
    );
}