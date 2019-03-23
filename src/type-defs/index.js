import query from './query';
import mutation from './mutation';
import subscription from './subscription';
import { marker } from './types/marker';

export const typeDefs = [
  query,
  mutation,
  subscription,
  marker,
];