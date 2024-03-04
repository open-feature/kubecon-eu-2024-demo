import { OpenFeature } from '@openfeature/server-sdk';
import { Request, Response } from 'express';

type AppSpecificContext = {
  /**
   * Value of the user User-Agent header
   */
  userAgent?: string;
  /**
   * Value of window.outerHeight
   */
  windowHeight?: number;
  /**
   * Value of window.outerWidth
   */
  windowWidth?: number;
  /**
   * Value of battery.level * 100
   */
  batteryPercentage?: number,
  /**
   * Value of "navigator.language"
   */
  language?: string
  /**
   * Value of navigator.connection.effectiveType
   */
  connectionType?: string
};

export const index = async (req: Request, res: Response) => {

  const client = OpenFeature.getClient();
  const context = generateContext(req);
  console.log(context);
  const hexColor = await client.getStringValue('hex-color', '000', context);
  const emojiCode = await client.getNumberValue('emoji-code', 0, context);

  res.render("index", { title: "Demo", hexColor, emojiCode });

};

// enrich the context
const generateContext = (req: Request): AppSpecificContext => {
  return {
    userAgent: req.headers['user-agent'],
    ...parseContextParam(req.query.context)
  };
};

// parse the context sent from the client
const parseContextParam = (param: Request['query'][keyof Request['query']]): AppSpecificContext => {
  let context = {};
  try {
    if (typeof param === 'string') {
      context = JSON.parse(decodeURIComponent(param));
    }
  } catch (e) {
    console.log('invalid context');
  }
  return context;
}