import { useMatomo } from '@datapunt/matomo-tracker-react';
import React from 'react';
import { commandExists } from '../../utils/commandExists.ts';
import { shell } from '../../utils/shell.ts';
import { handleTabCompletion } from '../../utils/tabCompletion.ts';
import { Ps1 } from '../ps1/Ps1.tsx';

import styles from './Input.module.css';

export const Input = ({
  inputRef,
  containerRef,
  command,
  history,
  lastCommandIndex,
  setCommand,
  setHistory,
  setLastCommandIndex,
  clearHistory,
}) => {
  const { trackEvent } = useMatomo();
  const onSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    const commands: [string] = history
      .map(({ command }) => command)
      .filter((command: string) => command);

    if (event.key === 'c' && event.ctrlKey) {
      event.preventDefault();

      setCommand('');

      setHistory('');

      setLastCommandIndex(0);
    }

    if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault();

      clearHistory();
    }

    if (event.key === 'Tab') {
      event.preventDefault();

      handleTabCompletion(command, setCommand);
    }

    if (event.key === 'Enter' || event.code === '13') {
      event.preventDefault();

      setLastCommandIndex(0);

      await shell(history, command, setHistory, clearHistory, setCommand);

      trackEvent({ category: 'Command Executed', action: command });

      containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();

      if (!commands.length) {
        return;
      }

      const index: number = lastCommandIndex + 1;

      if (index <= commands.length) {
        setLastCommandIndex(index);
        setCommand(commands[commands.length - index]);
      }
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();

      if (!commands.length) {
        return;
      }

      const index: number = lastCommandIndex - 1;

      if (index > 0) {
        setLastCommandIndex(index);
        setCommand(commands[commands.length - index]);
      } else {
        setLastCommandIndex(0);
        setCommand('');
      }
    }
  };

  const onChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(value);
  };

  return (
    <div className={styles.input}>
      <label htmlFor="prompt" className="flex-shrink">
        <Ps1 />
      </label>

      <input
        ref={inputRef}
        id="prompt"
        type="text"
        className={[styles.command,commandExists(command) ? styles.commandExists : null ]}
        value={command}
        onChange={onChange}
        autoFocus
        onKeyDown={onSubmit}
        autoComplete="off"
      />
    </div>
  );
};

export default Input;
