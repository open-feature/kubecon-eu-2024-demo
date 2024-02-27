import { OpenFeature } from '@openfeature/server-sdk';
import { Request, Response } from 'express';

export const index = async (_: Request, res: Response) => {

  const client = OpenFeature.getClient();
  const hexColor = await client.getStringValue('hex-color', '000');
  const emojiCode = await client.getNumberValue('emoji-code', 0);
  res.render("index", { title: "Demo", hexColor, emojiCode });

};
