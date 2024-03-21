import { EvaluationContext } from "@openfeature/server-sdk";
import { Request } from "express";

const targetingKeys = new Set<string>();

setInterval(() => {
  console.log(`unique users: ${targetingKeys.size}`);
}, 5000);

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
  batteryPercentage?: number;
  /**
   * Value of "navigator.language"
   */
  language?: string;
  /**
   * Value of navigator.connection.effectiveType
   * Possible values: "slow-2g", "2g", "3g", or "4g"
   */
  connectionType?: string;
  /**
   * A string logically identifying the subject of evaluation (end-user, service, etc).
   * https://openfeature.dev/specification/glossary#targeting-key
   */
  targetingKey?: string;
};

// enrich the context
export const parseContext = (req: Request): AppSpecificContext => {
  return {
    userAgent: req.headers["user-agent"],
    ...parseContextParam(req.query.context),
  };
};

// parse the context sent from the client
const parseContextParam = (
  param: Request["query"][keyof Request["query"]]
): AppSpecificContext => {
  let context: EvaluationContext = {};
  try {
    if (typeof param === "string") {
      context = JSON.parse(decodeURIComponent(param));
      if (context.targetingKey && !targetingKeys.has(context.targetingKey)) {
        targetingKeys.add(context.targetingKey);
      }
    }
  } catch (e) {
    console.log("invalid context");
  }
  return context;
};
