import React from 'react';
import { History as HistoryInterface } from '../../interfaces/history.ts';
import { Ps1 } from '../ps1/Ps1.tsx';
import styles from './history.module.css';

export const History: React.FC<{ history: Array<HistoryInterface> }> = ({
  history,
}) => {
  return (
    <>
      {history.map((entry: HistoryInterface, index: number) => (
        <div key={entry.command + index}>
          <div className={styles.input}>
            <div className="flex-shrink">
              <Ps1 />
            </div>

            <div className={styles.command}>{entry.command}</div>
          </div>

          <p
            className={styles.output}
            style={{ lineHeight: 'normal' }}
            dangerouslySetInnerHTML={{ __html: entry.output }}
          />
        </div>
      ))}
    </>
  );
};

export default History;
