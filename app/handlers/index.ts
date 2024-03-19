import { OpenFeature } from '@openfeature/server-sdk';
import { parseContext } from './util';
import { Request, Response } from 'express';

export const indexHandler = async (req: Request, res: Response) => {

  const client = OpenFeature.getClient();
  const context = parseContext(req);
  const hexColor = await client.getStringValue('hex-color', '000', context);
  const emoji = await client.getStringValue('emoji', "", context);

  res.render("index", { title: "Demo", hexColor, emoji });
};

export const errorHandler = (err: any, req: Request, res: Response) => {
  console.error(err);
  res.render("index", { title: "Error", hexColor: '000', emoji: '⚠️' });
};
