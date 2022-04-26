import { db, auth } from "../../firebase";
import {
  doc,
  getDocs,
  query,
  collection,
  where,
  orderBy,
  getDoc
} from "firebase/firestore";

export const instagram = async (args: string[]): Promise<string> => {


  return 'Opening instagram...';
};

export const github = async (args: string[]): Promise<string> => {

  return 'Opening github...';
};

export const linkedin = async (args: string[]): Promise<string> => {

  return `
'hello'
  `;
};
