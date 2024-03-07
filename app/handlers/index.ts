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
   * Possible values: "slow-2g", "2g", "3g", or "4g"
   */
  connectionType?: string
};

export const indexHandler = async (req: Request, res: Response) => {

  const client = OpenFeature.getClient();
  const context = generateContext(req);
  const hexColor = await client.getStringValue('hex-color', '000', context);
  const emoji = await client.getStringValue('emoji', "", context);

  if (process.env.DEBUG == 'true') {
    console.log(context);
  }

  res.render("index", { title: "Demo", hexColor, emoji });
};

export const errorHandler = (err: any, req: Request, res: Response) => {
  console.error(err);
  res.render("index", { title: "Error", hexColor: '000', emoji: '⚠️' });
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