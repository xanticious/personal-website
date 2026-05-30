import styles from "./Placeholder.module.css";

type Props = {
  title: string;
  description: string;
};

export function Placeholder({ title, description }: Props) {
  return (
    <div className={styles.page}>
      <h1>{title}</h1>
      <p className={styles.description}>{description}</p>
      <p className={styles.note}>Coming soon.</p>
    </div>
  );
}
