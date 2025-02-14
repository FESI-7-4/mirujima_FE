import type { PartialBlock } from '@blocknote/core';

export const convertDataForEditor = async (defaultContent: string | undefined) => {
  if (!defaultContent) return undefined;

  const parsedValue = JSON.parse(defaultContent) as PartialBlock[];

  if (parsedValue) parsedValue.pop();

  return parsedValue;
};
