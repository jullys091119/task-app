import { Avatar } from '@heroui/react';
import { Bell } from 'lucide-react';
import styles from "./Header.module.css"

export const HeaderApp = () => {
  return (
    <div className={styles.header}>
      <div className={styles.avatarContent}>
        <Avatar>
          <Avatar.Image />
          <Avatar.Fallback />
        </Avatar>
        <p>Buenos días</p>
        <p>Juliá Ontiveros</p>
      </div>
      <div>
        <Bell absoluteStrokeWidth />
      </div>
    </div>
  )
}



