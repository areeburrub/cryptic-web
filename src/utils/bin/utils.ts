import * as bin from './index.ts';
import packageJson from '../../../package.json';

export const help = async (args: string[]): Promise<string> => {
  const commands = Object.keys(bin).sort().join('\n');

  return `Available commands:\n${commands}\n\n[tab]\t trigger completion.\n[ctrl+l] clear terminal.\n[ctrl+c] cancel command. <a target="__blank" href="help">goto</a>`;
};

export const echo = async (args: string[]): Promise<string> => {
  return args.join(' ');
};


export const banner = (args?: string[]): string => {
  return `
░█████╗░██████╗░██╗░░░██╗██████╗░████████╗██╗░█████╗░  ██╗░░██╗██╗░░░██╗███╗░░██╗████████╗
██╔══██╗██╔══██╗╚██╗░██╔╝██╔══██╗╚══██╔══╝██║██╔══██╗  ██║░░██║██║░░░██║████╗░██║╚══██╔══╝
██║░░╚═╝██████╔╝░╚████╔╝░██████╔╝░░░██║░░░██║██║░░╚═╝  ███████║██║░░░██║██╔██╗██║░░░██║░░░
██║░░██╗██╔══██╗░░╚██╔╝░░██╔═══╝░░░░██║░░░██║██║░░██╗  ██╔══██║██║░░░██║██║╚████║░░░██║░░░
╚█████╔╝██║░░██║░░░██║░░░██║░░░░░░░░██║░░░██║╚█████╔╝  ██║░░██║╚██████╔╝██║░╚███║░░░██║░░░
░╚════╝░╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░░░░░░░╚═╝░░░╚═╝░╚════╝░  ╚═╝░░╚═╝░╚═════╝░╚═╝░░╚══╝░░░╚═╝░░░

Type 'help' to see list of available commands.
--
Cryptic Hunt is a Event at MetaCognition
--
`;
};
