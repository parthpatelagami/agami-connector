import { createLogger, format, transports } from "winston";

// Notification Type
const NOTIFICATION = {
  TYPE_1: "HELPINBOX_NOTIFICATION"
};

// Logger
const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const logger = createLogger({
  levels: logLevels,
  transports: [
    new transports.Console(),
    new transports.File({
      filename: './log/helpinbox_notification.log'
    })
  ],
  format: format.combine(
    format.label({
      label: `HelpinBox🏷️`
    }),
    format.timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss'
    }),
    format.printf(info => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`)
  )
});

export default logger;
